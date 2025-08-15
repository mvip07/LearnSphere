import useTranslation from "@/services/languages";
import { PiEmpty } from "react-icons/pi";

export default function Empty() {
    const t = useTranslation()
    return (
        <div className="w-full flex items-center justify-center overflow-hidden">
            <div className="bg-[var(--whi)] dark:bg-[var(--darkBg)] px-4 py-12 text-center transform transition duration-500 hover:rotate-1 hover:scale-105">
                <PiEmpty className="mx-auto mb-6 w-16 h-16 text-[var(--textCl)] dark:text-[var(--whi)]" />
                <h1 className="text-3xl font-bold text-[var(--dark)] dark:text-[var(--whi)] mb-4">{t("emptyTitle")}</h1>
                <p className="text-[var(--textCl)] dark:text-[var(--darkTextCl)]">{t("emptyText")}</p>
            </div>
        </div>
    )
}