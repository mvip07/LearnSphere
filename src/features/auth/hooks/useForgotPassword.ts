import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { showToast } from "@/assets/utils/toatify";
import { forgotPasswordRequest } from "../api/authApi";
import { ForgotPasswordState, ValidationErrors } from "@/types/Auth/auth.t";

export const useForgotPassword = () => {
    const router = useRouter();
    const [forgotPassword, setForgotPassword] = useState<ForgotPasswordState>({ email: "" });
    const [validOrInvalid, setValidOrInvalid] = useState<ValidationErrors>({});
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForgotPassword((prev) => ({ ...prev, [name]: value }));
    };

    const forgotPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await forgotPasswordRequest(forgotPassword);
            showToast("success", response?.data.message);
            router.push(`/auth/check-email`);
        } catch (error) {
            const err = error as AxiosError<{ message?: string; errors?: { [key: string]: string[] } }>;
            showToast("error", err?.response?.data?.message || "Enter the information correctly");
            setValidOrInvalid(err?.response?.data?.errors || {});
        } finally {
            setLoading(false);
        }
    };

    return { handleInputChange, forgotPasswordSubmit, validOrInvalid, loading };
};
