import API from "@/assets/api/index";

export const forgotPasswordRequest = async (forgotPasswordData: { email: string }) => {
  return await API.post("auth/forgot-password", forgotPasswordData);
};

export const loginRequest = async (loginData: { email: string; password: string }) => {
  return await API.post("auth/login", loginData);
};

export const resetPasswordRequest = async (token: string, newPasswordData: { password: string; confirmPassword: string }) => {
  return await API.post(`auth/reset-password/${token}`, newPasswordData);
};

export const registerUser = async (userData: {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  return await API.post("auth/register", userData);
};

export const sendVerificationCode = async (email: string) => {
  return await API.post("auth/send/verification/code", { email });
};

export const confirmVerificationCode = async (email: string, verificationCode: string) => {
  return await API.post("auth/confirm/verification/code", { email, verificationcode: verificationCode });
};
