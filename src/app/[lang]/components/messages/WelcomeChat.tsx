import { FaMessage } from "react-icons/fa6"
import useTranslation from "@services/languages"

const WelcomeChat = () => {
    const t = useTranslation()
    return (
        <div className="bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] box-shadow hidden w-full h-full lg:flex items-center justify-center flex-col p-4">
            <div className="w-20 h-20 bg-[var(--primary)] rounded-full flex items-center justify-center">
                <FaMessage className="size-10 text-[var(--whi)]" />
            </div>
            <h2 className="text-[22px] text-[var(--dark)] dark:text-[var(--whi)] font-bold leading-normal my-3 text-center">{t("welcomeToChat")}</h2>
            <p className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium leading-normal text-center">{t("welcomeToChatText")}</p>
        </div>
    )
}

export default WelcomeChat