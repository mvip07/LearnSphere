import API from "@assets/api/index";

export const getUserRequest = async (receiverUserId: string) => {
    return await API.get(`/user/id/${receiverUserId}`);
};

export const searchUsers = async (username: string) => {
    return await API.get(`/user/username?username=${username}`);
};

export const fetchMessages = async (currentUserId: string, receiverUserId: string) => {
    return await API.get(`/messages/${currentUserId}/${receiverUserId}`);
};