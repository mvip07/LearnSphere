export const getStoredUser = () => {
    if (typeof window === "undefined") return null;

    const storedUser = localStorage.getItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!);
    if (storedUser) {
        return JSON.parse(storedUser)
    }
    return window.location.href = "/auth/login"
};