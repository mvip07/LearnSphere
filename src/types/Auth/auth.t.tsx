export interface EmailRequest {
    email: string
}

export interface LoginUser {
    email: string;
    password: string
}

export interface RegisterUser {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface ForgotPasswordState {
    email: string;
}

export interface ValidationErrors {
    [key: string]: string[];
}

export interface VisiblePassword {
    visible: string;
    active: boolean;
}

export interface NewPasswordState {
    password: string;
    confirmPassword: string;
}