"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: ReactNode; }) {
    const router = useRouter();

    useEffect(() => {
        const storage = localStorage.getItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!);

        if (storage) {
            router.replace("/cabinet");
        } else {
            router.replace("/auth/login");
        }
    }, [router]);

    return children;
}
