"use client";
import React from "react";
import Image from "next/image";

import { FaClock } from "react-icons/fa6";

import Link from "next/link";
import { useActive } from "./useActive";

import useTranslation from "@/services/languages";
import { SideBarProps } from "@/types/Sidebar/sidebar.t";

const CabinetSideBar = ({ sidebar }: { sidebar: SideBarProps[] }) => {
    const t = useTranslation();
    const { isActive } = useActive()

    return t ? (
        <header id="header" className="bg-[var(--dark)] px-4 py-2 p-lg-4 overflow-y-auto design-scrollbar">
            <Link href="/" className="flex items-center justify-between mt-4">
                <Image className="mx-auto" src="/images/orginal-logo.png" alt="LearnSphere Logo" width={150} height={150} />
            </Link>
            <nav className="mt-2">
                <div className="list-group">
                    {sidebar.map((item, index) => (
                        <div key={index} className={`sm:flex items-center justify-center lg:block py-4 px-3 my-2 rounded-[3px] ${isActive(item.url) ? "bg-[var(--menuActive)]" : "bg-transparent"}`}>
                            <Link href={item.disabled ? "#" : item.url} className={`${item.disabled ? "text-[var(--menuLink)]" : "text-[var(--menuLinkDef)]"}`}  >
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <item.icon className={`size-5 ${item.disabled ? "text-[var(--menuLink)]" : "text-[var(--menuLinkDef)]"}`} />
                                        <p className={`text-[16px] leading-normal sm:hidden lg:block ${item.disabled ? "text-[var(--menuLink)]" : "text-[var(--menuLinkDef)]"}`}  >
                                            {t(item.titleKey)}
                                        </p>
                                    </div>
                                    {item.disabled && (
                                        <button className="bg-[var(--primary)] text-white font-medium text-[14px] rounded p-1 sm:hidden lg:block">
                                            <FaClock className="size-5 text-[var(--menuLinkDef)]" />
                                        </button>
                                    )}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </nav>
        </header>
    ) : null;
};

export default React.memo(CabinetSideBar);