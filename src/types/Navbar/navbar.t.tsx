export interface LanguageDropdownProps {
    selectedLang: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    changeLanguage: (lang: "uz" | "ru" | "en") => void;
}

export interface UserDropdownProps {
    open2: boolean;
    logout: () => void;
    setOpen2: (open: boolean) => void;
    user: { id: string; firstname: string; lastname: string; username: string; image: string | undefined };
}

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    image: string | undefined;
};
