"use client";
import React from "react";
import Image from "next/image";
import { FaClock } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import useTranslation from "@/services/languages";

interface SideBarProps {
    id: number,
    url: string,
    icon: IconType,
    titleKey: string,
    disabled: boolean,
}

const CabinetSideBar = ({ sidebar }: { sidebar: SideBarProps[] }) => {
    console.log("SideBar", new Date().getMilliseconds())
    const t = useTranslation()
    return t && (
        <header id="header" className="bg-[var(--dark)] px-4 p-lg-4 overflow-y-auto design-scrollbar">
            <div className="flex items-center justify-between my-4">
                <a href="/">
                    {/* <Image
                        width={40}
                        height={40}
                        loading="lazy"
                        alt="TailAdmin Logo Image"
                        src="http://localhost:8000/uploads/categories/image-1737794087144-168018560.jpg"
                    /> */}
                </a>
            </div>
            <nav className="mt-2">
                <div className="list-group">
                    {sidebar.map((i, index) => (
                        <div
                            key={index}
                            // onClick={() => i.disabled ? "" : setLocal(i.url)}
                            className={`sm:flex items-center justify-center lg:block py-4 px-3 my-2 rounded-[3px] ${i.url ? "bg-[var(--menuActive)]" : "bg-transparent"}`}>
                            <a href={i.disabled ? "#" : i.url} className={`${i.disabled ? 'text-[var(--menuLink)]' : 'text-[var(--menuLinkDef)]'}`}>
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <i.icon className={`size-5 ${i.disabled ? 'text-[var(--menuLink)]' : 'text-[var(--menuLinkDef)]'}`} />
                                        <p className={`text-[16px] leading-normal sm:hidden lg:block ${i.disabled ? 'text-[var(--menuLink)]' : 'text-[var(--menuLinkDef)]'}`}>
                                            {t(i.titleKey)}
                                        </p>
                                    </div>
                                    {
                                        i.disabled && (<button className="bg-[var(--primary)] text-white font-medium text-[14px] rounded p-1 sm:hidden lg:block"><FaClock className="size-5 text-[var(--menuLinkDef)]" /></button>)
                                    }
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </nav>
        </header>
    );
};

export default React.memo(CabinetSideBar);