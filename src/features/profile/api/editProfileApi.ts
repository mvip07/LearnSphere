import API from "@assets/api/index";
import { ProfileEdit } from "src/types/auth";

export const updateUserProfile = async (userId: string, profile: ProfileEdit) => {
  return await API.put(`user/update/${userId}`, profile);
};

export const deleteProfileImage = async (userId: string) => {
  return await API.put(`user/delete-image/${userId}`);
};