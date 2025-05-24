import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../api/authApi";
import { showToast } from "@/assets/utils/toatify";
import APIError, { ApiErrorProps } from "@/services/apiError/apiError";

interface RegisterState {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

interface ValidationErrors {
    [key: string]: string[];
}

interface VisiblePassword {
    visible: string;
    active: boolean;
}

export const useRegister = () => {
    const router = useRouter();

    const [register, setRegister] = useState<RegisterState>({ email: "", lastname: "", username: "", password: "", firstname: "", confirmPassword: "" });

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
        } catch (error: any) {
            showToast("error", error?.response?.data.message || "Enter the information correctly");
            APIError(error as ApiErrorProps)
            setValidOrInvalid(error?.res?.data?.errors || {});

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