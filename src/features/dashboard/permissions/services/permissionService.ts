import API from "@assets/api";
import { QueryParams } from "src/types/filter";
import { CreatePermission } from "src/types/role";
import { CreateReq, DeleteReq, GetListReq, UpdateReq } from "src/types/api";

export const create = async (data: CreatePermission): Promise<CreateReq> => {
    return await API.post("permission/create", data);
};

export const getList = async ({ page, limit, search }: QueryParams): Promise<GetListReq> => {
    return await API.get(`permission/list?page=${page}&limit=${limit}&search=${search}`);
};

export const update = async (id: string, data: CreatePermission): Promise<UpdateReq> => {
    return await API.put(`/permission/update/${id}`, data);
};

export const deleteMultiple = async (ids: string[]): Promise<DeleteReq> => {
    return await API.delete("/permission/delete-multiple", { data: { ids } });
};