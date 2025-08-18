import React, { useEffect, useCallback, useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import Loader from "@components/Loader";
import { CreateRole } from "src/types/role";
import { RoleModalProps } from "src/types/component";

const RoleModal = ({ title, isOpen, onClose, onSubmit, isLoading, permissions, initialData, validOrInvalid }: RoleModalProps) => {
    const [formData, setFormData] = useState<CreateRole>({ name: "", permissions: [] });

    useEffect(() => {
        if (initialData) {
            setFormData({ name: initialData.name, permissions: initialData.permissions.map((p) => p.id) });
        } else {
            setFormData({ name: "", permissions: [] });
        }
    }, [initialData]);

    const handleSubmit = useCallback(async () => {
        const success = await onSubmit(formData);
        if (success && !initialData) {
            setFormData({ name: "", permissions: [] });
        }
    }, [formData, onSubmit, initialData]);

    const handlePermissionToggle = useCallback((permissionId: string) => {
        setFormData((prev: CreateRole) => ({ ...prev, permissions: prev.permissions.includes(permissionId) ? prev.permissions.filter((id: string) => id !== permissionId) : [...prev.permissions, permissionId] }));
    }, []);

    return (
        <div className={`fixed top-[66px] h-[calc(100dvh-66px)] lg:top-[77px] lg:h-[calc(100dvh-77px)] w-full sm:w-96 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] z-[1000] overflow-y-auto scroll-bar-none border-t border-s border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] delay-100 duration-500 ${isOpen ? "end-0" : "-end-[1000px]"}`}>
            <div className="header sticky top-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] flex items-center justify-between p-4 border-b border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                <h3 className="text-[var(--dark)] dark:text-[var(--whi)] text-[18px] font-medium leading-normal capitalize">{title}</h3>
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
                        value={formData.name}
                        placeholder="Enter role name"
                        aria-invalid={!!validOrInvalid.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className={`input w-full outline-0 !py-2 mt-2 ${validOrInvalid['name'] ? 'invalid' : ''}`}
                    />

                    {validOrInvalid.name?.map((error, idx) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1 inline-block">{error}</p>
                    ))}
                </div>

                <div className="mt-4">
                    <label className="block text-[var(--dark)] text-[16px] dark:text-[var(--whi)] leading-normal font-medium capitalize cursor-pointer">Permissions</label>
                    <ul className={`h-min max-h-96 overflow-y-auto scroll-bar-none border mt-2 rounded ${validOrInvalid['permissions'] ? 'border-[var(--invalidInput)]' : 'border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]'}`}>
                        {permissions.map((permission) => (
                            <li key={permission.id} className="px-4 py-2 flex items-center gap-4 cursor-pointer hover:bg-[var(--lgblue)] dark:hover:bg-[var(--dark)]">
                                <label className="flex items-center cursor-pointer gap-2">
                                    <input
                                        type="checkbox"
                                        className="peer hidden input"
                                        data-bs-id={formData.permissions.includes(permission.id)}
                                        checked={formData.permissions.includes(permission.id)}
                                        onChange={() => handlePermissionToggle(permission.id)}
                                    />
                                    <div className="check-icon-bg min-w-6 min-h-6 border border-[var(--whiLg)] dark:border-[var(--darkInputBorder)] rounded-md flex items-center justify-center peer-checked:bg-[var(--primary)] transition-all duration-200" >
                                        {formData.permissions.includes(permission.id) && <FaCheck className="check-icon text-[var(--whi)] size-4" />}
                                    </div>
                                </label>
                                <div>
                                    <span className="text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] capitalize leading-normal font-medium">{permission.name}</span>
                                    <p className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal font-light">{permission.path}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {validOrInvalid.permissions?.map((error, idx) => (
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
}

export default RoleModal;