"use client";

import Image from 'next/image';
import { useGoogleLogin } from '@react-oauth/google';

import API from '@assets/api';
import { showToast } from '@assets/utils/toatify';
import { useVerificationStore } from '@stores/verificationStore';
import { useGoToNextPage } from '@hooks/useGoToNextPage';

export default function GoogleAuthButton({ title }: { title: string }) {
    const goTo = useGoToNextPage()
    const { setVerificationData } = useVerificationStore();

    const login = useGoogleLogin({
        flow: 'auth-code',
        scope: 'openid email profile',
        onSuccess: async (codeResponse) => {
            try {
                const { data } = await API.post(`auth/google`, { code: codeResponse.code });

                if (data?.redirect && data?.url && data.verificationExpiresAt) {
                    const expiresAtTime = new Date(data.verificationExpiresAt).getTime();
                    setVerificationData(data.email || data.url.split('/').pop(), expiresAtTime);
                    goTo(data?.url)
                }
                if (data?.login) {
                    showToast("success", data?.message);
                    localStorage.setItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!, JSON.stringify(data?.user));
                    setTimeout(() => goTo("cabinet"), 1000);
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
        <button type="button" onClick={() => login()} className="w-full mt-4 flex items-center justify-center gap-5 rounded-lg py-3 border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] outline-0 text-[var(--textCl)] dark:text-[var(--darkTextCl)] text-[16px] font-normal leading-normal bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] cursor-pointer" >
            <Image src="../../images/google.svg" width={20} height={20} alt="Google Icon" />
            {title}
        </button>
    );
}