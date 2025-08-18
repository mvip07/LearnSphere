"use client"

import { useState } from "react";
import Loader from "@components/Loader";
import { useLanguage } from "@components/navbar/hooks";
import { LanguageDropdown } from "@components/navbar/LanguageDropdown";

import { useGoToNextPage } from "@hooks/useGoToNextPage";
import { useForgotPassword } from "@features/auth/hooks/useForgotPassword";
import useTranslation from "@services/languages";

export default function ForgotPassword() {
    const t = useTranslation()
    const goTo = useGoToNextPage()
    const { selectedLang, changeLanguage } = useLanguage();
    const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
    const { handleInputChange, forgotPasswordSubmit, validOrInvalid, loading } = useForgotPassword();
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
            <form onSubmit={forgotPasswordSubmit} className="w-full h-full overflow-auto" >
                <div className="">
                    <h2 className="font-bold text-[var(--dark)] dark:text-[var(--whi)] text-[22px] md:text-[28px] text-start leading-[24px] md:leading-[36px]">
                        {t("forgotYourPassword")}
                    </h2>
                </div>
                <div className="form-input">
                    <div className="form-group my-4">
                        <label className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium capitalize mb-2.5 inline-block" htmlFor="email">{t("email")}</label>
                        <div className="relative">
                            <input id="email" name="email" type="email" onChange={handleInputChange} placeholder={t("enterYourEmail")} className="w-full input outline-0" />
                        </div>
                        {
                            validOrInvalid["email"] && validOrInvalid["email"].map((errorMsg, idx) => (
                                <p key={idx} className="text-[13px] text-[var(--error)] font-medium capitalize mt-1 inline-block">{errorMsg}.</p>
                            ))
                        }
                    </div>
                </div>
                <div className="my-6">
                    <button type="submit" disabled={loading}
                        className="w-full flex items-center justify-center gap-5 rounded-lg py-3 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)] cursor-pointer">
                        {loading ? <Loader style={{ background: 'var(--whi)', width: '20px', padding: '3px' }} /> : t("sendPasswordResetLink")}
                    </button>
                </div>

                <div className="my-6 text-center">
                    <p className="font-normal text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal">
                        {t("alreadyHaveAnAccount")}
                        <span onClick={() => goTo("auth/login")} className="font-normal text-[16px] text-[var(--primary)] leading-normal capitilize ms-2 cursor-pointer">{t("signIn")}</span>
                    </p>
                </div>
            </form>
        </>
    )
}