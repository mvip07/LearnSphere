import API from "@assets/api";
import { CreateTopic } from "types/quiz";
import { QueryParams } from "types/filter";
import { CreateReq, DeleteReq, GetListReq, UpdateReq } from "types/api";

export const create = async (data: CreateTopic): Promise<CreateReq> => {
    return await API.post("topic/create", data);
}

export const getList = async ({ page, limit, search, filter }: QueryParams): Promise<GetListReq> => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit), search: search || '' });
    if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
            if (value && value !== 'all') {
                params.set(key, value);
            }
        });
    }
    return await API.get(`topic/list?${params.toString()}`);
}

export const deleteMultiple = async (ids: string[]): Promise<DeleteReq> => {
    return await API.delete("/topic/delete-multiple", { data: { ids } });
}

export const update = async (id: string, data: CreateTopic): Promise<UpdateReq> => {
    return await API.put(`/topic/update/${id}`, data);
}