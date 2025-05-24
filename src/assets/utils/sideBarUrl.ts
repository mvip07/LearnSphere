export const SideBarUrl = () => {
    try {
        const storedSideBarUrl = localStorage.getItem("selectedIndex");
        return storedSideBarUrl ? storedSideBarUrl : "";
    } catch (error) {
        console.error("storedSideBarUrl Localstorage xatosi:", error);
        return "";
    }
} 