import { showToast } from "@assets/utils/toatify";
import { ApiErrorProps } from "src/types/apiError";
import { ValidationErrors } from "src/types/general";

export function handleApiError(err: ApiErrorProps, setValidOrInvalid?: (errors: ValidationErrors) => void) {
    const { statusCode, errors, message } = err.response?.data || {};
    const collectedErrors: ValidationErrors = {};
    if (statusCode === 401) {
        localStorage.clear();
        window.location.href = "/auth/login";
        return;
    }

    if (statusCode === 404) {
        window.location.href = "/404";
        return;
    }

    if (statusCode === 403) {
        // localStorage.clear();
        // window.location.href = "/403";
        return;
    }

    let hasShownAny = false;

    if (errors) {
        Object.entries(errors).forEach(([field, msgs]) => {
            if (field === "message") return;
            const messagesArray = Array.isArray(msgs) ? msgs : [msgs];
            collectedErrors[field] = messagesArray;
            hasShownAny = true;
        });
    }

    if (!hasShownAny && message) {
        showToast("error", message);
    }

    if (!errors && !message) {
        showToast("error", "Unexpected error occurred");
    }

    setValidOrInvalid?.(collectedErrors);
}