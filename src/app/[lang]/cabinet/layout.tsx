import { AppProvider } from "@/context/AppContext";
import CabinetLayout from "../components/cabinet/CabinetLayout";

export const metadata = {
    title: "My Cabinet - Personal Management Panel",
    description: "Manage your profile, quizzes, and messages in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            <CabinetLayout>{children}</CabinetLayout>
        </AppProvider>
    );
}
