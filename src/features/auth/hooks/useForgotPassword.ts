import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@assets/utils/toatify";
import { forgotPasswordRequest } from "../api/authApi";
import { ForgotPasswordState } from "src/types/auth";
import { ValidationErrors } from "src/types/general";
import { ApiErrorProps } from "src/types/apiError";
import { handleApiError } from "@services/handleApiError/handleApiError";

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
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
        } finally {
            setLoading(false);
        }
    };

    return { handleInputChange, forgotPasswordSubmit, validOrInvalid, loading };
};
