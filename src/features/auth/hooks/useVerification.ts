import { AxiosError } from "axios";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback, ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";
import { showToast } from "@assets/utils/toatify";
import { ApiErrorProps } from "src/types/apiError";
import { handleApiError } from "@services/handleApiError/handleApiError";
import { sendVerificationCode, confirmVerificationCode } from "../api/authApi";
import { useVerificationStore, initializeVerificationStore } from '@stores/verificationStore';

export const useVerification = () => {
    const router = useRouter();
    let { email } = useParams();
    email = decodeURIComponent(email as string);

    const { verificationExpiresAt, setVerificationData, clearVerificationData } = useVerificationStore();
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(180);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [values, setValues] = useState<string[]>(Array(6).fill(""));

    useEffect(() => {
        const initializeTimer = async () => {
            try {
                setLoading(true);
                initializeVerificationStore(email);
            } catch (error) {
                const err = error as AxiosError<{ message?: string; }>;
                showToast("warning", err.response?.data?.message || "Failed to load verification details");
            } finally {
                setLoading(false);
            }
        };

        initializeTimer();
    }, [email, verificationExpiresAt, setVerificationData]);

    useEffect(() => {
        if (verificationExpiresAt) {
            const updateTimer = () => {
                const now = Date.now();
                const secondsLeft = Math.max(0, Math.floor((verificationExpiresAt - now) / 1000));
                setTimeLeft(secondsLeft);

                if (secondsLeft <= 0) {
                    clearInterval(timerRef.current as NodeJS.Timeout);
                    clearVerificationData();
                    setRefresh(true);
                }
            };

            updateTimer();
            timerRef.current = setInterval(updateTimer, 1000);

            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            };
        }
    }, [verificationExpiresAt, clearVerificationData]);

    useEffect(() => {
        if (timeLeft === 0) setRefresh(true);
    }, [timeLeft]);

    const resetTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        setTimeLeft(180);
        setRefresh(false);

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current as NodeJS.Timeout);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        if (value) {
            const newValues = [...values];
            newValues[index] = value;
            setValues(newValues);

            if (index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
        if (e.key === "Backspace") {
            const newValues = [...values];

            if (values[index]) {
                newValues[index] = "";
                setValues(newValues);
            } else if (index > 0) {
                newValues[index - 1] = "";
                setValues(newValues);
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
        const pasteData = e.clipboardData.getData("text").slice(0, 6).replace(/[^0-9]/g, "");
        if (pasteData.length === 6) {
            setValues(pasteData.split(""));
        }
    };

    const clickRefresh = async () => {
        setLoading(true);
        try {
            if (email) {
                const res = await sendVerificationCode(email);
                showToast("success", "Verification code has been successfully sent to email!");
                if (res.data.verificationExpiresAt) {
                    const expiresAtTime = new Date(res.data.verificationExpiresAt).getTime();
                    setVerificationData(email, expiresAtTime);
                }
                resetTimer();
            }
        } catch (error) {
            const err = error as AxiosError<{ message?: string; }>;
            showToast("error", err?.response?.data?.message || "Verification failed!");
        } finally {
            setLoading(false);
        }
    };

    const sendCode = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (email) {
                const code = values.join("");
                const res = await confirmVerificationCode(email, code);
                clearVerificationData();

                if (res?.data?.redirect && res?.data?.url && res?.data?.status) {
                    if (res.data.user) {
                        localStorage.setItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!, JSON.stringify(res?.data?.user));
                    }
                    const toastStatus: "success" | "warning" | "error" = ["success", "warning", "error"].includes(res?.data?.status) ? res?.data?.status : "success";
                    showToast(toastStatus as "warning" | "success" | "error", res.data.message || "Please verify your email");
                    router.push(res.data.url);
                }
            }
        } catch (error) {
            setValues(Array(6).fill(""));
            handleApiError(error as ApiErrorProps)
        } finally {
            setLoading(false);
        }
    };

    return { values, refresh, loading, timeLeft, inputRefs, sendCode, handlePaste, handleChange, clickRefresh, handleKeyDown };
};