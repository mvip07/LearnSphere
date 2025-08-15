import { FaXmark } from 'react-icons/fa6';
import { ValidationErrors } from '@/types/general.t';

interface CorrectAnswersSectionProps {
    questionType: string;
    correctAnswers: string[];
    validOrInvalid: ValidationErrors;
    setCorrectAnswers: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CorrectAnswers = ({ questionType, correctAnswers, setCorrectAnswers }: CorrectAnswersSectionProps) => {
    if (!['input', 'image', 'video', 'audio'].includes(questionType)) {
        return null;
    }

    const handleAddCorrectAnswer = () => {
        setCorrectAnswers([...correctAnswers, '']);
    };

    const handleRemoveCorrectAnswer = (index: number) => {
        setCorrectAnswers(correctAnswers.filter((_, i) => i !== index));
    };

    const handleCorrectAnswerChange = (index: number, value: string) => {
        setCorrectAnswers((prev: string[]) => prev.map((answer, i) => (i === index ? value : answer)));
    };

    return (
        <div className="mt-4">
            <label className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium capitalize inline-block">
                Correct Answers:
            </label>
            <div className={`${correctAnswers.length ? 'border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] mt-2' : ''}`}>
                {correctAnswers.map((field, index) => (
                    <div key={index} className={`p-4 relative flex items-center gap-2 ${(correctAnswers.length - 1) !== index ? 'border-b border-b-[var(--whiLg)] dark:border-b-[var(--darkBorderCl)]' : ''}`}>
                        <input
                            value={field}
                            placeholder="Correct answer"
                            className="input w-full outline-0 !py-2"
                            onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                        />
                        <div onClick={() => handleRemoveCorrectAnswer(index)} className="w-[34px] h-[34px] rounded-full min-w-[34px] min-h-[34px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center">
                            <FaXmark className="size-5 cursor-pointer text-[var(--textCl)]" />
                        </div>
                    </div>
                ))}
            </div>
            <button type="button" onClick={handleAddCorrectAnswer} className="mt-4 w-full rounded-lg py-3 sm:py-2.5 px-4 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)] cursor-pointer">
                Add Correct Answer
            </button>
        </div>
    );
};