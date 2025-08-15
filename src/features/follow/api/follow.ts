import API from "@/assets/api";

export const followApi = async (followerId: string, followingId: string) => {
    return API.post(`follow/${followerId}/${followingId}`);
};

export const unFollowApi = async (followerId: string, followingId: string) => {
    return API.delete(`follow/${followerId}/${followingId}`);
};