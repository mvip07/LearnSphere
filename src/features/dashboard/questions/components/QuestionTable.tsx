import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams } from "next/navigation";
import { FaCheck, FaEye, FaTrashCan } from "react-icons/fa6";
import { QuestionPreviewModal } from "./QuestionPreviewModal";
import { MultilangQuestion, Question } from "src/types/quiz";
import { QuestionTableProps } from "src/types/component";

export const QuestionTable = ({ onEdit, checked, onDelete, questions, setChecked }: QuestionTableProps) => {
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { lang } = useParams()

    const openModal = (question: Question) => {
        setSelectedQuestion(question);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedQuestion(null);
        setIsModalOpen(false);
    };
    return (
        <div className="overflow-x-auto">
            <div className="w-full min-w-[2500px]">
                <div className="w-full grid grid-cols-12 gap-4">
                    <div className="col-span-3 flex items-center gap-4">
                        <label className="flex items-center cursor-pointer gap-2">
                            <input
                                type="checkbox"
                                className="peer hidden input"
                                onChange={(e) => e.target.checked ? setChecked(questions.map((c) => c.id)) : setChecked([])}
                            />
                            <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200">
                                <FaCheck className="check-icon text-[var(--whi)] size-4" />
                            </div>
                        </label>
                        {checked.length > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-[14px] leading-normal font-medium text-[var(--textCl)] dark:text-[var(--darkTextCl)]">
                                    {checked.length} Items
                                </span>
                                <div onClick={() => onDelete(checked)} className="item w-6 h-6 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center cursor-pointer" >
                                    <FaTrashCan className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                                </div>
                            </div>
                        )}
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Question</p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Type</p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Category</p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Topic</p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Level</p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Time</p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">Coins</p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">CreatedAt</p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">UpdatedAt</p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal text-end">Actions</p>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] mt-4"></div>
                {
                    questions && questions.map((q, index) => (
                        <div key={index} className="w-full grid grid-cols-12 items-center gap-4 cursor-pointer py-1">
                            <div className="col-span-3">
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center cursor-pointer gap-2">
                                        <input
                                            type="checkbox"
                                            className="peer hidden input"
                                            checked={checked.includes(q.id)}
                                            onChange={(e) => setChecked(e.target.checked ? [...checked, q.id] : checked.filter((qch) => qch !== q.id))}
                                        />
                                        <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200">
                                            <FaCheck className="check-icon text-[var(--whi)] size-4 " />
                                        </div>
                                    </label>

                                    <div className="flex items-center gap-3">
                                        <p title={q.question[lang as keyof MultilangQuestion]} className="text-[15px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium capitalize">
                                            {q.question[lang as keyof MultilangQuestion].length >= 100 ? q.question[lang as keyof MultilangQuestion].slice(0, 100) + "..." : q.question[lang as keyof MultilangQuestion]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[14px] text-[var(--whi)] leading-normal font-medium py-1 px-2 bg-[var(--green)] rounded-md inline-block">
                                    {q.type}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[14px] text-[var(--whi)] leading-normal font-medium py-1 px-2 bg-[var(--firstPlace)] rounded-md inline-block">
                                    {q.category.title}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[14px] text-[var(--whi)] leading-normal font-medium py-1 px-2 bg-[var(--red)] rounded-md inline-block">
                                    {q.topic.title}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[14px] text-[var(--whi)] leading-normal font-medium py-1 px-2 bg-[var(--tablet)] rounded-md inline-block">
                                    {q.level.title}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[14px] text-[var(--whi)] leading-normal w-min font-medium py-1 px-2 bg-[var(--primary)] rounded-md inline-block">
                                    {q.time}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[14px] text-[var(--whi)] leading-normal font-medium py-1 px-2 bg-[var(--yellow)] rounded-md inline-block">
                                    {q.coins}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium">
                                    {q.createdAt}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium">
                                    {q.updatedAt}
                                </p>
                            </div>

                            <div className="col-span-1 flex items-center justify-end gap-2">
                                <div onClick={() => onDelete([q.id])} className="item w-9 h-9 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center">
                                    <FaTrashCan className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                                </div>
                                <div onClick={() => openModal(q)} className="item w-9 h-9 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center">
                                    <FaEye className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                                </div>
                                <div onClick={() => onEdit(q)} className="item w-9 h-9 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center">
                                    <FaEdit className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                                </div>
                            </div>
                        </div>
                    ))
                }

                {isModalOpen && <QuestionPreviewModal lang={lang as string} isOpen={isModalOpen} onClose={closeModal} question={selectedQuestion} />}
            </div>
        </div>
    );
};