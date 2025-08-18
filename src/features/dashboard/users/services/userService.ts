import API from '@assets/api';
import { CreateUser } from 'src/types/auth';
import { QueryParams } from 'src/types/filter';
import { CreateReq, DeleteReq, GetListReq, UpdateReq } from 'src/types/api';

export const create = async (data: CreateUser): Promise<CreateReq> => {
    return await API.post('user/create', data);
};

export const getList = async ({ page, limit, search, filter }: QueryParams): Promise<GetListReq> => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit), search: search || '' });
    if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
            if (value && value !== 'all' && value.trim() !== '') {
                params.set(key, value);
            }
        });
    }
    return await API.get(`user/list/for/admin?${params.toString()}`);
};

export const update = async (id: string, data: CreateUser): Promise<UpdateReq> => {
    return await API.put(`/user/update/for/admin/${id}`, data);
};

export const deleteMultiple = async (ids: string[]): Promise<DeleteReq> => {
    return await API.delete('/user/delete-multiple', { data: { ids } });
};