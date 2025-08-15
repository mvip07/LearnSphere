import { usePathname } from "next/navigation";

export const useActive = () => {
    const pathname = usePathname();

    const isActive = (url: string) => {
        const cleanPath = pathname.replace(/^\/(en|ru|uz)/, '');

        if (url === "/cabinet" || url === "/") {
            return cleanPath === "/cabinet" || cleanPath === "/";
        }
        return cleanPath.endsWith(url);
    };

    return { isActive }
}