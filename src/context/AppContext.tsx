"use client";
import socketIOClient, { Socket } from "socket.io-client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import API from "@assets/api";
import { useLoader } from "./LoaderContext";
import { UserDto } from "src/types/auth";
import { ApiErrorProps } from "src/types/apiError";
import { CabinetContextType, SocketContextType, UserFollowData } from "src/types/state";
import { useGoToNextPage } from "@hooks/useGoToNextPage";
import { handleApiError } from "@services/handleApiError/handleApiError";

function deepEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (a == null || b == null || typeof a !== "object" || typeof b !== "object") return a === b;
    const keysA = Object.keys(a as object);
    const keysB = Object.keys(b as object);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
        if (!keysB.includes(key) || !deepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
            return false;
        }
    }
    return true;
}

const DEFAULT_USER: UserFollowData = {
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
};

const UserContext = createContext<CabinetContextType | null>(null);
const SocketContext = createContext<SocketContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const goTo = useGoToNextPage();
    const { showLoader, hideLoader } = useLoader();
    const [userId, setUserId] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserFollowData>(DEFAULT_USER);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const hasFetchedUser = useRef(false);

    const hasEmittedOnline = useRef(false);
    const hasEmittedJoin = useRef(false);

    const socket = useMemo<Socket | null>(() => {
        if (typeof window === "undefined") return null;
        return socketIOClient(process.env.NEXT_PUBLIC_SOCKET_URL!, {
            autoConnect: false,
            reconnection: false,
        });
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const checkAuth = (): string | null => {
            const localUser = localStorage.getItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!);
            if (!localUser || localUser === "undefined") return null;

            try {
                const parsed: UserDto = JSON.parse(localUser);
                return parsed?.userId ?? null;
            } catch {
                localStorage.removeItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!);
                return null;
            }
        };

        const id = checkAuth();
        if (id) setUserId(id);
    }, []);

    const fetchUser = useCallback(async () => {
        if (!userId || hasFetchedUser.current) return;

        hasFetchedUser.current = true;
        showLoader();

        try {
            const { data } = await API.get(`cabinet/${userId}`);
            setUserData((prev) => (deepEqual(prev, data) ? prev : data));
        } catch (error) {
            handleApiError(error as ApiErrorProps);
        } finally {
            hideLoader();
        }
    }, [userId, showLoader, hideLoader]);

    useEffect(() => {
        if (userId) fetchUser();
    }, [userId, fetchUser]);

    const logout = useCallback(() => {
        localStorage.removeItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!);
        setUserId(null);
        setUserData(DEFAULT_USER);
        goTo("/auth/login");
    }, [goTo]);

    useEffect(() => {
        if (!socket || !userId) return;

        const emitStatus = (status: "online" | "offline") => {
            if (socket.connected) {
                socket.emit("status", { user: userId, status });
            }
        };

        const handleConnect = () => {
            setIsConnected(true);
            if (!hasEmittedOnline.current) {
                hasEmittedOnline.current = true;
                emitStatus("online");
            }
            if (!hasEmittedJoin.current) {
                hasEmittedJoin.current = true;
                socket.emit("joinRoom", userId);
            }
        };

        const handleConnectError = () => {
            setIsConnected(false);
        };

        const handleUsersOnline = (users: string[]) => {
            const filtered = users.filter((id) => id !== userId);
            setOnlineUsers(filtered);
        };

        socket.on("connect", handleConnect);
        socket.on("connect_error", handleConnectError);
        socket.on("usersOnline", handleUsersOnline);

        if (!socket.connected) {
            socket.connect();
        }

        const beforeUnloadHandler = () => {
            emitStatus("offline");
        };
        window.addEventListener("beforeunload", beforeUnloadHandler);

        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHandler);
            socket.off("connect", handleConnect);
            socket.off("connect_error", handleConnectError);
            socket.off("usersOnline", handleUsersOnline);

            if (socket.connected) {
                emitStatus("offline");
                socket.disconnect();
            }
        };
    }, [socket, userId]);

    const userContextValue = useMemo(() => ({
        logout,
        fetchUser,
        ...userData,
        isSidebarOpen,
        setIsSidebarOpen,
    }), [logout, fetchUser, userData, isSidebarOpen]);

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
    if (!context) throw new Error("useAppContext must be used within AppProvider");
    return context;
};

export const useSocketContext = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (!context) throw new Error("useSocketContext must be used within AppProvider");
    return context;
};