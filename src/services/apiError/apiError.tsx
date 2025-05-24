import { showToast } from "@/assets/utils/toatify";

export interface ApiErrorProps {
    response?: {
        data?: {
            errors?: Record<string, string[] | string>
            message?: string;
            statusCode?: number;
        },
    }
}

export default function APIError(err: ApiErrorProps) {
    const validationErrors = err.response?.data;
    if (validationErrors) {
        let hasShownAny = false;

        if (validationErrors?.errors) {
            Object.entries(validationErrors?.errors).forEach(([field, messages]) => {
                if (field === "message") return;

                if (Array.isArray(messages)) {
                    hasShownAny = true;
                    messages.forEach((message) => {
                        showToast("error", `${field}: ${message}`);
                    });
                } else if (typeof messages === "string") {
                    hasShownAny = true;
                    showToast("error", `${field}: ${messages}`);
                }
            });
        }

        if (!hasShownAny && validationErrors.message) {
            showToast("error", validationErrors.message);
        }
    } else {
        showToast("error", err.response?.data?.message || "Unexpected error occurred");
    }
}
