import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

import { AppProvider } from "@/context/AppContext";
import { CABINETSIDEBAR } from "@/assets/utils/sideBarData";

export const metadata = {
    title: "My Cabinet - Personal Management Panel",
    description: "A convenient and interactive platform to manage messages, profile settings, quiz games, and user rankings.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider >
            <main id="main" className="p-4">
                <Sidebar sidebar={CABINETSIDEBAR} />
                <Navbar />
                {children}
            </main>
        </AppProvider>
    );
}
