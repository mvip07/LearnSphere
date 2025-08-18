import React from "react";
import { FaTriangleExclamation } from "react-icons/fa6"
import { DeleteModalProps } from "src/types/component";

export const DeleteModal = ({ title, text, setCancel, setDelete }: DeleteModalProps) => {
    return (
        <div className="w-full h-full fixed top-0 start-0 backdrop-blur-md px-4">
            <div className="relative top-1/2 start-1/2 -translate-y-1/2 -translate-x-1/2 w-full sm:max-w-[576px] z-[1000] py-12 px-8 bg-[var(--whi)] dark:bg-[var(--dark)] rounded-md">
                <div className="mx-auto text-center w-16 h-16 bg-[#dc354694] rounded-full flex items-center justify-center">
                    <FaTriangleExclamation className="size-8 text-[var(--red)]" />
                </div>
                <h2 className="my-6 text-xl md:text-2xl text-[var(--dark)] dark:text-[var(--whi)] font-bold leading-normal text-center capitalize">
                    {title}
                </h2>
                <p className="text-[16px] font-medium leading-normal text-center text-[var(--textCl)] text-[var(--darkTextCl)]">
                    {text}
                </p>

                <div className="btn-group flex items-center gap-5 justify-center mt-10">
                    <button onClick={() => setCancel(false)} className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] font-medium leading-normal capitilize py-3 md:py-4 px-8 md:px-16 rounded cursor-pointer select-none border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">Cancel</button>
                    <button onClick={setDelete} className="text-[16px] text-[var(--whi)] bg-[var(--red)] font-medium leading-normal capitilize py-3 md:py-4 px-8 md:px-16 rounded cursor-pointer">Delete</button>
                </div>
            </div>
        </div>
    )
}