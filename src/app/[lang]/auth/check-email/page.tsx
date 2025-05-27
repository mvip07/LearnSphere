"use client"
import { useGoToNextPage } from "@/hooks/useGoToNextPage";
import { BiLeftArrowAlt } from "react-icons/bi";

export default function CheckEmail() {
    const goTo = useGoToNextPage()
    return (
        <form onSubmit={(e) => { e.preventDefault(); goTo("auth/login") }} className="w-full h-full overflow-auto scroll-bar-none">
            <h2 className="font-bold text-[var(--dark)] dark:text-[var(--whi)] text-[22px] md:text-[28px] text-start leading-[24px] md:leading-[36px]">
                We&apos;ve Sent You a Link
            </h2>
            <p className="text-[14px] text-[var(--authText)] text-start font-medium leading-normal mt-3">
                Please check your email inbox and click on the provided link to reset your
                password. If you don&apos;t receive email,
                <span onClick={() => goTo("auth/forgot-password")} className="mt-5 font-medium text-[14px] leading-normal text-[var(--primary)] cursor-pointer ms-2">
                    Click here to resend
                </span>
            </p>
            <div className="my-6 grid">
                <button type="submit" className="w-full flex items-center justify-center gap-4 rounded-lg py-2 md:py-2.5 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)]">
                    <BiLeftArrowAlt className="size-7" />Back to Login
                </button>
            </div>
        </form>
    )
}