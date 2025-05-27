// context/LoaderContext.tsx
"use client";

import { AnimatePresence } from "framer-motion";
import { createContext, useContext, useState } from "react";
import { LoaderContextType } from "@/types/Cabinet/cabinet.t";
import { SphereLoader } from "../app/[lang]/components/LoaderContainer";

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);

    const showLoader = () => setIsVisible(true);
    const hideLoader = () => setIsVisible(false);

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader }}>
            {children}
            <AnimatePresence>{isVisible && <SphereLoader />}</AnimatePresence>
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) throw new Error("useLoader must be used within LoaderProvider");
    return context;
};
