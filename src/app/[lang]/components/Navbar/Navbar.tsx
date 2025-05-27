
"use client";

import React, { useState, memo } from "react";

import { FaSearchPlus } from "react-icons/fa";
import { BiCommentDots } from "react-icons/bi";
import { TiWeatherSunny } from "react-icons/ti";
import { FaRegMoon, FaBars, FaBell } from "react-icons/fa6";

import { useAppContext } from "@/context/AppContext";

import { UserDropdown } from "./UserDropdown";
import { LanguageDropdown } from "./LanguageDropdown";
import { useLanguage, useTheme, useUserData } from "./hooks";
import Image from "next/image";

const Navbar = memo(() => {
    const { user, logout } = useAppContext();
    const { isDarkMode, toggleTheme } = useTheme();
    const { selectedLang, changeLanguage } = useLanguage();

    const userData = useUserData(user);
    const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);

    if (!userData) return null;

    return (
        <nav id="navbar" className="navbar bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] py-4 px-8">
            <div className="grid grid-cols-12 w-full items-center">
                <div className="col-span-2 xl:col-span-6">
                    <div className="w-[34px] h-[34px] rounded-full bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center block sm:hidden">
                        <FaBars className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                    </div>
                    <div className="hidden xl:flex items-center gap-3 h-full">
                        <FaSearchPlus className="size-5 text-[var(--tailGrids)]" />
                        <input type="search" placeholder="Search" className="w-full h-full py-2 px-1 border-0 bg-transparent outline-0 " aria-label="Search" />
                    </div>
                </div>
                <div className="col-span-10 xl:col-span-6">
                    <div className="flex items-center gap-4 justify-end">
                        <div className="flex items-center gap-3">
                            <button onClick={toggleTheme} className="w-[34px] h-[34px] rounded-full bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center" aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"} >
                                {!isDarkMode ? (
                                    <FaRegMoon className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                                ) : (
                                    <TiWeatherSunny className="size-6 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                                )}
                            </button>
                            <button className="w-[34px] h-[34px] rounded-full bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center" aria-label="Notifications">
                                <FaBell className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                            </button>
                            <button className="w-[34px] h-[34px] rounded-full bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center" aria-label="Messages" >
                                <BiCommentDots className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                            </button>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="text-end hidden lg:block">
                                <h5 className="text-[var(--dark)] dark:text-[var(--whi)] text-[14px] font-semibold">
                                    {userData.firstname} {userData.lastname}
                                </h5>
                                <span className="text-[var(--tailGrids)] text-[12px] font-medium">
                                    {userData.username}
                                </span>
                            </div>
                            <div className="hidden lg:block">
                                <Image src={userData?.image || ""} width={45} height={45} className="rounded-full w-[45px] h-[45px]" alt={`${userData.firstname} ${userData.lastname}'s profile`} />                            </div>
                            <div className="flex items-center gap-3">
                                <LanguageDropdown
                                    selectedLang={selectedLang}
                                    open={isLanguageDropdownOpen}
                                    changeLanguage={changeLanguage}
                                    setOpen={setLanguageDropdownOpen}
                                />
                                <UserDropdown
                                    user={userData}
                                    logout={logout}
                                    open2={isUserDropdownOpen}
                                    setOpen2={setUserDropdownOpen}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
});

Navbar.displayName = "Navbar";
export default Navbar;