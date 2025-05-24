"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState, useCallback, memo, useMemo } from "react";
import { useAppContext } from "@/context/AppContextType";
import { useGoToNextPage } from "@/hooks/useGoToNextPage";
import { BiCommentDots } from "react-icons/bi";
import { TiWeatherSunny } from "react-icons/ti";
import { FaSearch, FaRegMoon, FaAngleUp, FaAngleDown, FaRegUser } from "react-icons/fa";
import { FaAddressBook, FaArrowRightFromBracket, FaBars, FaBell, FaGear } from "react-icons/fa6";

const SUPPORTED_LOCALES = ["uz", "en", "ru"];
const DEFAULT_LOCALE = "uz";

const languages = [
    { code: "uz", title: "uzbek", image: "../../images/uz.png" },
    { code: "ru", title: "russian", image: "../../images/ru.png" },
    { code: "en", title: "english", image: "../../images/en.png" },
];

const LanguageDropdown = memo(
    ({
        selectedLang,
        setOpen,
        open,
        changeLanguage,
    }: {
        selectedLang: string;
        setOpen: (open: boolean) => void;
        open: boolean;
        changeLanguage: (lang: string) => void;
    }) => (
        <div className="relative">
            <div
                onClick={() => setOpen(!open)}
                className="w-[34px] h-[34px] rounded-full bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center cursor-pointer"
            >
                <img
                    className="w-[20px] h-[15px]"
                    src={languages.find((l) => l.code === selectedLang)?.image}
                    alt=""
                />
            </div>
            {open && (
                <div className="absolute top-[55px] z-100 end-0 w-max bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-sm box-shadow">
                    <ul className="px-0 py-2">
                        {languages.map(({ code, title, image }) => (
                            <li
                                key={code}
                                onClick={() => changeLanguage(code)}
                                className="flex items-center gap-4 px-4 py-2 cursor-pointer hover:bg-[var(--lgblue)] dark:hover:bg-[var(--dark)]"
                            >
                                <img className="w-[20px] h-[15px] rounded-sm" src={image} alt="" />
                                <span className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] capitalize leading-normal font-medium">
                                    {title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
);

const UserDropdown = memo(
    ({
        open2,
        setOpen2,
        user,
        logout,
    }: {
        open2: boolean;
        setOpen2: (open: boolean) => void;
        user: { id: string; firstname: string; lastname: string; username: string; image: string | undefined };
        logout: () => void;
    }) => (
        <div className="relative">
            <div
                onClick={() => setOpen2(!open2)}
                className="cursor-pointer text-[var(--dark)] dark:text-[var(--whi)]"
            >
                {open2 ? (
                    <FaAngleUp className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)] cursor-pointer" />
                ) : (
                    <FaAngleDown className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)] cursor-pointer" />
                )}
            </div>
            {open2 && (
                <div className="absolute top-[38px] end-0 w-max mt-2 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-sm box-shadow">
                    <ul className="px-4 py-2">
                        <li className="cursor-pointer flex items-center gap-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)] p-3 capitalize leading-normal font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primary)]">
                            <FaRegUser className="size-5" />
                            <a href={`/profile/${user.id}`} className="text-[16px]">
                                My Profile
                            </a>
                        </li>
                        <li className="cursor-pointer flex items-center gap-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)] p-3 capitalize leading-normal font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primary)]">
                            <FaAddressBook className="size-5" />
                            <a href="/cabinet/messages" className="text-[16px]">
                                My Contacts
                            </a>
                        </li>
                        <li className="cursor-pointer flex items-center gap-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)] p-3 capitalize leading-normal font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primary)]">
                            <FaGear className="size-5" />
                            <a href="/cabinet/profile" className="text-[16px]">
                                Account Settings
                            </a>
                        </li>
                    </ul>
                    <div className="line w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>
                    <ul className="px-4 py-2">
                        <li
                            onClick={logout}
                            className="cursor-pointer flex items-center gap-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)] p-3 capitalize leading-normal font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primary)]"
                        >
                            <FaArrowRightFromBracket className="size-5" />
                            <span className="text-[16px]">Log Out</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
);

function CabinetNavbar() {
    const { user, logout } = useAppContext();
    const goTo = useGoToNextPage();
    const pathname = usePathname();
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [selectedLang, setSelectedLang] = useState<string>(DEFAULT_LOCALE);
    const [open, setOpen] = useState<boolean>(false);
    const [open2, setOpen2] = useState<boolean>(false);

    // Cookie'ni yangilash funksiyasi
    const setLanguageCookie = useCallback((lang: string) => {
        document.cookie = `lang=${lang}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 kunlik cookie
    }, []);

    const changeLanguage = useCallback(
        (lang: string) => {
            if (!SUPPORTED_LOCALES.includes(lang)) {
                lang = DEFAULT_LOCALE; // Agar noto'g'ri til kiritilsa, default uz
            }
            setSelectedLang(lang);
            localStorage.setItem("lang", lang);
            setLanguageCookie(lang); // Cookie'ni yangilash
            const newPath = pathname.replace(/^\/(uz|en|ru)/, `/${lang}`);
            goTo(newPath.substring(1)); // /uz/cabinet -> cabinet
            setOpen(false);
        },
        [pathname, goTo, setLanguageCookie]
    );

    useEffect(() => {
        const savedDark = localStorage.getItem("darkMode") === "true";
        let savedLang = localStorage.getItem("lang");
        if (!savedLang || !SUPPORTED_LOCALES.includes(savedLang)) {
            savedLang = DEFAULT_LOCALE;
            localStorage.setItem("lang", savedLang);
            setLanguageCookie(savedLang); // Cookie'ni yangilash
        }
        setIsDarkMode(savedDark);
        setSelectedLang(savedLang);
        document.documentElement.classList.toggle("dark", savedDark);
    }, [setLanguageCookie]);

    const toggleDarkMode = useCallback(() => {
        setIsDarkMode((prev) => {
            const newDarkMode = !prev;
            localStorage.setItem("darkMode", String(newDarkMode));
            document.documentElement.classList.toggle("dark", newDarkMode);
            return newDarkMode;
        });
    }, []);

    const userData = useMemo(
        () =>
            user
                ? {
                    id: user.id,
                    firstname:
                        user.firstname?.length > 10
                            ? user.firstname.slice(0, 10) + "..."
                            : user.firstname,
                    lastname:
                        user.lastname?.length > 10
                            ? user.lastname.slice(0, 10) + "..."
                            : user.lastname,
                    username:
                        user.username?.length > 10
                            ? user.username.slice(0, 10) + "..."
                            : user.username,
                    image: user.image,
                }
                : null,
        [user]
    );

    if (!userData) {
        return null;
    }

    return (
        <nav id="navbar" className="navbar bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] py-4 px-8">
            <div className="grid grid-cols-12 w-full items-center">
                <div className="col-span-2 xl:col-span-6">
                    <div className="w-[34px] h-[34px] rounded-full bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center block sm:hidden">
                        <FaBars className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                    </div>
                    <div className="hidden xl:flex items-center gap-3 h-full">
                        <FaSearch className="size-5 text-[var(--tailGrids)]" />
                        <input
                            type="search"
                            placeholder="Search"
                            className="w-full h-full py-2 px-1 border-0 bg-transparent outline-0"
                        />
                    </div>
                </div>
                <div className="col-span-10 xl:col-span-6">
                    <div className="flex items-center gap-4 float-end">
                        <div className="flex content-center gap-3">
                            <div className="w-[34px] h-[34px] rounded-full bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center">
                                {isDarkMode ? (
                                    <FaRegMoon
                                        onClick={toggleDarkMode}
                                        className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)] cursor-pointer"
                                    />
                                ) : (
                                    <TiWeatherSunny
                                        onClick={toggleDarkMode}
                                        className="size-6 text-[var(--textCl)] dark:text-[var(--darkTextCl)] cursor-pointer"
                                    />
                                )}
                            </div>
                            <div className="w-[34px] h-[34px] rounded-full bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center">
                                <FaBell className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)] cursor-pointer" />
                            </div>
                            <div className="w-[34px] h-[34px] rounded-full bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center">
                                <BiCommentDots className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)] cursor-pointer" />
                            </div>
                        </div>
                        <div className="user_info">
                            <div className="flex gap-2 items-center">
                                <div className="text-end hidden lg:block">
                                    <h5 className="text-[var(--dark)] dark:text-[var(--whi)] cursor-pointer text-[14px] font-semibold">
                                        {userData.firstname} {userData.lastname}
                                    </h5>
                                    <span className="text-[var(--tailGrids)] cursor-pointer text-[12px] font-medium">
                                        {userData.username}
                                    </span>
                                </div>
                                <div className="user_image hidden lg:block">
                                    <img
                                        className="rounded-full cursor-pointer w-[45px] h-[45px]"
                                        src={userData.image}
                                        alt="User Image"
                                    />
                                </div>
                                <div className="ms-2 flex items-center gap-3">
                                    <LanguageDropdown
                                        open={open}
                                        setOpen={setOpen}
                                        selectedLang={selectedLang}
                                        changeLanguage={changeLanguage}
                                    />
                                    <UserDropdown
                                        open2={open2}
                                        setOpen2={setOpen2}
                                        user={userData}
                                        logout={logout}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default memo(CabinetNavbar);