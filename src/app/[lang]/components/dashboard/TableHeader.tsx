import { useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa6";
import { TableHeaderProps } from "@/types/component.t";

export const TableHeader = ({ limit, search, btnTitle, onAddClick, onLimitChange }: TableHeaderProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [search]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        onLimitChange("search", value);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    return (
        <>
            <div className="w-full block sm:flex items-center justify-between items-center gap-4">
                <div className="limit">
                    <select
                        value={limit}
                        className="input outline-0"
                        onChange={(e) => onLimitChange("limit", Number(e.target.value))}>
                        {[5, 10, 15, 20, 30, 40, 50].map((limitOption) => (
                            <option key={limitOption} value={limitOption}> {limitOption}</option>
                        ))}
                    </select>
                </div>

                <div className="w-full flex items-center justify-end gap-4 mt-4 sm:mt-0">
                    <input
                        type="text"
                        value={search}
                        ref={inputRef}
                        placeholder="Enter your Searching..."
                        onChange={(e) => handleSearchChange(e)}
                        className="outline-0 input w-full sm:w-min"
                    />
                    <button onClick={onAddClick} className="flex items-center justify-center gap-3 rounded-lg py-4 sm:py-3 px-4 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)] cursor-pointer">
                        <FaPlus className="size-5 text-[var(--whi)] dark:text-[var(--whi)]" />
                        <p className="hidden sm:block">{btnTitle}</p>
                    </button>
                </div>
            </div>
            <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] my-4"></div>
        </>
    );
};