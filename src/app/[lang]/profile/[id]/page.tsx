"use client"
import Image from "next/image";
import { useParams } from "next/navigation"
import { FaMessage, FaPlus, FaMinus } from "react-icons/fa6";
import useTranslation from "@/services/languages";
import useProfile from "@/features/profile/hooks/useProfile";

export default function ProfileById() {
    const params = useParams();
    const t = useTranslation();
    const userId = params.id as string;
    const { user, isFollowing, isCurrentUser, handleFollow, handleMessage, goTo } = useProfile(userId);

    return (
        <div className="h-full bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] relative pb-4 overflow-auto scroll-bar-none">
            <div className="w-full bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] shadow-md z-50">
                <div className="container mx-auto px-4 py-3">
                    <ul className="flex items-center text-[16px] font-medium capitalize leading-normal text-[var(--textCl)] dark:text-[var(--darkTextCl)]">
                        <li onClick={() => goTo('/cabinet/ranking')} className="cursor-pointer hover:text-[var(--primary)] transition-colors duration-200" >
                            {t("rankingUser")}
                        </li>
                        <li className="mx-2 text-[var(--textCl)] dark:text-[var(--darkTextCl)]">/</li>
                        <li className="text-[var(--primary)] cursor-pointer">{t("profile")}</li>
                    </ul>
                </div>
            </div>

            <div className="relative h-72 md:h-96 bg-gradient-to-b from-[var(--primary)] to-transparent">
                <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/images/profileBg.png')" }} ></div>
                <div className="container mx-auto px-4 h-full flex items-center justify-center">
                    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] shadow-lg p-2">
                        {user?.image && typeof user?.image === "string" && (
                            <Image
                                width={160}
                                height={160}
                                alt="User Image"
                                src={user.image}
                                className="w-full h-full rounded-full object-cover"
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-20 md:-mt-24">
                <div className="relative bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] rounded-2xl shadow-xl p-6 md:p-8 max-w-3xl mx-auto">
                    <div className="text-center mb-6">
                        <h1 className="text-[24px] font-medium capitalize leading-normal text-[var(--dark)] dark:text-[var(--whi)]">
                            {user?.lastname} {user?.firstname}
                        </h1>
                        <h3 className="text-[16px] font-medium leading-normal text-[var(--textCl)] dark:text-[var(--darkTextCl)] mt-2">
                            {user?.username}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="flex flex-col items-center justify-center p-4 bg-[var(--whiLg)] dark:bg-[var(--darkFollower)] rounded-lg border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] cursor-pointer">
                            <span className="text-[var(--dark)] dark:text-[var(--whi)] font-medium text-[16px] leading-normal">{user?.totalCoins}</span>
                            <p className="text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium text-[14px] leading-normal">{t("coins")}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-[var(--whiLg)] dark:bg-[var(--darkFollower)] rounded-lg border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] cursor-pointer">
                            <span className="text-[var(--dark)] dark:text-[var(--whi)] font-medium text-[16px] leading-normal">{user?.follower}</span>
                            <p className="text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium text-[14px] leading-normal">{t("followers")}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-[var(--whiLg)] dark:bg-[var(--darkFollower)] rounded-lg border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] cursor-pointer">
                            <span className="text-[var(--dark)] dark:text-[var(--whi)] font-medium text-[16px] leading-normal">{user?.following}</span>
                            <p className="text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium text-[14px] leading-normal">{t("following")}</p>
                        </div>
                    </div>

                    {!isCurrentUser && (
                        <div className="flex justify-center gap-4 mb-6">
                            <button onClick={handleFollow} className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--whi)] rounded-lg hover:bg-opacity-80 transition-colors duration-200 cursor-pointer">
                                {isFollowing ? (
                                    <FaMinus className="size-4" />
                                ) : (
                                    <FaPlus className="size-4" />
                                )}
                                <span className="font-medium text-[14px] leading-normal">
                                    {isFollowing ? "Unfollow" : "Follow"}
                                </span>
                            </button>
                            <button onClick={handleMessage} className="flex items-center gap-2 px-4 py-2 bg-[var(--whiLg)] dark:bg-[var(--darkFollower)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-lg hover:bg-opacity-80 transition-colors duration-200 cursor-pointer">
                                <FaMessage className="size-4 text-[var(--dark)] dark:text-[var(--whi)]" />
                                <span className="text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium text-[14px] leading-normal">
                                    Message
                                </span>
                            </button>
                        </div>
                    )}

                    <div className="text-center">
                        <h4 className="text-[16px] font-medium leading-normal text-[var(--dark)] dark:text-[var(--whi)] mb-4">{t("aboutMe")}</h4>
                        <p className="text-[14px] font-medium leading-normal text-[var(--textCl)] dark:text-[var(--darkTextCl)] whitespace-pre-wrap">
                            {user?.bio}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}