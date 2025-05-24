"use client";

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import socketIOClient from "socket.io-client";

import API from "@/assets/api/index";
import { CabinetContextType, UserDto, UserFollowData } from "@/types/cabinet.t";
import { useToggleLoader } from "@/assets/utils/loader";
import { useGoToNextPage } from "@/hooks/useGoToNextPage";

interface UserStatus {
    user: string;
    status: "online" | "offline";
}

interface SocketContextType {
    onlineUsers: string[];
    isConnected: boolean;
}

const UserContext = createContext<CabinetContextType | null>(null);
const SocketContext = createContext<SocketContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const goTo = useGoToNextPage()
    const toggleLoader = useToggleLoader();
    const [userId, setUserId] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserFollowData>({
        user: null,
        follower: [],
        following: [],
        answers: [],
        categories: [],
    });
    const [followActive, setFollowActive] = useState<string>("followers");
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const socket = useMemo(() => {
        if (typeof window === "undefined") return null;
        return socketIOClient(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000", {
            autoConnect: false,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const fetchUserId = () => {
            try {
                const storedUser = localStorage.getItem("quizapp");
                if (!storedUser || storedUser === "undefined") {
                    goTo("/auth/login");
                    return;
                }

                const parsedUser: UserDto = JSON.parse(storedUser);
                if (parsedUser?.userId && typeof parsedUser.userId === "string") {
                    setUserId(parsedUser.userId);
                } else {
                    localStorage.removeItem("quizapp");
                    goTo("/auth/login");
                }
            } catch (error) {
                console.error("Failed to parse user from localStorage:", error);
                localStorage.removeItem("quizapp");
                goTo("/auth/login");
            }
        };

        fetchUserId();
    }, []);

    const fetchUser = useCallback(async () => {
        if (!userId) return;
        toggleLoader(true);
        try {
            const res = await API.get(`cabinet/${userId}`);
            setUserData((prev) => {
                const newData = res?.data;
                if (JSON.stringify(prev) !== JSON.stringify(newData)) {
                    return newData;
                }
                return prev;
            });
        } catch (error: any) {
            if (error.response?.data?.error === "Unauthorized" && error.response?.data?.statusCode === 401) {
                localStorage.removeItem("quizapp");
                goTo("/auth/login");
            }
        } finally {
            toggleLoader(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) fetchUser();
    }, [userId, fetchUser]);

    const follow = useCallback(async (followerId: string, followingId: string): Promise<void> => {
        try {
            if (!followerId || !followingId) return;
            await API.post(`follow/${followerId}/${followingId}`);
            await fetchUser();
        } catch (error) {
            console.error("Follow error:", error);
        }
    }, [fetchUser]);

    const unFollow = useCallback(async (followerId: string, followingId: string): Promise<void> => {
        try {
            if (!followerId || !followingId) return;
            await API.delete(`follow/${followerId}/${followingId}`);
            await fetchUser();
        } catch (error) {
            console.error("Unfollow error:", error);
        }
    }, [fetchUser]);

    const logout = useCallback(() => {
        localStorage.removeItem("quizapp");
        setUserId(null);
        setUserData({
            user: null,
            follower: [],
            following: [],
            answers: [],
            categories: [],
        });
        goTo("/auth/login");
    }, []);

    const handleUsersOnline = useCallback((users: string[]) => {
        setOnlineUsers((prev) => {
            const newUsers = users.filter((user) => user !== userId);
            if (JSON.stringify(prev) !== JSON.stringify(newUsers)) {
                return newUsers;
            }
            return prev;
        });
    }, [userId]);

    const emitStatus = useCallback((status: "online" | "offline") => {
        if (socket && userId) {
            socket.emit("status", { user: userId, status } as UserStatus);
        }
    }, [socket, userId]);

    useEffect(() => {
        if (!socket || !userId) return;

        socket.connect();
        setIsConnected(true);

        socket.on("connect", () => {
            emitStatus("online");
            socket.emit("joinRoom", userId);
        });

        socket.on("usersOnline", handleUsersOnline);

        socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
            setIsConnected(false);
        });

        const handleBeforeUnload = () => emitStatus("offline");

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            socket.off("connect");
            socket.off("usersOnline", handleUsersOnline);
            socket.off("connect_error");
            window.removeEventListener("beforeunload", handleBeforeUnload);
            emitStatus("offline");
            socket.disconnect();
        };
    }, [socket, userId, emitStatus, handleUsersOnline]);

    const userContextValue = useMemo(() => {
        const stableUserData = {
            ...userData,
            user: userData.user || {
                id: "",
                firstname: "",
                lastname: "",
                username: "",
                email: "",
                questions: { total: 0, correct: 0, incorrect: 0, totalCoins: 0, earnedCoins: 0 },
            },
        };
        return {
            follow,
            logout,
            unFollow,
            fetchUser,
            followActive,
            setFollowActive,
            ...stableUserData,
        };
    }, [userData, followActive, follow, unFollow, fetchUser, logout]);

    const socketContextValue = useMemo(() => ({
        onlineUsers,
        isConnected,
    }), [onlineUsers, isConnected]);

    return (
        <UserContext.Provider value={userContextValue}>
            <SocketContext.Provider value={socketContextValue}>{children}</SocketContext.Provider>
        </UserContext.Provider>
    );
};

export const useAppContext = (): CabinetContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export const useSocketContext = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocketContext must be used within an AppProvider");
    }
    return context;
};