import { handleAnswerUpdate } from "@/features/cabinet/quiz/utils/handleAnswerUpdate";
import { MultipleChoiceProps } from "@/types/component.t";

const MultipleChoice = ({ answers, question }: MultipleChoiceProps) => {
    const userAnswer = answers.find((a) => a.questionId === question.id);

    return (
        <div className="ps-6 px-4 pb-4 grid grid-cols-2 gap-7 md:gap-x-10 md:gap-y-5">
            {Array.isArray(question.options) && question.options.map((option, index) => {
                const isSelected = userAnswer?.userAnswers?.includes(option.text);
                return (
                    <div key={index} className="col-span-2 xl:col-span-1" onClick={() => handleAnswerUpdate({ questionId: question.id, value: option.text })}>
                        <div className={`relative shadow rounded px-3 py-4 cursor-pointer border ${isSelected ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-[var(--whiLg)] dark:border-0 bg-[var(--whi)] dark:bg-[var(--dark)]'}`}>
                            <div className={`absolute w-[50px] h-[50px] top-1/2 start-0 -translate-y-1/2 -translate-x-[25px] border-2 rounded-full shadow flex items-center justify-center ${isSelected ? 'bg-[var(--primary)] text-[var(--whi)] border-[var(--whi)]' : 'bg-[var(--whi)] dark:bg-[var(--dark)] dark:text-[var(--darkTextCl)] text-[var(--dark)] border-[var(--whiLg)] dark:border-[var(--darkBoxBg)]'}`}>
                                <span className="font-bold text-[22px] uppercase">{index + 1}</span>
                            </div>
                            <h3 className={`ml-5 text-[20px] font-bold ${isSelected ? 'text-[var(--whi)]' : 'text-[var(--dark)] dark:text-[var(--whi)]'}`}>
                                {option.text}
                            </h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default MultipleChoice;