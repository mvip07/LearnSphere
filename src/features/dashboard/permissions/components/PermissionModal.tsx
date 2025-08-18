import { useCallback, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Loader from "@components/Loader";
import { CreatePermission } from "types/role";
import { PermissionModalProps } from "types/component";

export const PermissionModal = ({ title, isOpen, onClose, onSubmit, isLoading, initialData, validOrInvalid }: PermissionModalProps) => {
    const [formData, setFormData] = useState<CreatePermission>({ name: "", path: "" });

    useEffect(() => {
        if (initialData) {
            setFormData({ name: initialData.name, path: initialData.path });
        } else {
            setFormData({ name: "", path: "" });
        }
    }, [initialData]);

    const handleSubmit = useCallback(() => {
        onSubmit(formData);
        if (!initialData) {
            setFormData({ name: "", path: "" });
        }
    }, [formData, onSubmit, initialData])

    return (
        <div className={`fixed top-[66px] h-[calc(100dvh-66px)] lg:top-[77px] lg:h-[calc(100dvh-77px)] w-full sm:w-96 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] z-[1000] overflow-y-auto scroll-bar-none border-t border-s border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] delay-100 duration-500 ${isOpen ? "end-0" : "-end-[1000px]"}`} >
            <div className="header sticky top-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] flex items-center justify-between p-4 border-b border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                <h3 className="text-[var(--dark)] dark:text-[var(--whi)] text-[18px] font-medium leading-normal capitalize">
                    {title}
                </h3>
                <button onClick={onClose} className="item w-10 h-10 rounded-full hover:bg-[var(--whiLg)] hover:dark:bg-[var(--darkBorderCl)] flex items-center justify-center cursor-pointer">
                    <FaXmark className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                </button>
            </div>

            <div className="p-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-[var(--dark)] text-[16px] dark:text-[var(--whi)] leading-normal font-medium capitalize cursor-pointer">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Enter Permission Title"
                        aria-invalid={!!validOrInvalid.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className={`input w-full outline-0 !py-2 mt-2 ${validOrInvalid['name'] ? 'invalid' : ''}`}
                    />
                    {validOrInvalid.name?.map((error, idx) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1 inline-block">{error}</p>
                    ))}
                </div>

                <div className="mt-4">
                    <label htmlFor="path" className="block text-[var(--dark)] text-[16px] dark:text-[var(--whi)] leading-normal font-medium capitalize cursor-pointer">
                        Path
                    </label>
                    <input
                        id="path"
                        type="url"
                        name="path"
                        value={formData.path}
                        placeholder="Enter your Path"
                        aria-invalid={!!validOrInvalid.path}
                        onChange={({ target }) => setFormData((prev) => ({ ...prev, path: target.value }))}
                        className={`input w-full outline-0 !py-2 mt-2 ${validOrInvalid['path'] ? 'invalid' : ''}`}
                    />
                    {validOrInvalid.path?.map((error, idx) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1 inline-block">{error}</p>
                    ))}
                </div>
            </div>

            <div className="footer sticky bottom-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] flex items-center gap-4 p-4 border-t border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                <button disabled={isLoading} onClick={handleSubmit} className="text-[16px] text-[var(--whi)] bg-[var(--primary)] font-medium leading-normal capitalize py-2 px-4 rounded cursor-pointer">
                    {isLoading ? <Loader style={{ width: "25px", padding: "3px", background: "#fff" }} /> : "Submit"}
                </button>
                <button onClick={onClose} className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] font-medium leading-normal capitalize py-2 px-4 rounded cursor-pointer select-none border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                    Cancel
                </button>
            </div>
        </div>
    );
};