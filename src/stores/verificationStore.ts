import { create } from 'zustand';

interface VerificationState {
    email: string | null;
    verificationExpiresAt: number | null;
    setVerificationData: (email: string, expiresAt: number) => void;
    clearVerificationData: () => void;
}

export const useVerificationStore = create<VerificationState>((set) => ({
    email: null,
    verificationExpiresAt: null,
    setVerificationData: (email, expiresAt) => {
        set({ email, verificationExpiresAt: expiresAt });
        sessionStorage.setItem(`verificationData_${email}`, JSON.stringify({ email, expiresAt }));
    },
    clearVerificationData: () => {
        const email = useVerificationStore.getState().email;
        set({ email: null, verificationExpiresAt: null });
        if (email) {
            sessionStorage.removeItem(`verificationData_${email}`);
        }
    },
}));

export const initializeVerificationStore = (email: string) => {
    const data = sessionStorage.getItem(`verificationData_${email}`);
    if (data) {
        const { email: storedEmail, expiresAt } = JSON.parse(data);
        if (storedEmail === email && expiresAt > Date.now()) {
            useVerificationStore.getState().setVerificationData(storedEmail, expiresAt);
        } else {
            sessionStorage.removeItem(`verificationData_${email}`);
        }
    }
};