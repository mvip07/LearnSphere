import Image from 'next/image';
import React, { useCallback, useEffect, useRef, memo } from 'react';
import { FaXmark, FaUpload, FaTrash } from 'react-icons/fa6';
import Loader from '@components/Loader';
import { DEFAULT_USER } from '../constants/constants';
import { UserModalProps } from 'types/component';
import { CreateUser } from 'types/auth';

const UserModal = ({ title, roles, isOpen, isLoading, onClose, onSubmit, initialData, validOrInvalid }: UserModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = React.useState<CreateUser>(DEFAULT_USER);

    useEffect(() => {
        setFormData(initialData ? {
            bio: initialData.bio,
            email: initialData.email,
            image: initialData.image,
            lastname: initialData.lastname,
            username: initialData.username,
            firstname: initialData.firstname,
            block: initialData.block ?? false,
            isVerified: initialData.isVerified ?? false,
            roles: initialData.roles?.map((r) => r.id) || [],
        } : DEFAULT_USER);
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
            setFormData(DEFAULT_USER);
        }
    }, [formData, onSubmit, initialData]);

    const handleInputChange = useCallback((key: keyof CreateUser) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    }, []);

    const handleRolesChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = Array.from(e.target.selectedOptions).map((option) => option.value);
        setFormData((prev) => ({ ...prev, roles: selected }));
    }, []);

    const handleBooleanSelect = useCallback((key: 'block' | 'isVerified') => (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [key]: e.target.value === 'true' }));
    }, [],);

    return (
        <div className={`fixed top-[66px] h-[calc(100dvh-66px)] lg:top-[77px] lg:h-[calc(100dvh-77px)] w-full sm:w-96 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] z-[1000] overflow-y-auto scroll-bar-none border-t border-s border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] transition-all duration-500 ${isOpen ? 'end-0' : '-end-[1000px]'}`}>
            <div className="sticky top-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] flex items-center justify-between p-4 border-b border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] z-[200]">
                <h3 className="text-[var(--dark)] dark:text-[var(--whi)] text-[18px] font-medium capitalize">{title}</h3>
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="w-10 h-10 rounded-full hover:bg-[var(--whiLg)] dark:hover:bg-[var(--darkBorderCl)] flex items-center justify-center"
                >
                    <FaXmark className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                </button>
            </div>

            <div className="p-4 space-y-4">
                {[
                    { id: 'firstname', label: 'First Name', type: 'text', placeholder: 'Enter First Name' },
                    { id: 'lastname', label: 'Last Name', type: 'text', placeholder: 'Enter Last Name' },
                    { id: 'username', label: 'Username', type: 'text', placeholder: 'Enter Username' },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
                    ...(initialData
                        ? []
                        : [
                            { id: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' },
                            { id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm Password' },
                        ]),
                    { id: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Enter Bio' },
                ].map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                        <label htmlFor={id} className="block text-[var(--dark)] dark:text-[var(--whi)] text-[16px] font-medium capitalize cursor-pointer">
                            {label}
                        </label>
                        {type === 'textarea' ? (
                            <textarea
                                id={id}
                                name={id}
                                placeholder={placeholder}
                                value={formData[id as keyof CreateUser] as string}
                                onChange={handleInputChange(id as keyof CreateUser)}
                                aria-invalid={!!validOrInvalid[id as keyof CreateUser]}
                                className={`input w-full outline-0 py-2 mt-2 ${validOrInvalid[id as keyof CreateUser] ? 'invalid' : ''}`}
                            />
                        ) : (
                            <input
                                id={id}
                                name={id}
                                type={type}
                                placeholder={placeholder}
                                value={formData[id as keyof CreateUser] as string}
                                onChange={handleInputChange(id as keyof CreateUser)}
                                aria-invalid={!!validOrInvalid[id as keyof CreateUser]}
                                className={`input w-full outline-0 py-2 mt-2 ${validOrInvalid[id as keyof CreateUser] ? 'invalid' : ''}`}
                            />
                        )}
                        {validOrInvalid[id as keyof CreateUser]?.map((error: string, idx: number) => (
                            <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">
                                {error}
                            </p>
                        ))}
                    </div>
                ))}

                <div>
                    <label htmlFor="roles" className="block text-[var(--dark)] dark:text-[var(--whi)] text-[16px] font-medium capitalize cursor-pointer"   >
                        Roles
                    </label>
                    <select
                        multiple
                        id="roles"
                        name="roles"
                        value={formData.roles}
                        onChange={handleRolesChange}
                        aria-invalid={!!validOrInvalid.roles}
                        className={`input w-full outline-0 py-2 mt-2 ${validOrInvalid.roles ? 'invalid' : ''}`}
                    >
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                    {validOrInvalid.roles?.map((error: string, idx: number) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">
                            {error}
                        </p>
                    ))}
                </div>

                {[
                    {
                        id: 'block', label: 'Block',
                        options: [
                            { value: '', label: '--Select Block--' },
                            { value: 'false', label: 'Unblocked' },
                            { value: 'true', label: 'Blocked' }
                        ]
                    },
                    {
                        id: 'isVerified', label: 'Is Verified', options: [
                            { value: '', label: '--Select Verified--' },
                            { value: 'false', label: 'Not Verified' },
                            { value: 'true', label: 'Verified' }
                        ]
                    },
                ].map(({ id, label, options }) => (
                    <div key={id}>
                        <label htmlFor={id} className="block text-[var(--dark)] dark:text-[var(--whi)] text-[16px] font-medium capitalize cursor-pointer">
                            {label}
                        </label>
                        <select
                            id={id}
                            name={id}
                            aria-invalid={!!validOrInvalid[id as keyof CreateUser]}
                            onChange={handleBooleanSelect(id as 'block' | 'isVerified')}
                            value={formData[id as 'block' | 'isVerified']?.toString() || ''}
                            className={`input w-full outline-0 py-2 mt-2 ${validOrInvalid[id as keyof CreateUser] ? 'invalid' : ''}`}
                        >
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {validOrInvalid[id as keyof CreateUser]?.map((error: string, idx: number) => (
                            <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">
                                {error}
                            </p>
                        ))}
                    </div>
                ))}

                {initialData?.image && typeof initialData.image === 'string' && (
                    <div>
                        <Image
                            width={100}
                            height={100}
                            alt="Preview"
                            src={initialData.image}
                            className="w-full aspect-square object-cover rounded border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]"
                        />
                    </div>
                )}

                {formData.image instanceof File && (
                    <div className="relative">
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
                    <label
                        htmlFor="user-image"
                        onClick={handleLabelClick}
                        className="block w-full bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] py-7 px-4 rounded-sm text-center border border-[var(--primary)] border-dashed cursor-pointer hover:bg-[var(--lgHover)] dark:hover:bg-[var(--darkBorderClHover)] transition-colors"
                    >
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
                    className="text-[16px] text-[var(--whi)] bg-[var(--primary)] font-medium capitalize py-2 px-4 rounded disabled:opacity-50"
                    aria-label="Submit form"
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

export default memo(UserModal);