import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaUpload, FaXmark } from "react-icons/fa6";
import Loader from "@components/Loader";
import { CategoryModalProps } from "types/component";
import { CreateCategory } from "types/quiz";

export const CategoryModal = ({ title, isOpen, isLoading, onClose, onSubmit, initialData, validOrInvalid }: CategoryModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<CreateCategory>({
        title: '',
        image: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({ title: initialData.title, image: initialData.image });
        }
    }, [initialData]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
        }
    }, []);

    const handleRemoveImage = useCallback(() => {
        setFormData((prev) => ({ ...prev, image: '' }));
    }, []);

    const handleLabelClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleSubmit = useCallback(async () => {
        const success = await onSubmit(formData);
        if (success && !initialData) {
            setFormData({ title: '', image: '' });
        }
    }, [formData, onSubmit, initialData]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    return (
        <div className={`fixed top-[66px] h-[calc(100dvh-66px)] lg:top-[77px] lg:h-[calc(100dvh-77px)] w-full sm:w-96 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] z-[1000] overflow-y-auto border-t border-s border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] delay-100 duration-500 ${isOpen ? "end-0" : "-end-[1000px]"}`} >
            <div className="sticky top-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] flex items-center justify-between p-4 border-b border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] z-[200]">
                <h3 className="text-[var(--dark)] dark:text-[var(--whi)] text-[18px] font-medium capitalize">{title}</h3>
                <button onClick={onClose} aria-label="Close modal" className="w-10 h-10 rounded-full hover:bg-[var(--whiLg)] dark:hover:bg-[var(--darkBorderCl)] flex items-center justify-center">
                    <FaXmark className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                </button>
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
                        onChange={handleInputChange}
                        placeholder="Enter your Title"
                        className={`input w-full outline-0 py-2 mt-2 ${validOrInvalid["title"] ? 'invalid' : ''}`}
                    />
                    {validOrInvalid["title"]?.map((error: string, idx: number) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">
                            {error}
                        </p>
                    ))}
                </div>

                {initialData?.image && typeof initialData.image === 'string' && (
                    <div className="mb-4">
                        <Image
                            width={100}
                            height={100}
                            alt="Preview"
                            src={initialData.image}
                            className="w-full aspect-square object-cover rounded border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]"
                        />
                    </div>
                )}

                {!initialData?.image && formData.image instanceof File && (
                    <div className="relative mb-4">
                        <button
                            aria-label="Remove image"
                            onClick={handleRemoveImage}
                            className="absolute top-2 end-2 bg-[var(--red)] w-9 h-9 rounded-full flex items-center justify-center"
                        >
                            <FaTrash className="text-lg text-[var(--whi)]" />
                        </button>
                        <Image
                            width={100}
                            height={100}
                            alt="Preview"
                            src={URL.createObjectURL(formData.image)}
                            className="w-full aspect-square object-cover rounded border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]"
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="user-image" onClick={handleLabelClick} className="block w-full bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] py-7 px-4 rounded-sm text-center border border-[var(--primary)] border-dashed cursor-pointer hover:bg-[var(--lgHover)] dark:hover:bg-[var(--darkBorderClHover)] transition-colors">
                        <div className="w-10 h-10 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-full mx-auto flex items-center justify-center">
                            <FaUpload className="size-5 text-[var(--primary)]" />
                        </div>
                        <p className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium mt-4">
                            Click to upload or drag and drop <br /> PNG, JPG, JPEG (max, 5MB)
                        </p>
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="user-image2"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                    />
                    {validOrInvalid.image?.map((error: string, idx: number) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="sticky bottom-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] flex items-center gap-4 p-4 border-t border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                <button
                    disabled={isLoading}
                    onClick={handleSubmit}
                    aria-label="Submit form"
                    className="text-[16px] text-[var(--whi)] bg-[var(--primary)] font-medium capitalize py-2 px-4 rounded disabled:opacity-50"
                >
                    {isLoading ? <Loader style={{ width: '25px', padding: '3px', background: '#fff' }} /> : 'Submit'}
                </button>
                <button
                    onClick={onClose}
                    className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] font-medium capitalize py-2 px-4 rounded border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]"
                    aria-label="Cancel"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};