"use client"
import { useEffect } from "react";
import { useGoToNextPage } from "@/hooks/useGoToNextPage";

export default function AuthPage() {
    const goTo = useGoToNextPage();
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = localStorage.getItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!);
            if (storage) goTo("/cabinet")
            else goTo("/auth/login");
        }
    }, [goTo]);

    return null;
}