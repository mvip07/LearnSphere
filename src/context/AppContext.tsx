"use client";
import socketIOClient from "socket.io-client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, useRef } from "react";
import API from "@assets/api";
import { useLoader } from "./LoaderContext";
import { UserDto } from "src/types/auth";
import { ApiErrorProps } from "src/types/apiError";
import { CabinetContextType, SocketContextType, UserFollowData } from "src/types/state";
import { useGoToNextPage } from "@hooks/useGoToNextPage";
import { handleApiError } from "@services/handleApiError/handleApiError";

const DEFAULT_USER = {
    user: null,
    follower: [],
    following: [],
    answers: [],
    topics: [],
    levels: [],
    categories: [],
    results: {
        total: 0,
        correct: 0,
        inCorrect: 0,
        totalCoins: 0,
        earnedCoins: 0,
    },
}

const UserContext = createContext<CabinetContextType | null>(null);
const SocketContext = createContext<SocketContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const goTo = useGoToNextPage()
    const { showLoader, hideLoader } = useLoader();
    const [userId, setUserId] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserFollowData>(DEFAULT_USER);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const fetchRef = useRef(false);

    const socket = useMemo(() => {
        if (typeof window === "undefined") return null;
        return socketIOClient(process.env.NEXT_PUBLIC_SOCKET_URL, {
            autoConnect: false,
        });
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const checkAuth = () => {
            const localUser = localStorage.getItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!);
            if (!localUser || localUser === "undefined") {
                return null;
            }

            try {
                const parsed: UserDto = JSON.parse(localUser);
                return parsed?.userId ? parsed.userId : null;
            } catch {
                localStorage.removeItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!);
                return null;
            }
        };

        const id = checkAuth();
        if (id) setUserId(id);
    }, []);

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
            handleApiError(error as ApiErrorProps);
        } finally {
            hideLoader();
        }
    }, [userId, showLoader, hideLoader]);

    useEffect(() => {
        if (!userId || fetchRef.current) return;
        fetchRef.current = true;
        fetchUser();
    }, [fetchUser, userId]);

    const logout = useCallback(() => {
        localStorage.removeItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!);
        setUserId(null);
        setUserData(DEFAULT_USER);
        goTo("/auth/login")
    }, [goTo]);

    const emitStatus = useCallback((status: "online" | "offline") => {
        if (socket?.connected && userId) {
            socket.emit("status", { user: userId, status });
        }
    }, [socket, userId]);

    useEffect(() => {
        if (!socket || !userId) return;

        const handleConnect = () => {
            setIsConnected(true);
            emitStatus("online");
            socket.emit("joinRoom", userId);
        };

        const handleUsersOnline = (users: string[]) => {
            const filtered = users.filter((id) => id !== userId);
            setOnlineUsers(filtered);
        };

        socket.on("connect", handleConnect);
        socket.on("usersOnline", handleUsersOnline);
        socket.on("connect_error", () => setIsConnected(false));

        if (!socket.connected) {
            socket.connect();
        }

        const beforeUnloadHandler = () => emitStatus("offline");
        window.addEventListener("beforeunload", beforeUnloadHandler);

        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHandler);
            socket.off("connect", handleConnect);
            socket.off("usersOnline", handleUsersOnline);
            socket.off("connect_error");

            if (socket.connected) {
                emitStatus("offline");
                socket.disconnect();
            }
        };
    }, [socket, userId, emitStatus]);

    const userContextValue = useMemo(() => ({
        logout,
        fetchUser,
        ...userData,
        isSidebarOpen,
        setIsSidebarOpen,
    }), [userData, fetchUser, logout, isSidebarOpen, setIsSidebarOpen]);

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