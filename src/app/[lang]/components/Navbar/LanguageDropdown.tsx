"use client";
import Image from "next/image";
import UZ from "../../../../../public/images/uz.png"
import RU from "../../../../../public/images/ru.png"
import EN from "../../../../../public/images/en.png"
import { LanguageDropdownProps } from "types/component";

const languages = [
    { code: "uz", title: "uzbek", image: UZ },
    { code: "ru", title: "russian", image: RU },
    { code: "en", title: "english", image: EN },
];

export const LanguageDropdown = ({ selectedLang, setOpen, open, place, changeLanguage }: LanguageDropdownProps) => (
    <div className="relative">
        <div onClick={() => setOpen(!open)} className="w-[34px] h-[34px] rounded-full bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center cursor-pointer">
            <Image className="w-[20px] h-[15px]" width={15} height={15} src={languages.find((l) => l.code === selectedLang)?.image || ""} alt="Language Image" />
        </div>
        {open && (
            <div className={`absolute z-100 w-max bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-sm box-shadow ${place === "auth" ? 'top-10 end-0 md:start-0' : 'top-[50px] lg:top-[55px] end-0'} `}>
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