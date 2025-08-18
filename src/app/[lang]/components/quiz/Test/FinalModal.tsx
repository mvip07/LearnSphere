import { memo } from "react";
import { useRouter } from "next/navigation";
import { FaCircleCheck } from "react-icons/fa6";
import useTranslation from "@services/languages";
import { useQuizStore } from "@features/cabinet/quiz/hooks/useQuizStore";
import { FinalModalProps } from "types/component";

const FinalModal = ({ total, totalCoins, correctAnswers }: FinalModalProps) => {
    const router = useRouter();
    const t = useTranslation();


    const handleBack = () => {
        router.push("/cabinet");
        useQuizStore.getState().reset()
    };

    return (
        <div className="w-[90%] lg:w-[576px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] rounded-lg shadow-lg">
            <div className="flex items-center justify-center flex-col py-4">
                <FaCircleCheck className="size-20 text-[var(--green)]" />
                <h2 className="text-[20px] md:text-[24px] lg:text-[26px] text-[var(--green)] font-bold capitalize leading-normal my-3">
                    {t("quizCompleted")}
                </h2>
                <p className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium leading-normal capitalize">
                    {t("correctAnswers")} {correctAnswers}/{total}
                </p>
                <p className="text-[16px] text-[var(--yellow)] font-bold leading-normal capitalize mt-3">
                    {t("earnedCoins")} {totalCoins}
                </p>
                <button onClick={handleBack} className="text-[14px] text-[var(--primary)] border border-[var(--primary)] font-medium py-2 px-4 mt-4 rounded hover:bg-[var(--primary)] hover:text-[var(--whi)] hover:border-0 hover:cursor-pointer transition-colors">
                    {t("backToCabinet")}
                </button>
            </div>
        </div>
    );
};

export default memo(FinalModal);