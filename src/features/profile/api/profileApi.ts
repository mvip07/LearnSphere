import API from "@assets/api/index";

export const profileById = async (userId: string) => {
    return await API.get(`user/id/${userId}`);
};

export const follow = async (followerId: string, followingId: string) => {
    return await API.post(`follow/${followerId}/${followingId}`);
};

export const unFollow = async (followerId: string, followingId: string) => {
    return await API.delete(`follow/${followerId}/${followingId}`);
};

export const checkFollowStatus = async (followerId: string, followingId: string) => {
    return await API.get(`follow/status/${followerId}/${followingId}`);
};


