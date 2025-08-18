import API from "@assets/api";
import { CreateLevel } from "types/quiz";
import { QueryParams } from "types/filter";
import { CreateReq, DeleteReq, GetListReq, UpdateReq } from "types/api";

export const create = async (data: CreateLevel): Promise<CreateReq> => {
    return await API.post("level/create", data);
}

export const update = async (id: string, data: CreateLevel): Promise<UpdateReq> => {
    return await API.put(`level/update/${id}`, data);
}

export const getList = async ({ page, limit, search }: QueryParams): Promise<GetListReq> => {
    return await API.get(`level/list?page=${page}&limit=${limit}&search=${search}`);
}

export const deleteMultiple = async (ids: string[]): Promise<DeleteReq> => {
    return await API.delete("level/delete-multiple", { data: { ids } });
}