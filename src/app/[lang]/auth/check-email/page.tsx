"use client"
import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useLanguage } from "../../components/navbar/hooks";
import { LanguageDropdown } from "../../components/navbar/LanguageDropdown";
import useTranslation from "@/services/languages";
import { useGoToNextPage } from "@/hooks/useGoToNextPage";

export default function CheckEmail() {
    const goTo = useGoToNextPage()
    const t = useTranslation()
    const { selectedLang, changeLanguage } = useLanguage();
    const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
    return (
        <>
            <div className="fixed z-[100] top-5 end-5 md:start-5">
                <LanguageDropdown
                    place="auth"
                    selectedLang={selectedLang}
                    open={isLanguageDropdownOpen}
                    changeLanguage={changeLanguage}
                    setOpen={setLanguageDropdownOpen}
                />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); goTo("auth/login") }} className="w-full h-full overflow-auto scroll-bar-none">
                <h2 className="font-bold text-[var(--dark)] dark:text-[var(--whi)] text-[22px] md:text-[28px] text-start leading-[24px] md:leading-[36px]">
                    {t("weveSentYouALink")}
                </h2>
                <p className="text-[14px] text-[var(--authText)] text-start font-medium leading-normal mt-3">
                    {t("checkEmailInstruction")} {t("password")}
                    <span onClick={() => goTo("auth/forgot-password")} className="mt-5 font-medium text-[14px] leading-normal text-[var(--primary)] cursor-pointer ms-2">
                        {t("clickHereToResend")}
                    </span>
                </p>
                <div className="my-6 grid">
                    <button type="submit" className="w-full flex items-center justify-center gap-4 rounded-lg py-2.5 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)] cursor-pointer">
                        <BiLeftArrowAlt className="size-7" /> {t("backToLogin")}
                    </button>
                </div>
            </form>
        </>
    )
}