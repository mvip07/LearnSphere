// app/403/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "403 Forbidden – Access Denied | LearnSphere",
    description: "Oops! You’ve stumbled into forbidden territory. This page is restricted and you don’t have permission to access it. Explore other sections or enjoy some interactive fun while you’re here!",
    keywords: ["403", "Forbidden", "Access Denied", "Restricted Page", "Interactive", "Fun Page"],
};

export default function ForbiddenLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}