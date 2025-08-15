import API from "@/assets/api/index";
import { EmailRequest, LoginUser, RegisterUser } from "@/types/auth.t";

export const forgotPasswordRequest = async (forgotPasswordData: EmailRequest) => {
    return await API.post("auth/forgot-password", forgotPasswordData);
};

export const loginRequest = async (loginData: LoginUser) => {
    return await API.post("auth/login", loginData);
};

export const resetPasswordRequest = async (token: string, newPasswordData: { password: string; confirmPassword: string }) => {
    return await API.post(`auth/reset-password/${token}`, newPasswordData);
};

export const registerUser = async (userData: RegisterUser) => {
    return await API.post("auth/register", userData);
};

export const sendVerificationCode = async (email: string) => {
    return await API.post("auth/send/verification/code", { email });
};

export const confirmVerificationCode = async (email: string, verificationCode: string) => {
    return await API.post("auth/confirm/verification/code", { email, verificationcode: verificationCode });
};
