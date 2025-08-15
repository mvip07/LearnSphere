"use client"
import Image from "next/image";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaUpload, FaXmark } from "react-icons/fa6";

import useTranslation from "@/services/languages";
import { useEditProfile } from "@/features/profile/hooks/useEditProfile";

export default function Profile() {
    const [userImgActive, setUserImgActive] = useState(false);
    const { user, loading, fields, profile, fileInputRef, submitUpdate, validOrInvalid, handleFileChange, handleInputChange, handleRemoveImage, submitDeleteImage } = useEditProfile();
    const t = useTranslation();

    return user && (
        <div className="grid grid-cols-6 gap-4 h-full overflow-y-auto scroll-bar-none">
            <div className="col-span-6 md:col-span-4 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] box-shadow h-full md:overflow-y-auto scroll-bar-none">
                <div className="p-4">
                    <h2 className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium capitalize leading-normal">{t("personalInformation")}</h2>
                </div>

                <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>

                <div className="grid grid-cols-2 p-4 gap-x-4 items-center">
                    {
                        fields.map((field, index) => (
                            <div className={`form-group my-2 ${field.name === 'firstname' || field.name === 'lastname' ? 'col-span-2 md:col-span-1' : 'col-span-2'}`} key={index}>
                                <label className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium capitalize mb-2.5 inline-block" htmlFor={field.name}>
                                    {t(field.name)}
                                </label>
                                <div className="relative">
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type={field.type}
                                        onChange={handleInputChange}
                                        placeholder={`${t("enteryour")} ${t(field.name)}`}
                                        defaultValue={user[field.name as keyof typeof user] as string}
                                        className={`w-full input bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] outline-0`}
                                    />
                                </div>
                                {validOrInvalid[field.name]?.map((errorMsg, idx) => (
                                    <p key={idx} className="text-[13px] text-[var(--error)] font-medium capitalize mt-1 inline-block">
                                        {errorMsg}
                                    </p>
                                ))}
                            </div>
                        ))}

                    <div className="form-group mt-2 col-span-2">
                        <label className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium capitalize mb-2.5 inline-block" htmlFor="bio">
                            {t("bio")}
                        </label>
                        <textarea
                            defaultValue={user?.bio}
                            onChange={handleInputChange}
                            className="w-full h-[150px] input bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] outline-0 resize-none"
                            rows={30}
                            name="bio"
                            placeholder={t("enterYourBio")}
                        />
                        {validOrInvalid["bio"]?.map((errorMsg, idx) => (
                            <p key={idx} className="text-[13px] text-[var(--error)] font-medium capitalize mt-1 inline-block">
                                {errorMsg}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>

                <div className="p-4 flex items-center justify-end gap-4">
                    <button onClick={() => submitUpdate(user.id)} disabled={loading} className="text-[16px] text-[var(--whi)] bg-[var(--primary)] font-medium leading-normal capitilize py-2 px-4 rounded cursor-pointer select-none">{t("submit")}</button>
                </div>
            </div>

            <div className="col-span-6 md:col-span-2 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] box-shadow h-full md:overflow-y-auto scroll-bar-none">
                <div className="p-4">
                    <h2 className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium capitalize leading-normal">{t("yourPhoto")}</h2>
                </div>

                <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>

                <div className="edit-photo p-4">
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Image
                                alt="User"
                                width={45}
                                height={45}
                                src={user.image as string}
                                onClick={() => setUserImgActive(true)}
                                className="rounded-full cursor-pointer w-[45px] h-[45px] object-cover"
                            />
                        </div>
                        <div className="text">
                            <p className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium leading-normal">
                                {t("editYourPhoto")}
                            </p>

                            <button onClick={() => submitDeleteImage(user.id)} className="text-[14px] text-red-500 font-medium leading-normal mt-1 flex items-center gap-1 underline">
                                <FaTrash className="text-sm" />
                                {t("deleteImage")}
                            </button>
                        </div>
                    </div>
                    {profile.image instanceof File && (
                        <div className="my-4 relative">
                            <div onClick={handleRemoveImage} className="absolute top-2 end-2 bg-[var(--red)] w-9 h-9 rounded-full flex items-center justify-center cursor-pointer">
                                <FaTrash className="text-lg text-[var(--whi)]" />
                            </div>
                            <Image width={100} height={160} className="w-full h-40 object-contain rounded border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]" src={URL.createObjectURL(profile.image)} alt="Preview" />
                        </div>
                    )}

                    <label htmlFor="image">
                        <div className="w-full bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] py-7 px-4 mt-4 rounded-sm text-center border border-[var(--primary)] border-dashed cursor-pointer hover:bg-[var(--lgHover)] dark:hover:bg-[var(--darkBorderClHover)] transition-colors">
                            <div className="w-[40px] h-[40px] bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-full mx-auto flex items-center justify-center cursor-pointer">
                                <FaUpload className="size-5 text-[var(--primary)]" />
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: t("uploadImage") }} className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium leading-normal mt-4"></p>
                        </div>
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="file-upload hidden"
                        accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                    />
                    {validOrInvalid["image"]?.map((errorMsg, idx) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium capitalize mt-0 inline-block">
                            {errorMsg}
                        </p>
                    ))}
                </div>

                {userImgActive && (
                    <div onClick={() => setUserImgActive(false)} className="fixed inset-0 bg-black bg-opacity-50 z-[200] flex items-center justify-center p-4" >
                        <div onClick={(e) => e.stopPropagation()} className="bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden relative">
                            <Image className="w-full h-full object-contain max-h-[80vh]" src={user.image as string} alt="User Preview" />
                            <button onClick={() => setUserImgActive(false)} className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                                <FaXmark className="text-lg text-[var(--textCl)] dark:text-[var(--darkTextCl)] cursor-pointer" />
                            </button>
                        </div>
                    </div>
                )}

                <div className="w-full h-[1px] bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)]"></div>

                <div className="p-4 flex items-center justify-end gap-4">
                    <button onClick={() => submitUpdate(user.id)} disabled={loading} className="text-[16px] text-[var(--whi)] bg-[var(--primary)] font-medium leading-normal capitilize py-2 px-4 rounded cursor-pointer select-none">{t("submit")}</button>
                </div>
            </div>
        </div>
    )
}