export const getStoredUser = () => {
    try {
        const storedUser = localStorage.getItem("quizapp");
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("LocalStorage xatosi:", error);
        return null;
    }
};