import React from "react";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";
import { TableFooterProps } from "@/types/component.t";

export const TableFooter = ({ page, onPrev, onNext, totalPages }: TableFooterProps) => {
    return (
        <>
            <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] mb-4"></div>
            <div className="flex items-center justify-end mt-4 gap-2">
                <button
                    onClick={onPrev}
                    disabled={page <= 1}
                    className="flex items-center justify-center gap-5 rounded-md px-3 py-2 md:py-3 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)] disabled:opacity-50 cursor-pointer">
                    <FaLeftLong className="size-4 text-[var(--whi)]" />
                </button>
                <span className="text-[14px] font-medium leading-normal text-[var(--dark)] dark:text-[var(--whi)]">Page {page} of {totalPages}</span>
                <button
                    onClick={onNext}
                    disabled={page >= totalPages}
                    className="flex items-center justify-center gap-5 rounded-md px-3 py-2 md:py-3 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)] disabled:opacity-50 cursor-pointer"
                >
                    <FaRightLong className="size-4 text-[var(--whi)]" />
                </button>
            </div>
        </>
    );
};