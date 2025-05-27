import { IconType } from "react-icons/lib";

export interface SideBarProps {
    id: number;
    url: string;
    icon: IconType;
    titleKey: string;
    disabled: boolean;
}