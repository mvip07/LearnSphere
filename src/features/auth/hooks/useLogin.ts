import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { loginRequest } from "../api/authApi";
import { showToast } from "@/assets/utils/toatify";
import { useVerificationStore } from '@/stores/verificationStore';
import APIError, { ApiErrorProps } from "@/services/apiError/apiError";

interface LoginState {
    email: string;
    password: string;
}

interface ValidationErrors {
    [key: string]: string[];
}

interface VisiblePassword {
    visible: string;
    active: boolean;
}

export const useLogin = () => {
    const router = useRouter();
    const { setVerificationData } = useVerificationStore();

    const [loading, setLoading] = useState<boolean>(false);
    const [validOrInvalid, setValidOrInvalid] = useState<ValidationErrors>({});
    const [login, setLogin] = useState<LoginState>({ email: "", password: "" });
    const [passwordVisible, setPasswordVisible] = useState<VisiblePassword>({ visible: "", active: false });

    const togglePasswordVisibility = useCallback((field: string) => {
        setPasswordVisible((prev) => ({ visible: prev.visible === field ? "" : field, active: prev.visible !== field || !prev.active }));
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLogin((prev) => ({ ...prev, [name]: value }));
    }, []);

    const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await loginRequest(login);

            if (res?.data?.redirect && res?.data?.url && res?.data?.status) {
                if (res.data.verificationExpiresAt) {
                    const expiresAtTime = new Date(res.data.verificationExpiresAt).getTime();
                    setVerificationData(login.email, expiresAtTime);
                }
                if (res.data.user) {
                    localStorage.setItem("quizapp", JSON.stringify(res?.data?.user));
                }
                const toastStatus: "success" | "warning" | "error" = ["success", "warning", "error"].includes(res?.data?.status) ? res?.data?.status : "success";
                showToast(toastStatus, res.data.message || "Login Successfully");
                router.push(res.data.url);
            }

        } catch (error: any) {
            setValidOrInvalid(error?.response?.data?.errors || {});
            APIError(error as ApiErrorProps)
            console.log(validOrInvalid)
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { name: "email", type: "email" },
        { name: "password", type: "password" },
    ];

    return { fields, loading, validOrInvalid, passwordVisible, loginSubmit, handleInputChange, togglePasswordVisibility };
};