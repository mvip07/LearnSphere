import Image from "next/image";
import Empty from "../Empty";
import useTranslation from "@services/languages";
import { useSocketContext } from "@context/AppContext";
import { useChatUsers } from "@features/cabinet/messages/hooks/useChatUsers";
import { useGoToNextPage } from "@hooks/useGoToNextPage";

const ChatUsers = ({ currentUserId, typingUsers, receiverUserId }: { currentUserId: string; typingUsers: string[]; receiverUserId: string }) => {
    const t = useTranslation()
    const goTo = useGoToNextPage()
    const { onlineUsers } = useSocketContext()
    const { users, loading, username, searchUsername, handleSearch } = useChatUsers(currentUserId);
    return (
        <div className={`w-full h-full bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] box-shadow border-0 lg:border-r border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] overflow-y-auto scroll-bar-none ${currentUserId && receiverUserId ? 'hidden lg:block' : ''}`}>
            <div className="sticky bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] z-20 top-0">
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-[20px] text-[var(--dark)] dark:text-[var(--whi)] font-medium leading-normal capitalize">
                        {t("activeConversations")}
                    </h2>
                    {/* <div className="py-2 px-3 bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-md font-medium text-[14px] leading-normal text-[var(--dark)] dark:text-[var(--whi)]">10</div> */}
                </div>
                <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>
                <div className="seaching w-full relative p-4">
                    <input type="text" onChange={handleSearch} defaultValue={searchUsername} className="input w-full outline" placeholder={t("searchUsername")} />

                    {(loading || (username && username.length > 0)) && (
                        <div className="flex flex-col gap-2 w-full h-auto max-h-[300px] relative top-[10px] bg-[var(--gray)] dark:bg-[var(--dark)] p-2 z-40 rounded-lg overflow-y-auto scroll-bar-none">
                            {loading ? (
                                Array(2).fill(0).map((_, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 rounded-[5px] animate-pulse bg-[var(--lg)] dark:bg-[var(--darkBorderCl)]">
                                        <div className="w-11 h-11 min-w-11 bg-gray-300 dark:bg-gray-700 rounded-full" />
                                        <div className="flex flex-col gap-2 w-full">
                                            <div className="w-full h-4 bg-gray-400 dark:bg-gray-700 rounded"></div>
                                            <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                username.filter((u) => u.id !== currentUserId).map((user, index) => (
                                    <div
                                        key={index}
                                        onClick={() => goTo(`/cabinet/messages?currentUserId=${currentUserId}&receiverUserId=${user.id}`)}
                                        className="flex items-center gap-3 p-3 rounded-[5px] cursor-pointer bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] hover:bg-[var(--primary-light)] transition"
                                    >
                                        <div className="image w-11 h-11 relative">
                                            <Image width={44} height={44} className="w-11 h-11 rounded-full" src={user.image as string} alt="User Image" />
                                        </div>
                                        <div className="user-names">
                                            <h4 className="text-[14px] text-[var(--dark)] dark:text-[var(--whi)] capitalize leading-normal font-medium">
                                                {user.lastname} {user.firstname}
                                            </h4>
                                            <p className="text-[14px] text-[var(--tailGrids)] font-medium leading-normal">
                                                {user.username}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="users px-4">
                {
                    users && users.length > 0 ? users.filter((u) => u.userId !== currentUserId).map((user, index) => (
                        <div
                            key={index}
                            onClick={() => goTo(`/cabinet/messages?currentUserId=${currentUserId}&receiverUserId=${user.userId}`)}
                            className={`py-4 px-3 flex items-center gap-3 rounded-[5px] cursor-pointer  ${receiverUserId === user.userId ? 'bg-[var(--lgblue)] dark:bg-[var(--darkBorderCl)]' : ''}`}>
                            <div className="image w-11 h-11 relative">
                                <Image width={44} height={44} className="w-11 h-11 rounded-full" src={user.image as string} alt="User Image" />
                                {
                                    onlineUsers && onlineUsers?.includes(user.userId) && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[var(--green)] border-[3px] border-[var(--whi)]"></div>
                                    )
                                }
                            </div>
                            <div className="user-names">
                                <h4 className="text-[14px] text-[var(--dark)] dark:text-[var(--whi)] capitalize leading-normal font-medium">
                                    {user.lastname} {user.firstname}
                                </h4>
                                <p className="text-[14px] text-[var(--tailGrids)] font-medium leading-normal">
                                    {typingUsers.includes(user.userId) ? t("typing") : user.lastMessage.length <= 20 ? user.lastMessage : user.lastMessage.slice(0, 20) + "..."}
                                </p>
                            </div>
                        </div>
                    )) : <Empty />
                }
            </div>
        </div>
    );
};

export default ChatUsers;