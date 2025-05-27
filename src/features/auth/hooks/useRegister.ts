import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { registerUser } from "../api/authApi";
import { showToast } from "@/assets/utils/toatify";
import APIError from "@/services/apiError/apiError";
import { ApiErrorProps } from "@/types/ApiError/apiError.t";
import { RegisterUser, ValidationErrors, VisiblePassword } from "@/types/Auth/auth.t";

export const useRegister = () => {
    const router = useRouter();

    const [register, setRegister] = useState<RegisterUser>({ email: "", lastname: "", username: "", password: "", firstname: "", confirmPassword: "" });

    const [validOrInvalid, setValidOrInvalid] = useState<ValidationErrors>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState<VisiblePassword>({
        visible: "",
        active: false,
    });

    const togglePasswordVisibility = useCallback((field: string) => {
        setPasswordVisible((prev) => ({ visible: prev.visible === field ? "" : field, active: prev.visible !== field || !prev.active }));
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegister((prev) => ({ ...prev, [name]: value }));
    }, []);

    const registerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await registerUser(register);
            showToast("success", response.data.message);
            router.push(`/auth/verification/${register.email}`);
        } catch (error) {
            const err = error as AxiosError<{ message?: string; errors?: { [key: string]: string[] } }>;
            showToast("error", err?.response?.data?.message || "Enter the information correctly");
            setValidOrInvalid(err?.response?.data?.errors || {});
            APIError(error as ApiErrorProps)
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { name: "firstname", type: "text" },
        { name: "lastname", type: "text" },
        { name: "email", type: "email" },
        { name: "username", type: "text" },
        { name: "password", type: "password" },
        { name: "confirmPassword", type: "password" },
    ];

    return { fields, loading, validOrInvalid, passwordVisible, registerSubmit, handleInputChange, togglePasswordVisibility, };
};