import API from "@assets/api";
import { QueryParams } from "types/filter";
import { CreateCategory } from "types/quiz";
import { CreateReq, DeleteReq, GetListReq, UpdateReq } from "types/api";

export const create = async (data: CreateCategory): Promise<CreateReq> => {
    return await API.post("category/create", data);
}
export const getList = async ({ page, limit, search }: QueryParams): Promise<GetListReq> => {
    return await API.get(`category/list?page=${page}&limit=${limit}&search=${search}`);
}

export const deleteMultiple = async (ids: string[]): Promise<DeleteReq> => {
    return await API.delete("/category/delete-multiple", { data: { ids } });
}

export const update = async (id: string, data: CreateCategory): Promise<UpdateReq> => {
    return await API.put(`/category/update/${id}`, data);
}