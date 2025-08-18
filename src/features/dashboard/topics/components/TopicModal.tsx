import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { showToast } from "@assets/utils/toatify";
import Loader from "@components/Loader";
import { CreateTopic } from "src/types/quiz";
import { TopicModalProps } from "src/types/component";

export const TopicModal = ({ title, isOpen, onClose, onSubmit, isLoading, categories, initialData, validOrInvalid }: TopicModalProps) => {
    const [formData, setFormData] = useState<CreateTopic>({ title: "", categoryId: ""});

    useEffect(() => {
        if (initialData) {
            setFormData({ title: initialData.title, categoryId: initialData.category.id, });
        }
    }, [initialData]);

    const handleSubmit = async () => {
        try {
            const success = await onSubmit(formData);
            if (success && !initialData) {
                setFormData({ title: "", categoryId: "" });
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            showToast('error', err.message || 'Submission failed');
        }
    };
    return (
        <div className={`fixed top-[66px] h-[calc(100dvh-66px)] lg:top-[77px] lg:h-[calc(100dvh-77px)] w-full sm:w-96 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] z-[1000] overflow-y-auto border-t border-s border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] delay-100 duration-500 ${isOpen ? "end-0" : "-end-[1000px]"}`} >
            <div className="header sticky top-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] flex items-center justify-between p-4 border-b border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                <h3 className="text-[var(--dark)] dark:text-[var(--whi)] text-[18px] font-medium leading-normal capitalize">
                    {title}
                </h3>
                <div onClick={onClose} className="item w-10 h-10 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center cursor-pointer">
                    <FaXmark className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                </div>
            </div>

            <div className="p-4">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-[var(--dark)] text-[16px] dark:text-[var(--whi)] leading-normal font-medium capitalize cursor-pointer">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        placeholder="Enter your Title"
                        onChange={({ target }) => setFormData((prev) => ({ ...prev, title: target.value }))}
                        className={`input w-full outline-0 py-2 mt-2 ${validOrInvalid["title"] ? 'invalid' : ''}`}
                    />
                    {validOrInvalid["title"]?.map((error: string, idx: number) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">
                            {error}
                        </p>
                    ))}
                </div>
                <div className="mt-4">
                    <label
                        className="block text-[var(--dark)] text-[16px] dark:text-[var(--whi)] leading-normal font-medium capitalize cursor-pointer"
                        htmlFor="category" >
                        Category
                    </label>

                    <select
                        id="category"
                        name="category"
                        value={formData.categoryId}
                        onChange={({ target }) => setFormData((prev) => ({ ...prev, categoryId: target.value }))}
                        className={`input w-full outline-0 py-2 mt-2 ${validOrInvalid["categoryId"] ? 'invalid' : ''}`}
                    >
                        <option value="">--Category--</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.title}</option>
                        ))}
                    </select>
                    {validOrInvalid["categoryId"]?.map((error: string, idx: number) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="footer sticky bottom-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] flex items-center gap-4 p-4 border-t border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                <button onClick={handleSubmit} className="text-[16px] text-[var(--whi)] bg-[var(--primary)] font-medium leading-normal capitalize py-2 px-4 rounded cursor-pointer">
                    {isLoading ? (<Loader style={{ width: "25px", background: "#fff", padding: "3px" }} />) : ("Submit")}
                </button>
                <button
                    onClick={onClose}
                    className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] font-medium leading-normal capitalize py-2 px-4 rounded cursor-pointer select-none border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]"
                >
                    Cancel
                </button>
            </div>
        </div >
    );
};