"use client";
import Link from "next/link";
import { UserDropdownProps } from "types/component";
import { FaAngleUp, FaAngleDown, FaRegUser } from "react-icons/fa";
import { FaAddressBook, FaArrowRightFromBracket, FaGear } from "react-icons/fa6";

export const UserDropdown = ({ user, open2, logout, setOpen2 }: UserDropdownProps) => (
    <div className="relative">
        <div onClick={() => setOpen2(!open2)} className="cursor-pointer text-[var(--dark)] dark:text-[var(--whi)]">
            {open2 ? (
                <FaAngleUp className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)] cursor-pointer" />
            ) : (
                <FaAngleDown className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)] cursor-pointer" />
            )}
        </div>
        {open2 && (
            <div className="absolute z-100 top-[41px] lg:top-[46px] end-0 w-max bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-sm box-shadow">
                <ul className="px-4 py-2">
                    <li className="cursor-pointer flex items-center gap-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)] p-3 capitalize leading-normal font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primary)]">
                        <FaRegUser className="size-5" />
                        <Link href={`/profile/${user.id}`} className="text-[16px]">
                            My Profile
                        </Link>
                    </li>
                    <li className="cursor-pointer flex items-center gap-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)] p-3 capitalize leading-normal font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primary)]">
                        <FaAddressBook className="size-5" />
                        <Link href="/cabinet/messages" className="text-[16px]">
                            My Contacts
                        </Link>
                    </li>
                    <li className="cursor-pointer flex items-center gap-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)] p-3 capitalize leading-normal font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primary)]">
                        <FaGear className="size-5" />
                        <Link href="/profile/edit" className="text-[16px]">
                            Account Settings
                        </Link>
                    </li>
                </ul>
                <div className="line w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>
                <ul className="px-4 py-2">
                    <li onClick={logout} className="cursor-pointer flex items-center gap-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)] p-3 capitalize leading-normal font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primary)]">
                        <FaArrowRightFromBracket className="size-5" />
                        <span className="text-[16px]">Log Out</span>
                    </li>
                </ul>
            </div>
        )}
    </div>
) 