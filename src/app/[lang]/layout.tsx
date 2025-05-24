import { Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderProvider } from "../../context/LoaderContext";
import "@/styles/globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    weight: ["400", "500", "600", "700"],
});

export const metadata = {
    icons: "/images/google.svg",
    title: "Knowledge Testing Platform - Challenge Your Skills",
    description: "An interactive platform where users can test their knowledge in various fields through engaging quizzes, challenges, and ranking systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <body className={`bg-[var(--body)] dark:bg-[var(--bodyDark)] ${montserrat.variable}`}>
                <LoaderProvider>
                    {children}
                </LoaderProvider>
                <ToastContainer />
            </body>
        </html>
    );
}

