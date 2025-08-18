import API from "@assets/api";
import { QueryParams } from "src/types/filter";
import { CreateQuestion } from "src/types/quiz";
import { CreateReq, DeleteReq, GetListReq, UpdateReq } from "src/types/api";

export const create = async (data: CreateQuestion): Promise<CreateReq> => {
    return await API.post("question/create", data);
}

export const getList = async ({ page, limit, search, filter }: QueryParams): Promise<GetListReq> => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit), search: search || '' });
    if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
            if (value && value !== 'all' && value.length > 0) {
                if (Array.isArray(value)) value.forEach(v => params.append(key, v));
                else params.append(key, value);
            }
        })
    }
    return await API.get(`question/list?${params.toString()}`);
}

export const deleteMultiple = async (ids: string[]): Promise<DeleteReq> => {
    return await API.delete("/question/delete-multiple", { data: { ids } });
}

export const update = async (id: string, data: CreateQuestion): Promise<UpdateReq> => {
    return await API.put(`/question/update/${id}`, data);
}