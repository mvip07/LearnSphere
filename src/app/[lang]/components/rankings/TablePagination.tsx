import { memo, useCallback } from "react";
import useTranslation from "@services/languages";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";
import { TablePaginationProps } from "types/component";

const TablePagination = memo(({ page, totalPages, onPageChange }: TablePaginationProps) => {
    const t = useTranslation();

    const handlePrevPage = useCallback(() => {
        onPageChange(page - 1);
    }, [page, onPageChange]);

    const handleNextPage = useCallback(() => {
        onPageChange(page + 1);
    }, [page, onPageChange]);

    return (
        <div className="flex items-center justify-end gap-2 sticky bottom-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] z-20 border-t border-t-2 border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] p-4">
            <button
                disabled={page === 1}
                onClick={handlePrevPage}
                aria-label={t("previousPage")}
                className="flex items-center justify-center gap-5 rounded-md px-3 py-2 md:py-3 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)] disabled:opacity-50"
            >
                <FaLeftLong className="size-4 text-[var(--whi)]" />
            </button>
            <span className="text-[var(--textCl)] dark:text-[var(--darkTextCl)]">
                {t("page")} {page} {t("of")} {totalPages}
            </span>
            <button
                disabled={page === totalPages}
                onClick={handleNextPage}
                aria-label={t("nextPage")}
                className="flex items-center justify-center gap-5 rounded-md px-3 py-2 md:py-3 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)] disabled:opacity-50"
            >
                <FaRightLong className="size-4 text-[var(--whi)]" />
            </button>
        </div>
    );
});

TablePagination.displayName = "TablePagination";
export default TablePagination;