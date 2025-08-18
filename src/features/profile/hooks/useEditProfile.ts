import { useState, useCallback, useRef, useEffect } from "react";

import { AxiosError } from "axios";
import { showToast } from "@assets/utils/toatify";
import { useAppContext } from "@context/AppContext";
import { deleteProfileImage, updateUserProfile } from "../api/editProfileApi";
import { useGoToNextPage } from "@hooks/useGoToNextPage";
import { useVerificationStore } from "@stores/verificationStore";
import { ProfileEdit } from "src/types/auth";
import { ValidationErrors } from "src/types/general";

export const useEditProfile = () => {
    const goTo = useGoToNextPage()
    const { setVerificationData } = useVerificationStore();

    const { user, fetchUser } = useAppContext();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [profile, setProfile] = useState<ProfileEdit>({
        bio: user?.bio || "",
        email: user?.email || "",
        image: user?.image || "",
        lastname: user?.lastname || "",
        username: user?.username || "",
        firstname: user?.firstname || "",
    });

    const [validOrInvalid, setValidOrInvalid] = useState<ValidationErrors>({});
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            setProfile({
                bio: user.bio || "",
                email: user.email || "",
                image: user.image || "",
                lastname: user.lastname || "",
                username: user.username || "",
                firstname: user.firstname || "",
            });
        }
    }, [user]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value.trim() }));
    }, []);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setProfile(prev => ({ ...prev, image: file }))
    }, []);

    const handleRemoveImage = useCallback(() => {
        setProfile(prev => ({ ...prev, image: "" }));
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, []);

    const submitUpdate = async (userId: string) => {
        setLoading(true);
        try {
            const { data } = await updateUserProfile(userId, profile);
            fetchUser();

            if (data.redirect && data.url && data.verificationExpiresAt) {
                const expiresAtTime = new Date(data.verificationExpiresAt).getTime();
                setVerificationData(data.email || data.url.split('/').pop(), expiresAtTime);
                showToast("success", data.message || "Email updated successfully. Please verify your new email address.");
                goTo(data.url)
                return
            }

            if (data.changed === false) {
                showToast("info", data.message || "No changes detected");
                return;
            }

            showToast("success", data.message || "Profile updated successfully");

        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                errors?: { [key: string]: string[] };
                nextChangeDate?: string;
            }>;

            if (err.response?.status === 400 && err.response.data.nextChangeDate) {
                const daysLeft = new Date(err.response.data.nextChangeDate).toISOString().slice(0, 19).replace('T', ' ')
                showToast("warning", `${err.response.data.message}. ${daysLeft}`);
            } else {
                setValidOrInvalid(err?.response?.data?.errors || {});
                showToast("error", err?.response?.data?.message || "An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const submitDeleteImage = async (userId: string) => {
        setLoading(true);
        try {
            const { data } = await deleteProfileImage(userId);
            fetchUser();
            showToast("success", data.message || "Profile picture successfully deleted.");
        } catch (error) {
            const err = error as AxiosError<{ message?: string; errors?: { [key: string]: string[] }; }>;
            setValidOrInvalid(err?.response?.data?.errors || {});
            showToast("error", err?.response?.data?.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { name: "firstname", type: "text" },
        { name: "lastname", type: "text" },
        { name: "email", type: "email" },
        { name: "username", type: "text" },
    ];

    return {
        user,
        fields,
        profile,
        loading,
        fileInputRef,
        submitUpdate,
        validOrInvalid,
        handleFileChange,
        handleInputChange,
        handleRemoveImage,
        submitDeleteImage,
    };
};