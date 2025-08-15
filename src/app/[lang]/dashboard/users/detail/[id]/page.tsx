"use client"
import Image from "next/image";
import { useState } from "react";

import useTranslation from "@/services/languages";
import { useAppContext } from "@/context/AppContext";
import About from "@/app/[lang]/components/cabinet/About";
import Level from "@/app/[lang]/components/cabinet/Level";
import Topic from "@/app/[lang]/components/cabinet/Topic";
import Answer from "@/app/[lang]/components/cabinet/Answer";
import Result from "@/app/[lang]/components/cabinet/Result";
import Follow from "@/app/[lang]/components/cabinet/Follow";
import Categories from "@/app/[lang]/components/cabinet/Categories";

export default function UserDetail() {
    const t = useTranslation();
    const { user, answers, results, categories, levels, topics, follower, following } = useAppContext();
    const [userBlog, setUserBlog] = useState("about");

    if (!user) return null;

    const tabs = ["about", "category", "level", "topic", "answers", "results"];

    return (
        <div className="grid grid-cols-5 gap-4 auto-rows-1 xl:auto-rows-[97px_1fr] w-full h-min xl:h-full xl:overflow-y-auto">
            <div className="col-span-5 p-4 w-full block lg:flex items-center justify-between box-shadow bg-[var(--whi)] dark:bg-[var(--darkBoxBg)]">
                <div className="flex items-center gap-5">
                    <Image
                        width={65}
                        height={65}
                        alt="User Image"
                        src={user.image as string}
                        className="w-[65px] h-[65px] rounded-full cursor-pointer"
                    />
                    <h1 className="text-[var(--dark)] dark:text-[var(--whi)] text-[24px] leading-[30px] capitalize cursor-pointer">
                        {user.firstname.length > 10 ? user.firstname.slice(0, 10) + "..." : user.firstname}{" "}
                        {user.lastname.length > 10 ? user.lastname.slice(0, 10) + "..." : user.lastname}
                    </h1>
                </div>
                <div className="mt-4 lg:mt-0 dark:bg-[var(--darkFollower)] flex items-center justify-center gap-4 border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-[5px] px-[15px] py-[10px]">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <span className="text-[var(--dark)] dark:text-[var(--whi)] font-medium text-[16px] leading-normal">{user.follower}</span>
                        <p className="text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium text-[14px] leading-normal">{t("followers")}</p>
                    </div>
                    <div className="w-[1px] h-[20px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <span className="text-[var(--dark)] dark:text-[var(--whi)] font-medium text-[16px] leading-normal">{user.following}</span>
                        <p className="text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium text-[14px] leading-normal">{t("following")}</p>
                    </div>
                </div>
            </div>

            <div className="col-span-5 xl:col-span-3 h-full xl:overflow-y-auto box-shadow bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] scroll-bar-none">
                <div className="flex flex-wrap items-center gap-3 p-4 border-b border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                    {tabs.map((item, index) => (
                        <div key={index} onClick={() => setUserBlog(item)} className={`${userBlog === item ? "active" : ""} btn px-3 py-2 capitalize cursor-pointer`}>
                            {t(item)}
                        </div>
                    ))}
                </div>
                <div className="card-body">
                    {
                        {
                            about: <About isBio={!!user.bio} bio={user.bio || t("noBio")} />,
                            category: <Categories categories={categories} />,
                            level: <Level levels={levels} />,
                            topic: <Topic topics={topics} />,
                            answers: <Answer answers={answers} />,
                            results: <Result results={results} />,
                        }[userBlog]
                    }
                </div>
            </div>

            <Follow followers={follower} following={following} />
        </div>
    )
}