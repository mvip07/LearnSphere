"use client";

import { useLoader } from '@context/LoaderContext';

export const useToggleLoader = () => {
    const { showLoader, hideLoader } = useLoader();

    const toggleLoader = (active: boolean) => {
        if (active) {
            showLoader();
            document.body.style.overflow = 'hidden';
        } else {
            hideLoader();
            document.body.style.overflow = 'auto';
        }
    };

    return toggleLoader;
}; 