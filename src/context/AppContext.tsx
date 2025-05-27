"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import socketIOClient from "socket.io-client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import API from "@/assets/api";
import { useLoader } from "./LoaderContext";
import { CabinetContextType, SocketContextType, UserDto, UserFollowData } from "@/types/Cabinet/cabinet.t";



const UserContext = createContext<CabinetContextType | null>(null);
const SocketContext = createContext<SocketContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { showLoader, hideLoader } = useLoader();

    const [userId, setUserId] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserFollowData>({
        user: null,
        follower: [],
        following: [],
        answers: [],
        categories: [],
    });

    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const socket = useMemo(() => {
        if (typeof window === "undefined") return null;
        return socketIOClient(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000", {
            autoConnect: false,
        });
    }, []);

    const goToLogin = useCallback(() => {
        router.push("/auth/login");
    }, [router]);

    useEffect(() => {
        const localUser = localStorage.getItem("quizapp");
        if (!localUser || localUser === "undefined") {
            goToLogin();
            return;
        }

        try {
            const parsed: UserDto = JSON.parse(localUser);
            if (parsed?.userId) {
                setUserId(parsed.userId);
            } else {
                localStorage.removeItem("quizapp");
                goToLogin();
            }
        } catch {
            localStorage.removeItem("quizapp");
            goToLogin();
        }
    }, [goToLogin]);

    const fetchUser = useCallback(async () => {
        if (!userId) return;
        showLoader();
        try {
            const res = await API.get(`cabinet/${userId}`);
            const newData = res.data;
            setUserData((prev) => {
                if (JSON.stringify(prev) !== JSON.stringify(newData)) return newData;
                return prev;
            });
        } catch (error) {
            const err = error as AxiosError;
            if (err?.response?.status === 401) {
                localStorage.removeItem("quizapp");
                goToLogin();
            }
        } finally {
            hideLoader();
        }
    }, [userId, goToLogin, showLoader, hideLoader]);

    useEffect(() => {
        if (userId) fetchUser();
    }, [userId, fetchUser]);

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
        goToLogin();
    }, [goToLogin]);


    const emitStatus = useCallback((status: "online" | "offline") => {
        if (socket && userId) {
            socket.emit("status", { user: userId, status });
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

        socket.on("usersOnline", (users: string[]) => {
            const filtered = users.filter((id) => id !== userId);
            setOnlineUsers(filtered);
        });

        socket.on("connect_error", () => setIsConnected(false));

        window.addEventListener("beforeunload", () => emitStatus("offline"));

        return () => {
            emitStatus("offline");
            socket.disconnect();
        };
    }, [socket, userId, emitStatus]);

    const userContextValue = useMemo(() => ({
        logout,
        fetchUser,
        ...userData,
    }), [userData, logout, fetchUser]);

    const socketContextValue = useMemo(() => ({
        onlineUsers,
        isConnected,
    }), [onlineUsers, isConnected]);

    return (
        <UserContext.Provider value={userContextValue}>
            <SocketContext.Provider value={socketContextValue}>
                {children}
            </SocketContext.Provider>
        </UserContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useAppContext must be used within AppProvider");
    return context;
};

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) throw new Error("useSocketContext must be used within AppProvider");
    return context;
};