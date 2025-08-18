import Navbar from "@components/navbar/Navbar";
import { AppProvider } from "@context/AppContext";
import Sidebar from "@components/sidebar/Sidebar";
import { DASHBOARDSIDEBAR } from "@assets/utils/sideBarData";

export const metadata = {
    title: "Admin Dashboard | Quiz Management",
    description: "Monitor platform performance, manage content, track user activity, and control system settings from one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            <main id="main" className="p-4">
                <Sidebar sidebar={DASHBOARDSIDEBAR} />
                <Navbar />
                {children}
            </main>
        </AppProvider>
    );
}
