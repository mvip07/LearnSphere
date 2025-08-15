import { useState, useEffect, useRef } from "react";
import { getUserRequest } from "../api/messagesApi";
import { User } from "@/types/auth.t";
import { Message } from "@/types/chat.t";

export const useChats = (receiverUserId: string, messages: Message[]) => {
    const [user, setUser] = useState<User | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserRequest(receiverUserId);
            setUser(userData.data);
        }
        fetchUser();
    }, [receiverUserId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    return { user, messagesEndRef, setUser, scrollToBottom };
};
