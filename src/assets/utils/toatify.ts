import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (status: "error" | "success" | "warning" | "info", text: string) => {
    if (status === "error") {
        return toast.error(text);
    } else if (status === "success") {
        return toast.success(text);
    } else if (status === "warning") {
        return toast.warning(text);
    } else if (status === "info") {
        return toast.info(text);
    }
};