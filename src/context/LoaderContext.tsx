"use client";

import { AnimatePresence } from 'framer-motion';
import { createContext, useContext, useState } from 'react';
import { SphereLoader } from '../app/[lang]/components/LoaderContainer';

type LoaderContextType = {
    showLoader: () => void;
    hideLoader: () => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    const showLoader = () => setIsLoading(true);
    const hideLoader = () => setIsLoading(false);

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader }}>
            {children}
            <AnimatePresence>
                {isLoading && <SphereLoader />}
            </AnimatePresence>
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (context === undefined) {
        throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
};