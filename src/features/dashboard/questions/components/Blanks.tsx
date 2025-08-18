import { ValidationErrors } from 'src/types/general';
import { Blank } from 'src/types/quiz';
import { FaXmark } from 'react-icons/fa6';

interface BlanksSectionProps {
    blanks: Blank[];
    questionType: string;
    validOrInvalid: ValidationErrors;
    setBlanks: React.Dispatch<React.SetStateAction<Blank[]>>;
}

export const Blanks = ({ questionType, blanks, setBlanks }: BlanksSectionProps) => {
    if (!['fill-in-the-blank', 'image', 'video', 'audio'].includes(questionType)) {
        return null;
    }

    const handleAddBlank = () => {
        setBlanks((prev) => [...prev, { position: prev.length + 1, correctAnswers: [''] }]);
    };

    const handleRemoveBlank = (index: number) => {
        setBlanks((prev) => prev.filter((_, i) => i !== index).map((blank, i) => ({ ...blank, position: i + 1 })));
    };

    const handleBlankChange = (index: number, value: string) => {
        setBlanks((prev) => prev.map((blank, i) => (i === index ? { ...blank, correctAnswers: [value] } : blank)));
    };

    return (
        <div className="mt-4">
            <label className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium capitalize inline-block">
                Blanks:
            </label>
            <div className={`${blanks.length ? 'border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] mt-2' : ''}`}>
                {blanks.map((field, index) => (
                    <div key={index} className={`p-4 relative ${blanks.length - 1 !== index ? 'border-b border-b-[var(--whiLg)] dark:border-b-[var(--darkBorderCl)]' : ''}`} >
                        <label className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium capitalize inline-block">
                            Position
                        </label>
                        <input disabled type="number" value={field.position} className="input w-full outline-0 !py-2 mt-2 cursor-not-allowed"
                        />
                        <label className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium capitalize mt-4 inline-block">
                            Correct Answers
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                placeholder="Correct answer"
                                value={field.correctAnswers[0] || ''}
                                className="input w-full outline-0 !py-2 mt-2"
                                onChange={(e) => handleBlankChange(index, e.target.value)}
                            />
                            <div onClick={() => handleRemoveBlank(index)} className="w-[34px] h-[34px] min-w-[34px] min-h-[34px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] flex items-center justify-center absolute end-0 top-0">
                                <FaXmark className="size-5 cursor-pointer text-[var(--textCl)]" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button type="button" onClick={handleAddBlank} className="mt-4 w-full rounded-lg py-3 sm:py-2.5 px-4 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)] cursor-pointer">
                Add Blank
            </button>
        </div>
    );
};
