import { FaEdit } from "react-icons/fa";
import { FaCheck, FaTrashCan } from "react-icons/fa6";
import { TopicTableProps } from "@/types/component.t";

export const TopicTable = ({ topics, checked, setChecked, onEdit, onDelete }: TopicTableProps) => {
    return (
        <div className="overflow-x-auto">
            <div className="min-w-[1024px]">
                <div className="w-full grid grid-cols-6 gap-4">
                    <div className="col-span-2 flex items-center gap-4">
                        <label className="flex items-center cursor-pointer gap-2">
                            <input
                                type="checkbox"
                                className="peer hidden input"
                                onChange={(e) => e.target.checked ? setChecked(topics.map((c) => c.id)) : setChecked([])}
                            />
                            <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200">
                                <FaCheck className="check-icon text-[var(--whi)] size-4" />
                            </div>
                        </label>
                        {checked.length > 0 && (
                            <div className="flex items-center gap-1">
                                <span className="text-[14px] leading-normal font-medium text-[var(--textCl)] dark:text-[var(--darkTextCl)]">
                                    {checked.length} Items
                                </span>
                                <div onClick={() => onDelete(checked)} className="item w-6 h-6 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center cursor-pointer" >
                                    <FaTrashCan className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                                </div>
                            </div>
                        )}
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">
                            Topic
                        </p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">
                            Category
                        </p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">
                            createdat
                        </p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal">
                            updatedat
                        </p>
                    </div>
                    <div className="col-span-1">
                        <p className="block text-[14px] text-[var(--dark)] dark:text-[var(--whi)] uppercase font-medium leading-normal text-end">
                            Actions
                        </p>
                    </div>
                </div>
                <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] mt-4" />
                {
                    topics.map((topic) => (
                        <div key={topic.id} className="w-full grid grid-cols-6 items-center gap-4 cursor-pointer py-1">
                            <div className="col-span-2 flex items-center gap-3">
                                <label className="flex items-center cursor-pointer gap-2">
                                    <input
                                        type="checkbox"
                                        className="peer hidden input"
                                        checked={checked.includes(topic.id)}
                                        onChange={(e) => setChecked(e.target.checked ? [...checked, topic.id] : checked.filter((c) => c !== topic.id))}
                                    />
                                    <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200">
                                        <FaCheck className="check-icon text-[var(--whi)] size-4" />
                                    </div>
                                </label>
                                <div className="flex items-center gap-3">
                                    <p className="text-[15px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium capitalize">
                                        {topic?.title}
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <p className="w-fit text-[14px] text-[var(--whi)] leading-normal font-medium rounded-md py-1 px-2 bg-[var(--green)]">
                                    {topic.category?.title}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium">
                                    {topic.createdAt}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-medium">
                                    {topic.updatedAt}
                                </p>
                            </div>
                            <div className="col-span-1 flex items-center justify-end gap-2">
                                <div onClick={() => onDelete([topic.id])} className="item w-9 h-9 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center" >
                                    <FaTrashCan className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                                </div>
                                <div onClick={() => onEdit(topic)} className="item w-9 h-9 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center">
                                    <FaEdit className="size-4 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};