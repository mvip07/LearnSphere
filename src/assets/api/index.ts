import axios from "axios";
import { host } from "./urls";

const containsFiles = (data: unknown): boolean => {
    if (typeof data !== "object" || data === null) return false;

    for (const key in data as Record<string, unknown>) {
        const value = (data as Record<string, unknown>)[key];
        if (value instanceof File || value instanceof Blob) {
            return true;
        }
    }
    return false;
};


const API = axios.create({ baseURL: host });

API.interceptors.request.use((config) => {
    const token: string = JSON.parse(localStorage.getItem("quizapp") || "null")?.token || "";

    if (token) config.headers.Authorization = `Bearer ${token}`;

    if (containsFiles(config.data)) config.headers["Content-Type"] = "multipart/form-data";
    else config.headers["Content-Type"] = "application/json";

    return config;
}, (error) => Promise.reject(error));

API.interceptors.response.use((response) => response, (error) => Promise.reject(error));

export default API;
