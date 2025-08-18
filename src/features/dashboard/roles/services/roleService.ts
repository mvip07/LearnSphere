import API from "@assets/api";
import { QueryParams } from "src/types/filter";
import { CreateRole, EditPermission } from "src/types/role";
import { CreateReq, DeleteReq, GetListReq, UpdateReq } from "src/types/api";

export const create = async (data: CreateRole): Promise<CreateReq> => {
    try {
        return await API.post("/role/create", data);
    } catch (error) {
        throw error
    }
};

export const getList = async ({ page, limit, search }: QueryParams): Promise<GetListReq> => {
    try {
        return await API.get(`/role/list?page=${page}&limit=${limit}&search=${search}`);
    } catch (error) {
        throw error
    }
};

export const update = async (id: string, data: CreateRole): Promise<UpdateReq> => {
    try {
        return await API.put(`/role/update/${id}`, data);
    } catch (error) {
        throw error
    }
};

export const updatePermission = async (id: string, data: EditPermission): Promise<UpdateReq> => {
    try {
        return await API.put(`/role/update-permissions/${id}`, { permissions: data.permissions });
    } catch (error) {
        throw error
    }
};

export const deleteMultiple = async (ids: string[]): Promise<DeleteReq> => {
    try {
        return await API.delete("/role/delete-multiple", { data: { ids } });
    } catch (error) {
        throw error
    }
};