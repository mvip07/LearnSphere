"use client"
import { BsGrid } from "react-icons/bs";
import { GiProgression } from "react-icons/gi";
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlineTopic } from "react-icons/md";
import { BiBriefcase, BiHelpCircle } from "react-icons/bi";
import { FaRegQuestionCircle, FaUsersCog } from "react-icons/fa";
import { FaQuestion, FaRegEnvelope, FaRegUser, FaUserLock, FaUserPen, FaUsers } from "react-icons/fa6";

export const CABINETSIDEBAR = [
    { id: 1, icon: BiBriefcase, url: "/cabinet", titleKey: "cabinet", disabled: false },
    { id: 5, icon: FaQuestion, url: "/cabinet/quiz", titleKey: "questionTest", disabled: false },
    { id: 6, icon: FaRegEnvelope, url: "/cabinet/messages", titleKey: "messages", disabled: false },
    { id: 7, icon: FaRegUser, url: "/cabinet/ranking", titleKey: "ranking", disabled: false },
    { id: 2, icon: FaUserPen, url: "/profile/edit", titleKey: "profileEdit", disabled: false },
    { id: 8, icon: BiHelpCircle, url: "/help", titleKey: "help", disabled: true },
];

export const DASHBOARDSIDEBAR = [
    { id: 1, icon: BsGrid, url: "/dashboard", titleKey: "Dashboard", disabled: false },
    { id: 2, icon: FaUsersCog, url: "/dashboard/roles", titleKey: "Roles", disabled: false },
    { id: 3, icon: FaUserLock, url: "/dashboard/permissions", titleKey: "Permissions", disabled: false },
    { id: 4, icon: FaUsers, url: "/dashboard/users", titleKey: "Users", disabled: false },
    { id: 5, icon: GiProgression, url: "/dashboard/levels", titleKey: "Level", disabled: false },
    { id: 6, icon: MdOutlineTopic, url: "/dashboard/topics", titleKey: "Topics", disabled: false },
    { id: 7, icon: TbCategoryPlus, url: "/dashboard/categories", titleKey: "Categories", disabled: false },
    { id: 8, icon: FaRegQuestionCircle, url: "/dashboard/questions", titleKey: "Questions", disabled: false },
];