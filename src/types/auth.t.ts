import { Role } from "./role.t";

export interface UserBase {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    image: string | File;
}

export interface User extends UserBase {
    bio?: string;
    follower: string;
    following: string;
    totalCoins: number;
    block?: boolean;
    isVerified?: boolean;
    roles?: Role[];
    createdAt?: string;
    updatedAt?: string;
    verificationCode?: number | null;
}

export interface CreateUser {
    bio?: string;
    email: string;
    roles: string[];
    lastname: string;
    username: string;
    password?: string;
    firstname: string;
    image: File | string;
    block: boolean | string;
    confirmPassword?: string;
    isVerified: boolean | string;
}

export interface RegisterUser {
    email: string;
    lastname: string;
    username: string;
    password: string;
    firstname: string;
    confirmPassword: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface EmailRequest {
    email: string;
}

export interface ForgotPasswordState {
    email: string;
}

export interface NewPasswordState {
    password: string;
    confirmPassword: string;
}

export interface VisiblePassword {
    visible: string;
    active: boolean;
}

export interface UserDto {
    token: string;
    userId: string;
}

export interface ProfileEdit extends Omit<User, "id" | "follower" | "following" | "totalCoins" | "block" | "isVerified" | "roles" | "createdAt" | "updatedAt" | "verificationCode"> {
    bio: string;
}

export interface Follower extends UserBase {
    userId: string;
}

export interface Following extends UserBase {
    userId: string;
}

export interface ChatUsers extends Pick<User, "id" | "email" | "image" | "lastname" | "username" | "firstname"> {
    userId: string;
    lastMessage: string;
}

export type SearchUsername = Pick<User, "id" | "image" | "lastname" | "username" | "firstname">;