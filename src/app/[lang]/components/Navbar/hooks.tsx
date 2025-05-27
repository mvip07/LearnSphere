
import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback, useMemo, useContext } from "react";

import { ThemeContext } from "../ThemeProvider";
import { User } from "@/types/Navbar/navbar.t";

const SUPPORTED_LOCALES = ["uz", "en", "ru"] as const;
const DEFAULT_LOCALE = "uz";

type LanguageCode = typeof SUPPORTED_LOCALES[number];

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const useLanguage = () => {
    const pathname = usePathname();
    const router = useRouter();

    const getCurrentLocale = useCallback((): LanguageCode => {
        const pathSegments = pathname.split("/").filter((segment) => segment);
        const firstSegment = pathSegments[0] as LanguageCode;
        return SUPPORTED_LOCALES.includes(firstSegment) ? firstSegment : DEFAULT_LOCALE;
    }, [pathname]);

    const [selectedLang, setSelectedLang] = useState<LanguageCode>(() => {
        if (typeof window !== "undefined") {
            const savedLang = localStorage.getItem("lang") as LanguageCode | null;
            return savedLang && SUPPORTED_LOCALES.includes(savedLang) ? savedLang : getCurrentLocale();
        }
        return DEFAULT_LOCALE;
    });

    const setLanguageCookie = useCallback((lang: LanguageCode) => {
        document.cookie = `lang=${lang}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 days
    }, []);

    const changeLanguage = useCallback((lang: LanguageCode) => {
        if (!SUPPORTED_LOCALES.includes(lang)) {
            lang = DEFAULT_LOCALE;
        }
        setSelectedLang(lang);
        localStorage.setItem("lang", lang);
        setLanguageCookie(lang);

        let cleanPathname = pathname;
        SUPPORTED_LOCALES.forEach((locale) => {
            cleanPathname = cleanPathname.replace(new RegExp(`^/${locale}(?=/|$)`, "i"), "");
        });
        const newPath = cleanPathname === "/" ? `/${lang}` : `/${lang}${cleanPathname}`;
        router.push(newPath);
    }, [pathname, router, setLanguageCookie]);

    return { selectedLang, changeLanguage, getCurrentLocale };
};

export const useUserData = (user: User | null) => {
    return useMemo(() =>
        user
            ? {
                id: user.id,
                firstname: user.firstname?.length > 10 ? user.firstname.slice(0, 10) + "..." : user.firstname,
                lastname: user.lastname?.length > 10 ? user.lastname.slice(0, 14) + "..." : user.lastname,
                username: user.username?.length > 18 ? user.username.slice(0, 18) + "..." : user.username,
                image: user.image,
            }
            : null,
        [user]);
};