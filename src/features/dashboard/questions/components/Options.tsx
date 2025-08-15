import { FaXmark } from 'react-icons/fa6';
import { Option } from '@/types/quiz.t';
import { ValidationErrors } from '@/types/general.t';

interface OptionsSectionProps {
    options: Option[];
    questionType: string;
    validOrInvalid: ValidationErrors;
    setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
}

export const Options = ({ questionType, options, setOptions, validOrInvalid }: OptionsSectionProps) => {
    if (!['multiple-choice', 'image', 'video', 'audio'].includes(questionType)) {
        return null;
    }

    const handleAddOption = () => {
        setOptions([...options, { text: '', isCorrect: false }]);
    };

    const handleRemoveOption = (index: number) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const handleOptionChange = (index: number, field: 'text' | 'isCorrect', value: string | boolean) => {
        setOptions((prev) => prev.map((option, i) => i === index ? { ...option, [field]: value } : option));
    };

    return (
        <div className="mt-4">
            <label className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium capitalize inline-block">
                Options:
            </label>
            <div className={`${options.length ? 'border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] mt-2' : ''}`}>
                {options.map((field, index) => (
                    <div key={index} className={`p-4 relative flex items-center gap-2 ${(options.length - 1) !== index ? 'border-b border-b-[var(--whiLg)] dark:border-b-[var(--darkBorderCl)]' : ''}`}>
                        <input
                            value={field.text}
                            placeholder="Option text"
                            className="input w-full outline-0 !py-2"
                            onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                        />
                        <input
                            type="checkbox"
                            checked={field.isCorrect}
                            className="outline-0 w-6 h-6 min-w-6 min-h-6 !py-0 !px-0"
                            onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                        />
                        <div onClick={() => handleRemoveOption(index)} className="w-[34px] h-[34px] min-w-[34px] min-h-[34px] rounded-full bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center">
                            <FaXmark className="size-5 cursor-pointer text-[var(--textCl)]" />
                        </div>
                    </div>
                ))}
            </div>
            {validOrInvalid['options']?.map((error, idx) => (
                <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">{error}</p>
            ))}
            <button onClick={handleAddOption} type="button" className="mt-4 w-full rounded-lg py-3 sm:py-2.5 px-4 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)] cursor-pointer" >
                Add Option
            </button>
        </div>
    );
};