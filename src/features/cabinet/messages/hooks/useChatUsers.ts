"use client";
import { useState, useEffect } from "react";
import socket from "@/assets/api/socket";
import { searchUsers } from "../api/messagesApi";
import { ChatUsers, SearchUsername } from "@/types/auth.t";

export const useChatUsers = (currentUserId: string) => {
    const [users, setUsers] = useState<ChatUsers[]>([]);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState<SearchUsername[]>([]);
    const [searchUsername, setSearchUsername] = useState<string>("");

    useEffect(() => {
        if (!socket || !currentUserId) return;

        const fetchChatList = () => {
            socket.emit("getChatList", currentUserId);
        };

        const handleChatList = (chatList: ChatUsers[]) => {
            setUsers(chatList);
        };

        socket.on("chatList", handleChatList);
        fetchChatList();

        return () => {
            socket.off("chatList", handleChatList);
        };
    }, [currentUserId]);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchUsername(e.target.value.trim());
        if (e.target.value.length > 1) {
            setLoading(true)
            try {
                const { data } = await searchUsers(e.target.value.trim());
                setUsername(data.users ?? []);
            }  finally {
                setLoading(false)
            }
        } else {
            setUsername([]);
        }
    };
    return { users, username, loading, searchUsername, setSearchUsername, handleSearch };
};