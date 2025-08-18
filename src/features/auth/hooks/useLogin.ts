import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { loginRequest } from "../api/authApi";
import { showToast } from "@assets/utils/toatify";
import { ApiErrorProps } from "types/apiError";
import { ValidationErrors } from "types/general";
import { LoginUser, VisiblePassword } from "types/auth";
import { useVerificationStore } from '@stores/verificationStore';
import { handleApiError } from "@services/handleApiError/handleApiError";

export const useLogin = () => {
    const router = useRouter();
    const { setVerificationData } = useVerificationStore();

    const [loading, setLoading] = useState<boolean>(false);
    const [validOrInvalid, setValidOrInvalid] = useState<ValidationErrors>({});
    const [login, setLogin] = useState<LoginUser>({ email: "", password: "" });
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
                    localStorage.setItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!, JSON.stringify(res?.data?.user));
                }
                const toastStatus: "success" | "warning" | "error" = ["success", "warning", "error"].includes(res?.data?.status) ? res?.data?.status : "success";
                showToast(toastStatus, res.data.message || "Login Successfully");
                router.push(res.data.url);
            }

        } catch (error) {
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
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