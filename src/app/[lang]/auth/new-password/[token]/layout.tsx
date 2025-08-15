import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create a New Password - Secure Your Account",
    description: "Set a strong and secure new password for your account. Complete the password reset process to regain access safely.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-dvh grid grid-cols-1 md:grid-cols-[1fr_400px] bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] items-center box-shadow overflow-hidden">
            <div className="hidden w-full h-full md:flex items-center justify-center border-r-2 border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] p-4">
                <Image className="w-2/3 h-2/3" width={100} height={100} src="../../../images/auth.svg" alt="Auth Image" />
            </div>
            <div className="w-full h-full flex items-center justify-end overflow-hidden p-4 py-10">
                {children}
            </div>
        </div>
    );
}
