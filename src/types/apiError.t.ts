export interface ApiErrorProps {
    response?: {
        data?: {
            errors?: Record<string, string[] | string>
            message?: string;
            statusCode?: number;
        },
    }
}