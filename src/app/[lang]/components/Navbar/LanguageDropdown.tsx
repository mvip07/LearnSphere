"use client";
import Image from "next/image";
import { LanguageDropdownProps } from "@/types/Navbar/navbar.t";

const languages = [
    { code: "uz", title: "uzbek", image: "../../images/uz.png" },
    { code: "ru", title: "russian", image: "../../images/ru.png" },
    { code: "en", title: "english", image: "../../images/en.png" },
];

export const LanguageDropdown = ({ selectedLang, setOpen, open, changeLanguage }: LanguageDropdownProps) => (
    <div className="relative">
        <div onClick={() => setOpen(!open)} className="w-[34px] h-[34px] rounded-full bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center cursor-pointer">
            <Image className="w-[20px] h-[15px]" src={languages.find((l) => l.code === selectedLang)?.image || ""} alt="Language Image" />
        </div>
        {open && (
            <div className="absolute top-[55px] z-100 end-0 w-max bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-sm box-shadow">
                <ul className="px-0 py-2">
                    {languages.map(({ code, title, image }) => (
                        <li key={code} onClick={() => changeLanguage(code as ("uz" | "ru" | "en"))} className="flex items-center gap-4 px-4 py-2 cursor-pointer hover:bg-[var(--lgblue)] dark:hover:bg-[var(--dark)]" >
                            <Image width={20} height={15} src={image} alt={`${title} flag`} />
                            <span className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] capitalize leading-normal font-medium">
                                {title}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);