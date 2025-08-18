import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import { MultilangQuestion, Question } from "types/quiz";

interface QuestionPreviewModalProps {
    lang: string;
    isOpen: boolean;
    onClose: () => void;
    question: Question | null;
}

export const QuestionPreviewModal = ({ isOpen, lang, onClose, question }: QuestionPreviewModalProps) => {
    if (!isOpen || !question) {
        return null;
    }

    const renderMedia = () => {
        if (!question.media) return null;

        return (
            <div className="mb-4">
                {question.media.image && (
                    <Image width={100} height={100} className="w-full aspect-video rounded" src={question.media.image} alt="Question Image" />
                )}
                {question.media.video && (
                    <video src={question.media.video} className="w-full aspect-video rounded" controls></video>
                )}
                {question.media.audio && (
                    <audio src={question.media.audio} className="w-full" controls></audio>
                )}
            </div>
        );
    };

    // const renderCorrectAnswers = () => {
    //     if (["audio", "video", "image", "multiple-choice"].includes(question.type)) {
    //         const correctOptions = question.options?.filter((opt) => opt.isCorrect) || [];
    //         const correctAnswers = question.correctAnswers || [];
    //         if (correctOptions.length === 0 && correctAnswers.length === 0) {
    //             return <p className="text-[var(--dark)] dark:text-[var(--whi)]">No correct answers defined.</p>;
    //         }
    //         return (
    //             <div className="mt-4">
    //                 <h5 className="text-[16px] font-medium text-[var(--dark)] dark:text-[var(--whi)] mb-2">Correct Answers:</h5>
    //                 <ul className="list-disc pl-5">
    //                     {correctOptions.map((opt, index) => (
    //                         <li key={`opt-${index}`} className="text-[var(--dark)] dark:text-[var(--whi)]">{opt.text}</li>
    //                     ))}
    //                     {correctAnswers.map((ans, index) => (
    //                         <li key={`ans-${index}`} className="text-[var(--dark)] dark:text-[var(--whi)]">{ans}</li>
    //                     ))}
    //                 </ul>
    //             </div>
    //         );
    //     }
    //     return null;
    // };

    const renderQuestionContent = () => {
        switch (question.type) {
            case "multiple-choice":
                return (
                    <>
                        {renderMedia()}
                        {question.options && question.options.length > 0 && (
                            <div className="ps-6 mt-4">
                                <div className="grid grid-cols-2 gap-7 md:gap-x-10 md:gap-y-4">
                                    {question.options.map((option, index) => (
                                        <div key={index} className="col-span-2 xl:col-span-1">
                                            <div className={`relative shadow rounded px-2 py-3 md:px-3 md:py-4 border ${option.isCorrect
                                                ? "border-[var(--primary)] bg-[var(--primary)]"
                                                : "border-[var(--whiLg)] dark:border-0 bg-[var(--whi)] dark:bg-[var(--dark)]"}`}
                                            >
                                                <div className={`absolute w-[50px] h-[50px] top-1/2 start-0 -translate-y-1/2 -translate-x-[25px] border-2 rounded-full shadow flex items-center justify-center ${option.isCorrect
                                                    ? "bg-[var(--primary)] text-[var(--whi)] border-[var(--whi)]"
                                                    : "bg-[var(--whi)] dark:bg-[var(--dark)] dark:text-[var(--darkTextCl)] text-[var(--dark)] border-[var(--whiLg)] dark:border-[var(--darkBoxBg)]"}`}
                                                >
                                                    <span className="font-bold text-[22px] uppercase">{index + 1}</span>
                                                </div>
                                                <h3 className={`ml-5 text-[16px] md:text-[20px] font-bold ${option.isCorrect ? "text-[var(--whi)]" : "text-[var(--dark)] dark:text-[var(--whi)]"}`}>
                                                    {option.text}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                );

            case "input":
                return (
                    <>
                        {renderMedia()}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Enter your answer"
                                value={question.correctAnswers?.[0] || ""}
                                readOnly
                                className="w-full input outline-0"
                            />
                        </div>
                    </>
                );

            case "fill-in-the-blank":
                if (!question.blanks || question.blanks.length === 0) {
                    return <p className="text-[var(--dark)] dark:text-[var(--whi)]">No blanks defined for this question.</p>;
                }

                return (
                    <div>
                        {renderMedia()}
                        <p className="text-[14px] md:text-[18px] font-medium text-[var(--dark)] dark:text-[var(--whi)] mb-4">
                            {question.question[lang as keyof MultilangQuestion].split("_____").map((part, index, array) => (
                                <span key={index}>
                                    {part}
                                    {index < array.length - 1 && (
                                        <input
                                            type="text"
                                            placeholder="_____"
                                            className="input w-24 !px-2 !py-1 !m-1 outline-0"
                                            value={question.blanks && question.blanks[index] ? question.blanks[index].correctAnswers[0] || "" : ""}
                                            readOnly
                                        />
                                    )}
                                </span>
                            ))}
                        </p>
                    </div>
                );

            case "image":
            case "video":
            case "audio":
                return (
                    <>
                        {renderMedia()}
                        {question.options && question.options.length > 0 && (
                            <div className="ps-6 mt-4">
                                <div className="grid grid-cols-2 gap-7 md:gap-x-10 md:gap-y-4">
                                    {question.options.map((option, index) => (
                                        <div key={index} className="col-span-2 xl:col-span-1">
                                            <div className={`relative shadow rounded px-2 py-3 md:px-3 md:py-4 border ${option.isCorrect
                                                ? "border-[var(--primary)] bg-[var(--primary)]"
                                                : "border-[var(--whiLg)] dark:border-0 bg-[var(--whi)] dark:bg-[var(--dark)]"}`}
                                            >
                                                <div className={`absolute w-[50px] h-[50px] top-1/2 start-0 -translate-y-1/2 -translate-x-[25px] border-2 rounded-full shadow flex items-center justify-center ${option.isCorrect
                                                    ? "bg-[var(--primary)] text-[var(--whi)] border-[var(--whi)]"
                                                    : "bg-[var(--whi)] dark:bg-[var(--dark)] dark:text-[var(--darkTextCl)] text-[var(--dark)] border-[var(--whiLg)] dark:border-[var(--darkBoxBg)]"}`}
                                                >
                                                    <span className="font-bold text-[22px] uppercase">{index + 1}</span>
                                                </div>
                                                <h3 className={`ml-5 text-[16px] md:text-[20px] font-bold ${option.isCorrect ? "text-[var(--whi)]" : "text-[var(--dark)] dark:text-[var(--whi)]"}`}>
                                                    {option.text}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {question.correctAnswers && question.correctAnswers.length > 0 && (
                            question.correctAnswers.map((answer, index) =>
                                <input
                                    readOnly
                                    type="text"
                                    key={index}
                                    value={answer}
                                    placeholder="Enter your answer"
                                    className="w-full input outline-0"
                                />
                            )
                        )}

                        {question.blanks && question.blanks.length > 0 && (
                            <p className="text-[14px] md:text-[18px] font-medium text-[var(--dark)] dark:text-[var(--whi)] mb-4">
                                {question.question[lang as keyof MultilangQuestion].split("_____").map((part, index, array) => (
                                    <span key={index}>
                                        {part}
                                        {index < array.length - 1 && (
                                            <input
                                                readOnly
                                                type="text"
                                                placeholder="_____"
                                                className="input w-24 !px-2 !py-1 !m-1 outline-0"
                                                value={question.blanks && question.blanks[index] ? question.blanks[index].correctAnswers[0] || "" : ""}
                                            />
                                        )}
                                    </span>
                                ))}
                            </p>
                        )}
                    </>
                )
            default:
                return <p>Unsupported question type: {question.type}</p>;
        }
    };

    const isFillInTheBlankWithBlanks = question.type === "fill-in-the-blank" && Array.isArray(question.blanks) && question.blanks.length > 0;

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div className="bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] w-full max-w-3xl rounded-lg shadow-lg overflow-y-auto max-h-[90vh] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                <div className="sticky top-0 z-[100] bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] flex items-center justify-between p-4 border-b border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                    <h3 className="text-[var(--dark)] dark:text-[var(--whi)] text-[18px] font-medium leading-normal capitalize">
                        Question Preview
                    </h3>
                    <div
                        onClick={onClose}
                        className="w-10 h-10 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center cursor-pointer"
                        aria-label="Close modal"
                    >
                        <FaXmark className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                    </div>
                </div>
                <div className="p-4">
                    <h4 className="text-[22px] md:text-[26px] font-bold text-[var(--dark)] dark:text-[var(--whi)] mb-4">
                        {isFillInTheBlankWithBlanks ? "Fill in the required fields." : question.question[lang as keyof MultilangQuestion]}
                    </h4>
                    {renderQuestionContent()}
                </div>
                <div className="sticky bottom-0 z-[100] bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] flex justify-end p-4 border-t border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                    <button
                        onClick={onClose}
                        className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] font-medium leading-normal capitalize py-2 px-4 rounded cursor-pointer select-none border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};