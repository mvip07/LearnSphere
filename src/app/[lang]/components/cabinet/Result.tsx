import React from "react";
import useTranslation from "@services/languages";
import { Result } from "types/quiz";

const Results = ({ results }: { results: Result }) => {
    const t = useTranslation();
    return (
        <div className="user-question p-4">
            <div className="flex items-center justify-between my-2">
                <h2 className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium leading-normal capitalize">
                    {t("totalQuestions")}
                </h2>
                <div className="py-2 px-3 bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-md font-medium text-[14px] leading-normal text-[var(--dark)] dark:text-[var(--whi)]">
                    {results?.total}
                </div>
            </div>
            <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>
            <div className="flex items-center justify-between my-2">
                <h2 className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium leading-normal capitalize">
                    {t("correctAnswers")}
                </h2>
                <div className="py-2 px-3 bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-md font-medium text-[14px] leading-normal text-[var(--dark)] dark:text-[var(--whi)]">
                    {results?.correct}
                </div>
            </div>
            <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>
            <div className="flex items-center justify-between my-2">
                <h2 className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium leading-normal capitalize">
                    {t("incorrectAnswers")}
                </h2>
                <div className="py-2 px-3 bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-md font-medium text-[14px] leading-normal text-[var(--dark)] dark:text-[var(--whi)]">
                    {results?.inCorrect}
                </div>
            </div>
            <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>
            <div className="flex items-center justify-between my-2">
                <h2 className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium leading-normal capitalize">
                    {t("earnedCoins")}
                </h2>
                <div className="py-2 px-3 bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-md font-medium text-[14px] leading-normal text-[var(--dark)] dark:text-[var(--whi)]">
                    {results?.earnedCoins}
                </div>
            </div>
            <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>
            <div className="flex items-center justify-between my-2">
                <h2 className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium leading-normal capitalize">
                    {t("totalCoins")}
                </h2>
                <div className="py-2 px-3 bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-md font-medium text-[14px] leading-normal text-[var(--dark)] dark:text-[var(--whi)]">
                    {results?.totalCoins}
                </div>
            </div>
        </div>
    )
};

export default React.memo(Results);