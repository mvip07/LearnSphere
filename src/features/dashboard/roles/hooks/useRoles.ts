import { AxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { showToast } from "@assets/utils/toatify";
import { create, deleteMultiple, getList, update, updatePermission } from "../services/roleService";
import { UseRolesReturn } from "types/hook";
import { CreateRole, EditPermission, Permission, Role } from "types/role";
import { ValidationErrors } from "types/general";

export const useRoles = (): UseRolesReturn => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [roles, setRoles] = useState<Role[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [limit, setLimit] = useState(Number(searchParams.get("limit") || 5));
    const [totalPages, setTotalPages] = useState(1);
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editRole, setEditRole] = useState<Role | null>(null);
    const [checked, setChecked] = useState<string[]>([]);
    const [permissionChecked, setPermissionChecked] = useState<string[]>([]);
    const [validOrInvalid, setValidOrInvalid] = useState<ValidationErrors>({});

    const updateParams = useCallback((key: string, value: string | number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, String(value));
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [searchParams, pathname, router]);

    const changeLimitOrPageOrSearch = useCallback((type: "page" | "limit" | "search", value: number | string) => {
        if (type === "page" && typeof value === "number") {
            updateParams("page", value);
        } else if (type === "limit" && typeof value === "number") {
            updateParams("page", 1);
            updateParams("limit", value);
        } else if (type === "search" && typeof value === "string") {
            updateParams("page", 1);
            updateParams("search", value);
        }
    }, [updateParams]);

    const fetchRoles = useCallback(async () => {
        setIsLoadingPage(true);
        try {
            const { data } = await getList({ page, limit, search });
            setRoles(data.roles ?? []);
            setTotalPages(data.totalPages);
            setPermissions(data.permissions ?? []);
            if (page > data.totalPages && data.totalPages > 0) {
                setPage(data.totalPages);
                updateParams("page", data.totalPages);
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            showToast("error", err.message || "Failed to fetch roles");
        } finally {
            setIsLoadingPage(false);
        }
    }, [page, limit, search, updateParams]);

    useEffect(() => {
        const limitP = Number(searchParams.get("limit")) || 5;
        const pageP = Number(searchParams.get("page")) || 1;
        const searchP = searchParams.get("search") || "";

        setPage(pageP);
        setLimit(limitP);
        setSearch(searchP);
    }, [searchParams]);

    useEffect(() => {
        fetchRoles();
    }, [page, limit, search, fetchRoles]);

    const handleCreate = useCallback(async (body: CreateRole) => {
        setIsLoading(true);
        try {
            const { data } = await create(body);
            fetchRoles();
            setCreateModal(false);
            setValidOrInvalid({});
            showToast("success", data.message || "Role created successfully");
            return true
        } catch (error) {
            const err = error as AxiosError<{ errors?: { [key: string]: string[] } }>;
            setValidOrInvalid(err?.response?.data?.errors || {});
            return false
        } finally {
            setIsLoading(false);
        }
    }, [fetchRoles]);

    const handleEdit = useCallback(async (body: CreateRole) => {
        if (!editRole) return false;
        setIsLoading(true);
        try {
            const { data } = await update(editRole.id, body);
            fetchRoles();
            setEditRole(null);
            setEditModal(false);
            setValidOrInvalid({});
            showToast(data.changed ? "success" : "info", data.message || "Role updated successfully");
            return true
        } catch (error) {
            const err = error as AxiosError<{ errors?: { [key: string]: string[] } }>;
            setValidOrInvalid(err?.response?.data?.errors || {});
            return false
        } finally {
            setIsLoading(false);
        }
    }, [editRole, fetchRoles]);

    const handlePermissionEdit = useCallback(async (body: EditPermission) => {
        if (!body) return;
        setIsLoading(true);
        try {
            const { data } = await updatePermission(body.id, body);
            fetchRoles();
            setEditRole(null);
            setEditModal(false);
            setValidOrInvalid({});
            showToast(data.changed ? "success" : "info", data.message || "Permissions updated successfully");
        } catch (error) {
            const err = error as AxiosError<{ errors?: { [key: string]: string[] } }>;
            setValidOrInvalid(err?.response?.data?.errors || {});
        } finally {
            setIsLoading(false);
        }
    }, [fetchRoles]);

    const confirmDelete = useCallback(async () => {
        if (!checked.length) return;
        try {
            const { data } = await deleteMultiple(checked);
            fetchRoles();
            setChecked([]);
            setDeleteModal(false);
            updateParams("page", 1);
            showToast("success", data.message || "Roles deleted successfully");
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            showToast("error", err.message || "Failed to delete roles");
        }
    }, [checked, fetchRoles, updateParams]);

    const handleNext = useCallback(() => {
        if (page < totalPages) changeLimitOrPageOrSearch("page", page + 1);
    }, [page, totalPages, changeLimitOrPageOrSearch]);

    const handlePrev = useCallback(() => {
        if (page > 1) changeLimitOrPageOrSearch("page", page - 1);
    }, [page, changeLimitOrPageOrSearch]);

    return {
        page,
        limit,
        roles,
        search,
        checked,
        isLoading,
        editModal,
        totalPages,
        createModal,
        deleteModal,
        editRole,
        isLoadingPage,
        permissions,
        validOrInvalid,
        permissionChecked,
        setPage,
        setLimit,
        setSearch,
        setChecked,
        setEditRole,
        setEditModal,
        setCreateModal,
        setDeleteModal,
        setPermissionChecked,
        fetchRoles,
        handleEdit,
        handleCreate,
        confirmDelete,
        handleNext,
        handlePrev,
        handlePermissionEdit,
        changeLimitOrPageOrSearch,
    };
};