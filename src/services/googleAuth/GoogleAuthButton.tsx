"use client";

import Image from 'next/image';
import { useGoogleLogin } from '@react-oauth/google';

import API from '@/assets/api';
import { showToast } from '@/assets/utils/toatify';
import { useVerificationStore } from '@/stores/verificationStore';
import { useGoToNextPage } from '@/hooks/useGoToNextPage';

export default function GoogleAuthButton({ title }: { title: string }) {
    const goTo = useGoToNextPage()
    const { setVerificationData } = useVerificationStore();

    const login = useGoogleLogin({
        flow: 'auth-code',
        scope: 'openid email profile',
        onSuccess: async (codeResponse) => {
            try {
                const res = await API.post(`auth/google`, { code: codeResponse.code });

                if (res?.data?.redirect && res?.data?.url) {
                    if (res.data.verificationExpiresAt) {
                        const expiresAtTime = new Date(res.data.verificationExpiresAt).getTime();
                        setVerificationData(res.data.email || res.data.url.split('/').pop(), expiresAtTime);
                    } else if (res?.data?.login) {
                        showToast("success", res?.data?.message);
                        localStorage.setItem("quizapp", JSON.stringify(res?.data?.user));
                    }
                    setTimeout(() => goTo("cabinet"), 1500);
                }
            } catch (err: unknown) {
                console.error("Backend login xatosi:", err);
            }
        },
        onError: () => {
            showToast("error", "Google login failed");
        },
    });

    return (
        <button
            type="button"
            onClick={() => login()}
            className="w-full mt-4 flex items-center justify-center gap-5 rounded-lg py-2.5 md:py-3 border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] outline-0 text-[var(--textCl)] dark:text-[var(--darkTextCl)] text-[16px] font-normal leading-normal bg-[var(--lg)] dark:bg-[var(--darkBorderCl)]"
        >
            <Image src="../../images/google.svg" width={20} height={20} alt="Google Icon" />
            {title}
        </button>
    );
}