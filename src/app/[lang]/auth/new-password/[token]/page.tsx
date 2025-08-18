"use client";

import { useState } from "react";
import Loader from "@components/Loader";
import { useLanguage } from "@components/navbar/hooks";
import { LanguageDropdown } from "@components/navbar/LanguageDropdown";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useNewPassword } from "@features/auth/hooks/useNewPassword";
import useTranslation from "@services/languages";

export default function NewPassword() {
    const t = useTranslation()
    const { selectedLang, changeLanguage } = useLanguage();
    const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
    const { fields, handleInputChange, newPasswordSubmit, validOrInvalid, loading, passwordVisible, togglePasswordVisibility } = useNewPassword();
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

            <form onSubmit={newPasswordSubmit} className="w-full h-full overflow-auto">
                <h2 className="font-bold text-[var(--dark)] dark:text-[var(--whi)] text-[24px] md:text-[34px] text-start leading-[30px] md:leading-[45px]">
                    {t("setANewPassword")}
                </h2>
                <div className="form-input">
                    {
                        fields.map((field, index) => (
                            <div className="form-group my-4 " key={index}>
                                <label className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium capitalize mb-2.5 inline-block" htmlFor={field.name}>{field.name}</label>
                                <div className="relative">
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        onChange={handleInputChange}
                                        className="w-full input outline-0"
                                        placeholder={`Enter your ${field.name}`}
                                        type={passwordVisible.visible === field.name && passwordVisible.active ? "text" : field.type}
                                    />
                                    {
                                        (field.name === "password" || field.name === "confirmPassword") && (
                                            <span onClick={() => togglePasswordVisibility(field.name)}>
                                                {
                                                    passwordVisible.visible === field.name && passwordVisible.active ? (
                                                        <EyeIcon className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)] absolute inset-y-2/4 translate-y-[-50%] end-[20px] cursor-pointer opacity-50" />
                                                    ) : (
                                                        <EyeSlashIcon className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)] absolute inset-y-2/4 translate-y-[-50%] end-[20px] cursor-pointer opacity-50" />
                                                    )
                                                }
                                            </span>
                                        )
                                    }
                                </div>
                                {
                                    validOrInvalid[field.name] && validOrInvalid[field.name].map((errorMsg, idx) => (
                                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium capitalize mt-1 inline-block">{errorMsg}.</p>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="my-6">
                    <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-5 rounded-lg py-3 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)] cursor-pointer">
                        {loading ? <Loader style={{ background: 'var(--whi)', width: '20px', padding: '3px' }} /> : t("createPassword")}
                    </button>
                </div>
            </form>
        </>
    );
}
