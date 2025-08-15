import API from "@/assets/api";
import { QueryParams } from "@/types/filter.t";
import { CreatePermission } from "@/types/role.t";
import { CreateReq, DeleteReq, GetListReq, UpdateReq } from "@/types/api.t";

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