import { PersistStorage } from "zustand/middleware";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPT_KEY || "default_secret";

export const encryptedStorage: PersistStorage<unknown> = {
    getItem: (name) => {
        if (typeof window === "undefined") return null;
        try {
            const encrypted = localStorage.getItem(name);
            if (!encrypted) return null;

            const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            return JSON.parse(decrypted);
        } catch (e) {
            console.error("Decryption failed:", e);
            return null;
        }
    },

    setItem: (name, value) => {
        if (typeof window === "undefined") return;
        try {
            const stringified = JSON.stringify(value);
            const encrypted = CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
            localStorage.setItem(name, encrypted);
        } catch (e) {
            console.error("Encryption failed:", e);
        }
    },

    removeItem: (name) => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(name);
    },
};
