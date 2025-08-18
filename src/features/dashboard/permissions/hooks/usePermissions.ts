import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { showToast } from "@assets/utils/toatify";
import { ApiErrorProps } from "src/types/apiError";
import { ValidationErrors } from "src/types/general";
import { UsePermissionsReturn } from "src/types/hook";
import { CreatePermission, Permission } from "src/types/role";
import { handleApiError } from "@services/handleApiError/handleApiError";
import { create, deleteMultiple, getList, update } from "../services/permissionService";

export const usePermissions = (): UsePermissionsReturn => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

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
    const [editPermission, setEditPermission] = useState<Permission | null>(null);
    const [checked, setChecked] = useState<string[]>([]);
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

    const fetchPermissions = useCallback(async () => {
        setIsLoadingPage(true);
        try {
            const { data } = await getList({ page, limit, search });
            setTotalPages(data.totalPages);
            setPermissions(data.permissions ?? []);
            if (page > data.totalPages && data.totalPages > 0) {
                setPage(data.totalPages);
                updateParams("page", data.totalPages);
            }
        } catch (error) {
            handleApiError(error as ApiErrorProps)
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
        fetchPermissions();
    }, [page, limit, search, fetchPermissions]);

    const handleCreate = useCallback(async (body: CreatePermission) => {
        setIsLoading(true);
        try {
            const { data } = await create(body);
            fetchPermissions();
            setCreateModal(false);
            setValidOrInvalid({});
            showToast("success", data.message || "Permission created successfully");
        } catch (error) {
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
        } finally {
            setIsLoading(false);
        }
    }, [fetchPermissions]);

    const handleEdit = useCallback(async (body: CreatePermission) => {
        if (!editPermission) return;
        setIsLoading(true);
        try {
            const { data } = await update(editPermission.id, body);
            fetchPermissions();
            setEditPermission(null);
            setEditModal(false);
            setValidOrInvalid({});
            showToast(data.changed ? "success" : "info", data.message || "Permission updated successfully");
        } catch (error) {
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
        } finally {
            setIsLoading(false);
        }
    }, [editPermission, fetchPermissions]);

    const confirmDelete = useCallback(async () => {
        if (!checked.length) return;
        try {
            const { data } = await deleteMultiple(checked);
            fetchPermissions();
            setChecked([]);
            setDeleteModal(false);
            updateParams("page", 1);
            showToast("success", data.message || "Permission deleted successfully");
        } catch (error) {
            handleApiError(error as ApiErrorProps)
        }
    }, [checked, fetchPermissions, updateParams]);

    const handleNext = useCallback(() => {
        if (page < totalPages) changeLimitOrPageOrSearch("page", page + 1);
    }, [page, totalPages, changeLimitOrPageOrSearch]);

    const handlePrev = useCallback(() => {
        if (page > 1) changeLimitOrPageOrSearch("page", page - 1);
    }, [page, changeLimitOrPageOrSearch]);

    return {
        page,
        limit,
        permissions,
        search,
        checked,
        isLoading,
        editModal,
        totalPages,
        createModal,
        deleteModal,
        editPermission,
        isLoadingPage,
        validOrInvalid,
        setChecked,
        setEditPermission,
        setEditModal,
        setCreateModal,
        setDeleteModal,
        handleEdit,
        handleCreate,
        confirmDelete,
        handleNext,
        handlePrev,
        changeLimitOrPageOrSearch,
    }
};