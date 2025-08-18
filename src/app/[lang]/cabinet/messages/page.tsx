"use client";
import Chat from "@components/messages/Chat";
import ChatUsers from "@components/messages/ChatUsers";
import WelcomeChat from "@components/messages/WelcomeChat";
import { useMessages } from "@features/cabinet/messages/hooks/useMessages";

export default function Messages() {
    const { message, messages, typingUsers, currentUserId, receiverUserId, setMessage, sendMessage, handleTyping } = useMessages();

    return (
        <div className="w-full h-full relative grid grid-cols-1 lg:grid-cols-[350px_1fr]">
            <ChatUsers
                typingUsers={typingUsers}
                currentUserId={currentUserId}
                receiverUserId={receiverUserId}
            />
            {
                currentUserId && receiverUserId ?
                    <Chat
                        message={message}
                        messages={messages}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                        typingUsers={typingUsers}
                        handleTyping={handleTyping}
                        currentUserId={currentUserId}
                        receiverUserId={receiverUserId}
                    />
                    : <WelcomeChat />
            }
        </div>
    );
}