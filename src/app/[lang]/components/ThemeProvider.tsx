"use client";

import { createContext, useEffect, useState } from "react";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setMounted(true);

        const savedTheme = localStorage.getItem("darkMode");

        if (savedTheme !== null) {
            setIsDarkMode(savedTheme === "true");
            document.documentElement.setAttribute("data-theme", savedTheme === "true" ? "dark" : "light");
        } else {
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setIsDarkMode(systemPrefersDark);
            document.documentElement.setAttribute("data-theme", systemPrefersDark ? "dark" : "light");
            localStorage.setItem("darkMode", String(systemPrefersDark));
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem("darkMode", String(newMode));
        document.documentElement.setAttribute("data-theme", newMode ? "dark" : "light");
    };

    if (!mounted) {
        return <div className="hidden"></div>;
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const ThemeContext = createContext({
    isDarkMode: false,
    toggleTheme: () => { },
});