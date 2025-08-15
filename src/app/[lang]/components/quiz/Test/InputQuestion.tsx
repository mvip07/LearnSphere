import { handleAnswerUpdate } from "@/features/cabinet/quiz/utils/handleAnswerUpdate";
import { InputProps } from "@/types/component.t";

const InputQuestion = ({ question }: InputProps) => {
    return (
        <input
            type="text"
            placeholder="Enter your answer"
            // value={userInputs[type] || ""}
            className="w-full input outline-0"
            onChange={(e) => handleAnswerUpdate({ questionId: question.id, value: e.target.value })} />
    );
};

export default InputQuestion;
