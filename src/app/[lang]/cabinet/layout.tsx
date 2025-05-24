import React from "react";
import CabinetNavbar from "../components/cabinet/CabinetNavbar";
import CabinetSideBar from "../components/cabinet/CabinetSideBar";
import { CABINETSIDEBAR } from "@/assets/utils/sideBarData";
import { AppProvider } from "@/context/AppContextType";

export const metadata = {
    title: "My Cabinet - Personal Management Panel",
    description: "A convenient and interactive platform to manage messages, profile settings, quiz games, and user rankings.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            <main id="main" className="p-4">
                <CabinetSideBar sidebar={CABINETSIDEBAR} />
                <CabinetNavbar />
                {children}
            </main>
        </AppProvider>

    );
}