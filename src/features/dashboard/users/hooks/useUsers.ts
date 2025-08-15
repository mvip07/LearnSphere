import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { showToast } from '@/assets/utils/toatify';
import { DEFAULT_FILTER } from '../constants/constants';
import { Role } from '@/types/role.t';
import { UseUsersReturn } from '@/types/hook.t';
import { CreateUser, User } from '@/types/auth.t';
import { ValidationErrors } from '@/types/general.t';
import { Filter, QueryParams } from '@/types/filter.t';
import { create, update, getList, deleteMultiple } from '../services/userService';
import { handleApiError } from '@/services/handleApiError/handleApiError';
import { ApiErrorProps } from '@/types/apiError.t';

const parseQueryParams = (searchParams: URLSearchParams): QueryParams => ({
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 5,
    search: searchParams.get('search') || '',
    filter: {
        block: searchParams.get('block') || '',
        roles: searchParams.get('roles') || '',
        followers: searchParams.get('followers') || '',
        following: searchParams.get('following') || '',
        totalCoins: searchParams.get('totalCoins') || '',
        isVerified: searchParams.get('isVerified') || '',
    },
});

export const useUsers = (): UseUsersReturn => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState<QueryParams>(parseQueryParams(searchParams));
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [checked, setChecked] = useState<string[]>([]);
    const [validOrInvalid, setValidOrInvalid] = useState<ValidationErrors>({});

    useEffect(() => {
        const newQuery = parseQueryParams(searchParams);
        setQuery((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(newQuery)) {
                return newQuery;
            }
            return prev;
        });
    }, [searchParams]);

    const queryParams = useMemo(() => ({
        page: query.page,
        limit: query.limit,
        search: query.search,
        filter: query.filter ?? DEFAULT_FILTER,
    }), [query]);

    const updateSearchParams = useCallback((updates: Partial<QueryParams>) => {
        const params = new URLSearchParams(searchParams.toString());
        const newQuery = { ...query, ...updates, filter: updates.filter ?? query.filter ?? DEFAULT_FILTER };

        if (updates.page) params.set('page', String(updates.page));
        if (updates.limit) params.set('limit', String(updates.limit));
        if (updates.search !== undefined) params.set('search', updates.search);

        if (updates.filter) {
            Object.entries(updates.filter).forEach(([key, value]) => {
                if (value && value !== 'all') {
                    params.set(key, value);
                } else {
                    params.delete(key);
                }
            });
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        setQuery(newQuery);
    }, [pathname, router, searchParams, query]);

    const fetchUsers = useCallback(async () => {
        setIsLoadingPage(true);
        try {
            const { data } = await getList(queryParams);
            setUsers(data.users ?? []);
            setRoles(data.roles ?? []);
            setTotalPages(data.totalPages);
            if (query.page > data.totalPages && data.totalPages > 0) {
                setQuery((prev) => ({ ...prev, page: data.totalPages }));
                updateSearchParams({ page: data.totalPages });
            }
        } catch (error) {
            handleApiError(error as ApiErrorProps)
        } finally {
            setIsLoadingPage(false);
        }
    }, [queryParams, query.page, updateSearchParams]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleCreate = useCallback(async (body: CreateUser) => {
        setIsLoading(true);
        try {
            const { data } = await create(body);
            await fetchUsers();
            setCreateModal(false);
            setValidOrInvalid({});
            showToast('success', data.message || 'User created successfully');
            return true;
        } catch (error) {
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [fetchUsers]);

    const handleEdit = useCallback(async (body: CreateUser) => {
        if (!editUser) return false;
        setIsLoading(true);
        try {
            const { data } = await update(editUser.id, body);
            await fetchUsers();
            setEditUser(null);
            setEditModal(false);
            setValidOrInvalid({});
            showToast(data.changed ? 'success' : 'info', data.message || 'User updated successfully');
            return true;
        } catch (error) {
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [editUser, fetchUsers]);

    const handleDelete = useCallback(async () => {
        if (!checked.length) return;
        setIsLoading(true);
        try {
            const { data } = await deleteMultiple(checked);
            await fetchUsers();
            setChecked([]);
            setDeleteModal(false);
            updateSearchParams({ page: 1 });
            showToast('success', data.message || 'Users deleted successfully');
        } catch (error) {
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
        } finally {
            setIsLoading(false);
        }
    }, [checked, fetchUsers, updateSearchParams]);

    const changeLimitOrPageOrSearch = useCallback((type: 'page' | 'limit' | 'search', value: string | number) => {
        const updates: Partial<QueryParams> = {};
        if (type === 'page' && typeof value === 'number') {
            updates.page = value;
        } else if (type === 'limit' && typeof value === 'number') {
            updates.page = 1;
            updates.limit = value;
        } else if (type === 'search' && typeof value === 'string') {
            updates.page = 1;
            updates.search = value;
        }
        updateSearchParams(updates);
    }, [updateSearchParams]);

    const updateFilterParam = useCallback((key: keyof Filter, value: string) => {
        updateSearchParams({ page: 1, filter: { ...query.filter ?? DEFAULT_FILTER, [key]: value } })
    }, [updateSearchParams, query.filter]);

    const handleNext = useCallback(() => {
        if (query.page < totalPages) {
            changeLimitOrPageOrSearch('page', query.page + 1);
        }
    }, [query.page, totalPages, changeLimitOrPageOrSearch]);

    const handlePrev = useCallback(() => {
        if (query.page > 1) {
            changeLimitOrPageOrSearch('page', query.page - 1);
        }
    }, [query.page, changeLimitOrPageOrSearch]);

    return {
        page: query.page,
        limit: query.limit,
        search: query.search,
        confirmDelete: handleDelete,
        filter: query.filter ?? DEFAULT_FILTER,
        users,
        roles,
        isLoading,
        isLoadingPage,
        totalPages,
        createModal,
        editModal,
        deleteModal,
        editUser,
        checked,
        validOrInvalid,
        setValidOrInvalid,
        setChecked,
        setEditUser,
        setEditModal,
        setCreateModal,
        setDeleteModal,
        handleCreate,
        handleEdit,
        handleNext,
        handlePrev,
        updateFilterParam,
        changeLimitOrPageOrSearch,
        setFilter: (value: Filter) => updateSearchParams({ filter: value }),
        setPage: (value: number) => changeLimitOrPageOrSearch('page', value),
        setLimit: (value: number) => changeLimitOrPageOrSearch('limit', value),
        setSearch: (value: string) => changeLimitOrPageOrSearch('search', value),
    };
};