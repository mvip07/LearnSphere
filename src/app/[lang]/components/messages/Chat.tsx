import Image from "next/image";
import { FaArrowLeft, FaPaperPlane, FaSliders } from "react-icons/fa6";

import { useChats } from "@features/cabinet/messages/hooks/useChats";
import { formatDate } from "@features/cabinet/messages/utils/formatDate";
import { useElementHeights } from "@features/cabinet/hooks/useElementHeights";
import useTranslation from "@services/languages";
import { useSocketContext } from "@context/AppContext";
import { useGoToNextPage } from "@hooks/useGoToNextPage";
import { ChatProps } from "src/types/chat";

const Chat = ({ currentUserId, receiverUserId, handleTyping, typingUsers, message, messages, setMessage, sendMessage }: ChatProps) => {
    const t = useTranslation()
    const goTo = useGoToNextPage()
    const { onlineUsers } = useSocketContext()
    const { user, messagesEndRef } = useChats(receiverUserId, messages)
    const { elementRefs, heights } = useElementHeights(["element1", "element2", "element3"]);

    return (
        <div className="w-full h-full bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] box-shadow overflow-y-auto">
            <div ref={elementRefs.element1} className="sticky top-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] z-20">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3 rounded-[5px]">
                        <div className="back" onClick={() => goTo("/cabinet/messages")}>
                            <FaArrowLeft className="size-5 text-[var(--dark)] dark:text-[var(--whi)] cursor-pointer" />
                        </div>
                        <div className="image cursor-pointer relative">
                            {
                                user?.image && <Image width={44} height={44} className="w-11 h-11 rounded-full" src={user?.image as string} alt="User Image" />
                            }
                            {onlineUsers.includes(receiverUserId) && (
                                <div className="w-3 h-3 bottom-0 right-0 border border-[2px] border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] bg-[var(--green)] rounded-full absolute"></div>
                            )}
                        </div>
                        <div className="user-names">
                            <h4 className="cursor-pointer text-[14px] text-[var(--dark)] dark:text-[var(--whi)] capitalize leading-normal font-medium">
                                {user?.lastname} {user?.firstname}
                            </h4>
                            <p className="cursor-pointer text-[14px] text-[var(--tailGrids)] font-medium leading-normal">
                                {typingUsers.includes(receiverUserId) ? t("typing") : t("lastseen")}
                            </p>
                        </div>
                    </div>
                    <div className="icons cursor-not-allowed">
                        <FaSliders className="size-5 text-[var(--tailGrids)]" />
                    </div>
                </div>
                <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>
            </div>
            <div style={{ height: `calc(100% - ${heights.element1 + heights.element2}px)` }} className="overflow-y-auto scroll-bar-none p-4 w-full h-full">
                {messages.map((msg, index) => {
                    const time = formatDate(msg.createdAt)
                    const IsLeftOrRight = currentUserId === msg.sender && receiverUserId === msg.receiver
                    return (
                        <div key={index} className={`h-min msg grid flex-col my-2 ${IsLeftOrRight ? "justify-end" : "justify-start"}`}>
                            <div className={`px-4 py-3 ${IsLeftOrRight ? "bg-[var(--primary)] rounded-[4px_4px_0_4px]" : "bg-[var(--lgblue)] dark:bg-[var(--darkBorderCl)] rounded-[4px_4px_4px_0]"}`}>
                                <pre className={`max-w-[350px] text-wrap text-[14px] lending-normal font-medium  ${IsLeftOrRight ? "text-[var(--whi)] " : "text-[var(--dark)] dark:text-[var(--whi)] "}`}>
                                    {msg.text}
                                </pre>
                            </div>
                            <span className={`mt-2 text-[12px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal block ${IsLeftOrRight ? 'text-end' : 'text-start'}`}>
                                {time}
                            </span>
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>
            <div ref={elementRefs.element2} className="sticky bottom-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] z-20">
                <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>
                <form onSubmit={sendMessage} className="flex items-center justify-between gap-4 p-4">
                    <div className="relative w-full h-[50px]">
                        <textarea
                            value={message}
                            placeholder={t("sendMessage")}
                            onBlur={() => handleTyping(false)}
                            className="input w-full h-[50px] resize-none absolute top-1/2 -translate-y-1/2"
                            onChange={(e) => { handleTyping(true); setMessage(e.target.value) }}>

                        </textarea>
                    </div>

                    <button className="min-w-12 w-12 min-h-12 h-12 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                        <FaPaperPlane className="size-6 text-[var(--whi)]" />
                    </button>
                </form>
            </div>
        </div >
    );
};

export default Chat;