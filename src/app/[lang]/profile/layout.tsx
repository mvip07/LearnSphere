import React from "react";
import Navbar from "@components/navbar/Navbar";
import Sidebar from "@components/sidebar/Sidebar";
import { AppProvider } from "@context/AppContext";
import { CABINETSIDEBAR } from "@assets/utils/sideBarData";

export const metadata = {
    title: "Edit Profile - Manage Your Account",
    description: "Update your personal information, change your settings, and customize your profile effortlessly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            <main id="main" className="p-4">
                <Sidebar sidebar={CABINETSIDEBAR} />
                <Navbar />
                {children}
            </main>
        </AppProvider>
    );
}
