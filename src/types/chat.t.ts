import React from "react";

export interface Message {
    id: string;
    text: string;
    sender: string;
    receiver: string;
    createdAt: string;
    isUpdated: boolean;
}

export interface ChatProps {
    message: string;
    messages: Message[];
    currentUserId: string;
    typingUsers: string[];
    receiverUserId: string;
    handleTyping: (isTyping: boolean) => void;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
}