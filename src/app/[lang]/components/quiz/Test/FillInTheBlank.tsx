import { useParams } from "next/navigation";
import { handleAnswerUpdate } from "@features/cabinet/quiz/utils/handleAnswerUpdate";
import { FillInTheBlankProps } from "src/types/component";

const FillInTheBlank = ({ question }: FillInTheBlankProps) => {
    const { lang } = useParams() as { lang: "en" | "uz" | "ru" };
    return (
        <p className="text-[16px] md:text-[22px] font-medium text-[var(--dark)] dark:text-[var(--whi)]">
            {question.question[lang].split("_____").map((part, index, arr) => (
                <span key={index}>
                    {part}
                    {index < arr.length - 1 && (
                        <input
                            type="text"
                            placeholder="_____"
                            className="input w-24 px-2 m-1 outline-0"
                            onChange={(e) => handleAnswerUpdate({ questionId: question.id, value: { index, value: e.target.value } })}
                        />
                    )}
                </span>
            ))}
        </p>
    );
}
export default FillInTheBlank;