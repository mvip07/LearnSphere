import React, { useState } from "react";
import { useParams } from "next/navigation";
import { FaCoins, FaLeftLong, FaRightLong } from "react-icons/fa6";
import Empty from "../Empty";
import QuizDetails from "./QuizDetails";
import { Answer } from "types/quiz";
import useTranslation from "@services/languages";

const Answers = ({ answers }: { answers: Answer[] }) => {
    const t = useTranslation();
    const { lang } = useParams() as { lang: "en" | "uz" | "ru" };
    const [skip, setSkip] = useState({ start: 0, limit: 5 });
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [selectedQuiz, setSelectedQuiz] = useState<Answer | null>(null);

    const filteredAnswers = answers.filter((item) => {
            let titles: string[] = [];

            if (item.quizId) {
                if (typeof item.quizId === "object") {
                    titles = Object.values(item.quizId).filter((val) => typeof val === "string").map((val) => val.toLowerCase());
                } else if (typeof item.quizId === "string") {
                    titles = [item.quizId.toLowerCase()];
                }
            }
            return titles.some((title) => title.includes(search.trim().toLowerCase()));
        }).sort((a, b) => {
            if (sort === "highcoins") return b.totalCoins - a.totalCoins;
            if (sort === "lowcoins") return a.totalCoins - b.totalCoins;
            if (sort === "newest") return new Date(b.finishedDate).getTime() - new Date(a.finishedDate).getTime();
            if (sort === "oldest") return new Date(a.finishedDate).getTime() - new Date(b.finishedDate).getTime();
            return 0;
        });

    const paginatedAnswers = filteredAnswers.slice(skip.start, skip.start + skip.limit);

    const handlePagination = (direction: string) => {
        if (direction === "next") {
            setSkip((prev) => ({ ...prev, start: prev.start + prev.limit }));
        } else if (direction === "prev") {
            setSkip((prev) => ({ ...prev, start: Math.max(0, prev.start - prev.limit) }));
        }
    };

    const handleSort = (sortType: string) => {
        setSort(sortType);
        setSkip({ start: 0, limit: 5 });
    };

    const handleQuizClick = (answer: Answer) => {
        setSelectedQuiz(answer);
    };

    return (
        <div className="p-4">
            {selectedQuiz ? (
                <QuizDetails lang={lang} questions={selectedQuiz.questions} answer={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
            )
                : (
                    <>
                        <div className="grid grid-cols-8 gap-4">
                            <div className="col-span-8 sm:col-span-5">
                                <input type="text" value={search} className="input outline-0 w-full" placeholder={t("searchQuestionTitle")} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <div className="col-span-3 sm:col-span-2">
                                <select onChange={(e) => handleSort(e.target.value)} className="input outline-0 w-full" >
                                    <option value="">{t("sort")}</option>
                                    <option value="highcoins">{t("highCoins")}</option>
                                    <option value="lowcoins">{t("lowCoins")}</option>
                                    <option value="newest">{t("newest")}</option>
                                    <option value="oldest">{t("oldest")}</option>
                                </select>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <select value={skip.limit} className="input outline-0 w-full text-start" onChange={({ target }) => setSkip((prev) => ({ ...prev, limit: Number(target.value) }))} >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
                            </div>
                        </div>

                        <div className="hidden md:grid grid-cols-6 gap-4 bg-[var(--tableHeader)] dark:bg-[var(--darkTableHeader)] p-4 mt-4">
                            <div className="col-span-2 text-start">
                                <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize leading-normal">
                                    {t("quizId")}
                                </span>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize leading-normal">
                                    {t("earnedCoins")}
                                </span>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize leading-normal">
                                    {t("totalCoins")}
                                </span>
                            </div>
                            <div className="col-span-2 text-end">
                                <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize leading-normal">
                                    {t("finishedDate")}
                                </span>
                            </div>
                        </div>

                        {paginatedAnswers.length ? (
                            paginatedAnswers.map((item, idx) => (
                                <div key={idx}>
                                    <div className="hidden md:grid grid-cols-6 gap-4 p-4 border-b border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                                        <div className="col-span-2 text-start">
                                            <span onClick={() => handleQuizClick(item)} className="text-[14px] text-[var(--primary)] font-medium capitalize leading-normal cursor-pointer">
                                                #{item.quizId}
                                            </span>
                                        </div>
                                        <div className="col-span-1 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <FaCoins className="size-5 text-[var(--yellow)]" />
                                                <span className="text-[14px] text-[var(--yellow)] font-medium capitalize leading-normal">
                                                    {item.earnCoins}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-span-1 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <FaCoins className="size-5 text-[var(--yellow)]" />
                                                <span className="text-[14px] text-[var(--yellow)] font-medium capitalize leading-normal">
                                                    {item.totalCoins}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-span-2 text-end">
                                            <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize leading-normal">
                                                {item.finishedDate.slice(0, 19).replace('T', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="block md:hidden  border-b border-t border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] mt-4">
                                        <div className="flex items-center justify-between gap-4 my-2">
                                            <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize leading-normal">
                                                {t("quizId")}
                                            </span>
                                            <span onClick={() => handleQuizClick(item)} className="text-[14px] text-[var(--primary)] font-medium capitalize leading-normal cursor-pointer">
                                                #{item.quizId}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between gap-4 my-2">
                                            <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize leading-normal">
                                                {t("earnCoins")}
                                            </span>
                                            <div className="flex items-center justify-center gap-2">
                                                <FaCoins className="size-5 text-[var(--yellow)]" />
                                                <span className="text-[14px] text-[var(--yellow)] font-medium capitalize leading-normal">
                                                    {item.earnCoins}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-4 my-2">
                                            <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize leading-normal">
                                                {t("totalCoins")}
                                            </span>
                                            <div className="flex items-center justify-center gap-2">
                                                <FaCoins className="size-5 text-[var(--yellow)]" />
                                                <span className="text-[14px] text-[var(--yellow)] font-medium capitalize leading-normal">
                                                    {item.totalCoins}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-4 my-2">
                                            <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize leading-normal">
                                                {t("finishedDate")}
                                            </span>
                                            <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize leading-normal">
                                                {item.finishedDate.slice(0, 19).replace('T', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : <Empty />}

                        <div className="flex items-center justify-end gap-4 py-4">
                            <button
                                disabled={skip.start === 0}
                                onClick={() => handlePagination("prev")}
                                className="flex items-center justify-center gap-5 rounded-md px-3 py-2 md:py-3 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)] disabled:opacity-50 cursor-pointer"
                            >
                                <FaLeftLong className="size-4 text-[var(--whi)]" />
                            </button>
                            <span className="text-[14px] font-medium leading-normal text-[var(--dark)] dark:text-[var(--whi)]">
                                {t("page")} {Math.ceil(skip.start / skip.limit) + 1} {t("of")}{" "}
                                {Math.ceil(filteredAnswers.length / skip.limit)}
                            </span>
                            <button
                                onClick={() => handlePagination("next")}
                                disabled={Math.ceil(skip.start / skip.limit) + 1 >= Math.ceil(filteredAnswers.length / skip.limit)}
                                className="flex items-center justify-center gap-5 rounded-md px-3 py-2 md:py-3 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)] disabled:opacity-50 cursor-pointer"
                            >
                                <FaRightLong className="size-4 text-[var(--whi)]" />
                            </button>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default React.memo(Answers);