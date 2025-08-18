import useTranslation from "@services/languages";
import { QuestionNumberProps } from "types/component";

export const QuestionNumberSection = ({ options, onToggle }: QuestionNumberProps) => {
    const t = useTranslation()
    return (
        <select id="question-count" className="h-min input w-full" onChange={(e) => onToggle(e.target.value)}>
            <option value="">{t("chooseQuestionQuantity")}</option>
            {options.map((num, idx) => (
                <option key={idx} value={num}>{num} {t("questions")}</option>
            ))}
        </select>
    )
};