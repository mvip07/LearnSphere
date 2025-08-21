"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { FaCoins, FaRightLong } from "react-icons/fa6";
import QuizTimer from "./QuizTimer";
import InputQuestion from "../Test/InputQuestion";
import MultipleChoice from "../Test/MultipleChoice";
import FillInTheBlank from "../Test/FillInTheBlank";
import useTranslation from "@services/languages";
import { useQuizStore } from "@features/cabinet/quiz/hooks/useQuizStore";
import { useAnswerStatus } from "@features/cabinet/quiz/hooks/useAnswerStatus";

const QuizQuestion = () => {
    const { count, questions, handleNext, answers, initializeQuiz } = useQuizStore();
    const { hasAnswer } = useAnswerStatus();
    const t = useTranslation();
    const { lang } = useParams() as { lang: "en" | "uz" | "ru" };
    const currentQuestion = questions[count];

    useEffect(() => {
        initializeQuiz();
    }, [initializeQuiz]);

    const renderQuestionComponent = () => {
        const sharedProps = {
            answers,
            question: currentQuestion,
            onAnswered: () => { },
        };

        if (["multiple-choice", "video", "image", "audio"].includes(currentQuestion?.type) && currentQuestion?.options) {
            return <MultipleChoice {...sharedProps} />;
        }
        if (["input", "video", "image", "audio"].includes(currentQuestion?.type) && currentQuestion?.correctAnswers) {
            return <InputQuestion {...sharedProps} />;
        }
        if (["fill-in-the-blank", "video", "image", "audio"].includes(currentQuestion?.type) && currentQuestion.blanks) {
            return <FillInTheBlank {...sharedProps} />;
        }
        return null;
    };

    if (!currentQuestion) return null;

    return (
        <div className="w-full h-full overflow-y-auto scroll-bar-none bg-[var(--whi)] dark:bg-[var(--darkBoxBg)]">
            <div className="p-4 sticky top-0 z-20 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] border-b border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                <div className="flex items-center justify-between">
                    <h2 className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium uppercase">
                        {t("question")} {count + 1}/{questions.length}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-[16px] text-[var(--coinsCl)] font-semibold">{currentQuestion?.coins}</h3>
                            <FaCoins className="size-5 text-[var(--coinsCl)]" />
                        </div>
                        <QuizTimer questionId={currentQuestion.id} />
                    </div>
                </div>
            </div>

            <div className="h-[calc(100%-148px)] overflow-y-auto p-4">
                <h1 className="text-[22px] text-[var(--dark)] dark:text-[var(--whi)] md:text-[26px] font-bold">
                    {currentQuestion?.question[lang]}
                </h1>

                {currentQuestion?.media && currentQuestion?.type && (
                    <div className="my-4">
                        {currentQuestion.type === "image" && (
                            <Image src={currentQuestion.media.image as string} width={100} height={100} alt="Image" className="w-full md:w-1/2 aspect-video" />
                        )}
                        {currentQuestion.type === "video" && (
                            <video className="w-full md:w-1/2 aspect-video" controls autoPlay>
                                <source src={currentQuestion.media.video as string} type="video/mp4" />
                            </video>
                        )}
                        {currentQuestion.type === "audio" && (
                            <audio className="w-full" controls autoPlay>
                                <source src={currentQuestion.media.audio as string} type="audio/mpeg" />
                            </audio>
                        )}
                    </div>
                )}

                <div className="my-4">
                    {renderQuestionComponent()}
                </div>
            </div>

            <div className="w-full p-4 flex justify-end border-t sticky bottom-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] z-20 border-t border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                <button disabled={!hasAnswer} onClick={handleNext} className={`text-[14px] font-medium py-2 px-4 rounded flex items-center gap-2 transition-colors bg-[var(--primary)] text-[var(--whi)] ${!hasAnswer ? "cursor-not-allowed" : "cursor-pointer"}`}>
                    {count === questions.length - 1 ? t("finished") : (
                        <>{t("next")} <FaRightLong className="size-5" /></>
                    )}
                </button>
            </div>
        </div>
    );
};

export default QuizQuestion;