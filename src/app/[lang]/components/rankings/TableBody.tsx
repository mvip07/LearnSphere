import { memo } from "react";
import Image from "next/image";
import { FaCircleArrowRight } from "react-icons/fa6";
import useTranslation from "@services/languages";
import { UserListProps } from "src/types/component";

const UserList = memo(({ user, index, page }: UserListProps) => {
    const t = useTranslation();
    const rank = (page - 1) * 5 + index + 1;
    const isTopThree = rank <= 3;
    return (
        <div className={`${isTopThree ? 'bg-[var(--lightPrimary)]' : ''}`}>
            <div className="hidden md:grid grid-cols-6 gap-3 items-center p-4">
                <div className="col-span-2 flex flex-col md:flex-row items-center gap-1 lg:gap-3">
                    <Image width={40} height={40} loading="lazy" src={user.image || ""} className="w-[40px] h-[40px] rounded-full border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]" alt="User" />
                    <span className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] capitalize font-medium">
                        {user.lastname} {user.firstname}
                    </span>
                </div>
                <div className="col-span-1 text-start text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium">
                    {user.username}
                </div>
                <div className="col-span-1 text-center text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium uppercase">
                    {user.follower}
                </div>
                <div className="col-span-1 text-center text-[16px] text-[var(--green)] font-medium uppercase">
                    {user.totalCoins}
                </div>
                <div className="col-span-1">
                    <a href={`/profile/${user.id}`} aria-label={`View ${user.username}'s profile`}>
                        <FaCircleArrowRight className="cursor-pointer size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)] float-end" />
                    </a>
                </div>
            </div>
            <div className="block md:hidden p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <Image width={30} height={30} className="w-[30px] h-[30px] rounded-full" src={user.image || ''} loading="lazy" alt="User Image" />
                        <p className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] capitalize font-medium">
                            {user.lastname} {user.firstname}
                        </p>
                    </div>
                    <a href={`/profile/${user.id}`}>
                        <FaCircleArrowRight className="cursor-pointer size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)] float-end" />
                    </a>
                </div>
                <div className="flex items-center justify-between my-2">
                    <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize">{t("username")}</span>
                    <p className="text-center text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium">{user.username}</p>
                </div>
                <div className="flex items-center justify-between my-2">
                    <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize">{t("follower")}</span>
                    <p className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium uppercase">{user.following}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize">{t("coins")}</span>
                    <p className="text-center text-[16px] text-[var(--green)] font-medium uppercase">{user.totalCoins}</p>
                </div>
            </div>
            <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>
        </div>
    );
});
UserList.displayName = "UserList";
export default UserList;