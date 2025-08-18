import Image from "next/image";
import useTranslation from "@services/languages";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaCoins, FaXmark } from "react-icons/fa6";
import { QuizDetailsProps } from "types/component";

const QuizDetails = ({ answer, questions, lang, onClose }: QuizDetailsProps) => {
    const t = useTranslation();
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold text-[var(--dark)] dark:text-[var(--whi)]">
                    {t("quizDetailsId")}: #{answer.quizId}
                </h2>
                <button onClick={onClose} className="w-[34px] h-[34px] rounded-full bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center cursor-pointer" >
                    <FaXmark className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                </button>
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-4">
                    <span className="text-md font-medium text-[var(--textCl)] capitalize dark:text-[var(--darkTextCl)]">
                        {t("totalCoins")}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-[16px] text-[var(--yellow)] font-medium capitalize leading-medium">{answer.totalCoins}</span>
                        <FaCoins className="size-5 text-[var(--yellow)]" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-md font-medium text-[var(--textCl)] capitalize dark:text-[var(--darkTextCl)]">
                        {t("finishedDate")}
                    </span>
                    <span className="text-[14px] text-[var(--dark)] dark:text-[var(--whi)] font-medium capitalize leading-medium">
                        {answer.finishedDate.slice(0, 19).replace('T', ' ')}
                    </span>
                </div>
                <h3 className="text-[22px] font-semibold text-[var(--dark)] dark:text-[var(--whi)] mt-4">
                    {t("questions")}
                </h3>
                {answer.questions && answer.questions.map((q, idx) => {
                    const question = questions.find(sq => q.id === sq.id);
                    if (!question) return null;
                    return (
                        <div key={idx} className="border-t border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] pt-4">
                            <h4 className="text-[20px] font-medium text-[var(--textCl)] dark:text-[var(--whi)]">
                                {question.question[lang] || question.question.en}
                            </h4>
                            <div className="mt-2 space-y-2">
                                <p className="text-[14px] text-[var(--dark)] dark:text-[var(--darkTextCl)] font-light capitalize leading-normal">
                                    <span className="font-medium me-2">{t("type")}:</span> {question.type}
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-[14px] text-[var(--dark)] dark:text-[var(--darkTextCl)] font-medium capitalize leading-normal">{t("coins")}:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[16px] text-[var(--yellow)] font-medium capitalize leading-medium">{q.coins}</span>
                                        <FaCoins className="size-5 text-[var(--yellow)]" />
                                    </div>
                                </div>
                                <p className="text-[14px] text-[var(--dark)] dark:text-[var(--darkTextCl)] font-light capitalize leading-normal">
                                    <span className="font-medium me-2">{t("timestamp")}:</span>{" "}
                                    {new Date(question.timestamp).toLocaleString()}
                                </p>

                                {question?.media?.image && (
                                    <Image width={300} height={200} src={question.media.image} alt="Question Image" className="w-full h-72 object-cover rounded" />
                                )}
                                {question?.media?.video && (
                                    <video src={question.media.video} controls className="w-full h-72 object-cover rounded" />
                                )}
                                {question?.media?.audio && (
                                    <audio src={question.media.audio} controls className="w-full rounded" />
                                )}

                                <div className="flex items-center gap-2">
                                    <span className="text-[14px] text-[var(--dark)] dark:text-[var(--darkTextCl)] font-light capitalize leading-normal">{t("userAnswers")}:</span>{" "}
                                    <span className="w-min whitespace-nowrap text-sm text-[var(--whi)] font-medium rounded-md py-1 px-2 bg-[var(--yellow)]">
                                        {q.userAnswers.join(", ") || t("none")}
                                    </span>
                                </div>
                                <p className="flex items-center gap-2">
                                    <span className="text-[14px] text-[var(--dark)] dark:text-[var(--darkTextCl)] font-medium capitalize leading-normal">{t("status")}:</span>
                                    {q.isCorrect ? (
                                        <span className="flex items-center gap-2 w-min text-sm text-white font-medium rounded-md py-1 px-2 bg-[var(--green)]">
                                            <FaCheckCircle /> {t("correct")}
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2 w-min text-sm text-white font-medium rounded-md py-1 px-2 bg-[var(--red)]">
                                            <FaTimesCircle /> {t("incorrect")}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default QuizDetails