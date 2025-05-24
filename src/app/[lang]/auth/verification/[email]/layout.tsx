import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Enter Verification Code - Confirm Your Identity",
    description: "Enter the verification code sent to your email or phone to confirm your identity. Secure your account and proceed with the process.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-dvh grid grid-cols-1 lg:grid-cols-[1fr_400px] bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] items-center box-shadow overflow-hidden">
            <div className="hidden w-full h-full lg:flex items-center justify-center border-r-2 border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] p-4">
                <Image className="w-2/3 h-2/3" width={100} height={100} src="../../../images/auth.svg" alt="Auth Image" />
            </div>
            <div className="w-full h-full flex items-start justify-end overflow-hidden p-4 py-10">
                {children}
            </div>
        </div>
    );
}
