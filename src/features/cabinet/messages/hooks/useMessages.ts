"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

import socket from "@/assets/api/socket";
import { getStoredUser } from "@/assets/api/auth";
import { fetchMessages } from "../api/messagesApi";
import { Message } from "@/types/chat.t";
import { handleApiError } from "@/services/handleApiError/handleApiError";
import { ApiErrorProps } from "@/types/apiError.t";

export const useMessages = () => {
    const searchParams = useSearchParams();
    const receiverUserIdParams = searchParams.get("receiverUserId") || "";

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);

    const [currentUserId, setCurrentUserId] = useState<string>("");
    const [receiverUserId, setReceiverUserId] = useState(receiverUserIdParams);

    useEffect(() => {
        const storedUser = getStoredUser();
        if (storedUser) {
            setCurrentUserId(storedUser?.userId || "");
        }
    }, []);

    useEffect(() => {
        if (!currentUserId || !receiverUserId) return;

        const loadMessages = async () => {
            try {
                const { data } = await fetchMessages(currentUserId, receiverUserId);
                setMessages(data);
            } catch (error) {
                handleApiError(error as ApiErrorProps)
            }
        };

        loadMessages();
    }, [currentUserId, receiverUserId]);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage: Message) => {
            setMessages((prev) => (prev.some((msg) => msg.id === newMessage.id) ? prev : [...prev, newMessage]));
        };

        const handleTyping = (data: { sender: string; isTyping: boolean }) => {
            setTypingUsers((prev) => {
                const newSet = new Set(prev);
                if (data.isTyping) {
                    newSet.add(data.sender);
                } else {
                    newSet.delete(data.sender);
                }
                return Array.from(newSet);
            });
        };

        socket.on("typing", handleTyping);
        socket.on("message", handleNewMessage);
        socket.emit("joinRoom", currentUserId);

        return () => {
            socket.off("typing", handleTyping);
            socket.off("message", handleNewMessage);
        };
    }, [currentUserId]);

    useEffect(() => {
        setReceiverUserId(receiverUserIdParams);
    }, [receiverUserIdParams]);

    const sendMessage = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim()) {
            socket.emit("message", { sender: currentUserId, receiver: receiverUserId, text: message });
            setMessage("");
        }
    }, [message, currentUserId, receiverUserId]);

    const handleTyping = useCallback((isTyping: boolean) => {
        if (currentUserId && receiverUserId) {
            socket.emit("typing", { sender: currentUserId, receiver: receiverUserId, isTyping });
        }
    }, [currentUserId, receiverUserId]);

    return { message, messages, typingUsers, currentUserId, receiverUserId, setMessage, sendMessage, handleTyping };
};
