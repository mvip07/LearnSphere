import { useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { showToast } from "@assets/utils/toatify";
import { resetPasswordRequest } from "../api/authApi";
import { ValidationErrors } from "types/general";
import { NewPasswordState, VisiblePassword } from "types/auth";
import { ApiErrorProps } from "types/apiError";
import { handleApiError } from "@services/handleApiError/handleApiError";

export const useNewPassword = () => {
    const router = useRouter();
    const { token } = useParams();

    const [newPassword, setNewPassword] = useState<NewPasswordState>({
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [validOrInvalid, setValidOrInvalid] = useState<ValidationErrors>({});
    const [passwordVisible, setPasswordVisible] = useState<VisiblePassword>({
        visible: "",
        active: false,
    });

    const togglePasswordVisibility = useCallback((field: string) => {
        setPasswordVisible((prev) => ({
            visible: prev.visible === field ? "" : field,
            active: prev.visible !== field || !prev.active,
        }));
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPassword((prev) => ({ ...prev, [name]: value }));
    }, []);

    const newPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await resetPasswordRequest(token as string, newPassword);
            showToast("success", response?.data?.message);
            setTimeout(() => router.push(`/auth/login`), 1500);
        } catch (error) {
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { name: "password", type: "password" },
        { name: "confirmPassword", type: "password" },
    ];

    return { fields, loading, validOrInvalid, passwordVisible, handleInputChange, newPasswordSubmit, togglePasswordVisibility };
};
