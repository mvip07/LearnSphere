import Image from 'next/image';
import React, { useState } from 'react';
import Empty from '../Empty';
import { Follower, Following } from 'src/types/auth';
import useTranslation from '@services/languages';
import { FollowSectionProps } from 'src/types/component';
import { useFollow } from '@features/follow/hooks/useFollow';
import { getStoredUser } from '@assets/api/auth';

const Follow = ({ followers, following }: FollowSectionProps) => {
    const [followActive, setFollowActive] = useState('followers');

    const t = useTranslation()
    const { follow, unFollow } = useFollow()

    const renderUserList = (users: Array<Follower | Following>, isFollowing: boolean) => {
        if (users.length === 0) {
            return <Empty />
        }
        const customUser: Follower | Following = getStoredUser()
        return users.map((user, index: number) => {
            return (
                <div className="user w-full h-full" key={index}>
                    <div className="grid grid-cols-4 gap-3 py-2 px-3 items-center">
                        <div className="col-span-2">
                            <div className="flex items-center gap-3 cursor-pointer">
                                <Image className="rounded-full" src={user?.image as string} alt="User Image" width={48} height={48} />
                                <div>
                                    <span className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] capitalize leading-normal font-medium">
                                        {user.firstname && user.firstname.length > 10 ? user.firstname.slice(0, 10) + '...' : user.firstname}
                                        {user.lastname.length > 10 ? user.lastname.slice(0, 10) + '...' : user.lastname}
                                    </span>
                                    <span className="h-full text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium flex items-center justify-start">@{user.username}</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2 h-full">
                            <div className="h-full w-full flex items-center justify-end">
                                {isFollowing ? (
                                    <button onClick={() => unFollow(customUser.userId, user.id)} className="py-1 px-3 text-[14px] leading-normal font-medium flex items-center justify-center rounded-[3px] bg-[var(--primary)] text-[var(--whi)] cursor-pointer">
                                        {t("unFollow")}
                                    </button>
                                ) : (
                                    <button onClick={() => follow(customUser.userId, user.id)} className="py-1 px-3 text-[14px] leading-normal font-medium flex items-center justify-center rounded-[3px] bg-[var(--primary)] text-[var(--whi)] cursor-pointer">
                                        {t("followBack")}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>
                </div>
            );
        });
    };

    return (
        <div className="col-span-5 xl:col-span-2 h-full xl:overflow-y-auto box-shadow bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] scroll-bar-none">
            <div className="flex flex-wrap items-center gap-3 p-4 border-b border-b-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                {
                    ["followers", "following"].map((item, index) => (
                        <div key={index} onClick={() => setFollowActive(item)} className={`${followActive === item ? 'active' : ''} btn px-3 py-2`}>{t(item)}</div>
                    ))
                }
            </div>
            <div className="w-full h-ful users-table">
                {followActive === 'following' ? renderUserList(following, true) : renderUserList(followers, false)}
            </div>
        </div>
    );
};

export default Follow;