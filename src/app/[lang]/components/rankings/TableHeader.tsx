import React from "react";
import useTranslation from "@/services/languages";
import { TableHeaderProps2 } from "@/types/component.t";

const TableHeader = ({ sortBy, handleSortByChange }: TableHeaderProps2) => {
    const t = useTranslation()
    return (
        <div className="sticky top-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] z-20 py-4 border-b border-b-2 border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
            <div className="table-title px-4">
                <h1 className="text-[20px] font-bold leading-[26px] capitalize text-[var(--dark)] dark:text-[var(--whi)] dark:text">
                    {t("topRankingUsers")}
                </h1>
            </div>
            <div className="table-filter px-4">
                <div className="grid grid-cols-7 gap-4 mt-4 mb-0">
                    <div className="col-span-full md:col-span-3">
                        <input
                            type="text"
                            name="search"
                            className="input w-full"
                            defaultValue={sortBy.search}
                            onChange={handleSortByChange}
                            placeholder={t("topRankingUsersInput")}
                        />
                    </div>
                    <div className="col-span-full sm:col-span-3 md:col-span-2">
                        <select defaultValue={sortBy.sortBy} onChange={handleSortByChange} className="input w-full" name="sortBy">
                            <option value="coins">{t("coinsHighToLow")}</option>
                            <option value="coins_asc">{t("coinsLowToHigh")}</option>
                            <option value="followers">{t("followersHighToLow")}</option>
                            <option value="followers_asc">{t("followersLowToHigh")}</option>
                        </select>
                    </div>
                    <div className="col-span-3 sm:col-span-2 md:col-span-1">
                        <select defaultValue={sortBy.limit} onChange={handleSortByChange} className="input w-full" name="limit">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div className="col-span-4 sm:col-span-2 md:col-span-1">
                        <button
                            className="w-full border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--lgblue)] rounded py-3 text-[16px] leading-normal text-center font-medium">
                            {t("search")}
                        </button>
                    </div>
                </div>
            </div>
            <div className="hidden md:grid grid-cols-6 bg-[var(--tableHeader)] dark:bg-[var(--darkTableHeader)] gap-4 p-4 mt-4">
                <div className="col-span-2 text-start">
                    <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize">{t("fullname")}</span>
                </div>
                <div className="col-span-1 text-start">
                    <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize">{t("username")}</span>
                </div>
                <div className="col-span-1 text-center">
                    <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize">{t("followers")}</span>
                </div>
                <div className="col-span-1 text-center">
                    <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize">{t("coins")}</span>
                </div>
                <div className="col-span-1 text-end">
                    <span className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium capitalize">{t("reedMore")}</span>
                </div>
            </div>
        </div>
    );
};

export default TableHeader;