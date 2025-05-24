import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/assets/utils/toatify";
import { forgotPasswordRequest } from "../api/authApi";

interface ForgotPasswordState {
    email: string;
}

interface ValidationErrors {
    [key: string]: string[];
}

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
        } catch (error: any) {
            showToast("error", error?.response?.data.message || "Enter the information correctly");
            setValidOrInvalid(error?.res?.data?.errors || {});
        } finally {
            setLoading(false);
        }
    };

    return { handleInputChange, forgotPasswordSubmit, validOrInvalid, loading };
};
