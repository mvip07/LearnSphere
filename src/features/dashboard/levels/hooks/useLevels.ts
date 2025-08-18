import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { create, deleteMultiple, getList, update } from "../services/levelService";
import { showToast } from "@assets/utils/toatify";
import { UseLevelReturn } from "types/hook";
import { CreateLevel, Level } from "types/quiz";
import { ValidationErrors } from "types/general";
import { handleApiError } from "@services/handleApiError/handleApiError";
import { ApiErrorProps } from "types/apiError";

export const useLevels = (): UseLevelReturn => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [levels, setLevels] = useState<Level[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [limit, setLimit] = useState(Number(searchParams.get("limit") || 5));
    const [totalPages, setTotalPages] = useState(1);
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editLevel, setEditLevel] = useState<Level | null>(null);
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

    const fetchLevels = useCallback(async () => {
        setIsLoadingPage(true);
        try {
            const { data } = await getList({ page, limit, search });
            setTotalPages(data.totalPages);
            setLevels(data.levels ?? []);
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
        fetchLevels();
    }, [page, limit, search, fetchLevels]);

    const handleCreate = useCallback(async (body: CreateLevel) => {
        setIsLoading(true);
        try {
            const { data } = await create(body);
            fetchLevels();
            setCreateModal(false);
            setValidOrInvalid({});
            showToast("success", data.message || "Level created successfully");
            return true;
        } catch (error) {
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
            return false
        } finally {
            setIsLoading(false);
        }
    }, [fetchLevels]);

    const handleEdit = useCallback(async (body: CreateLevel) => {
        if (!editLevel) return false;
        setIsLoading(true);
        try {
            const { data } = await update(editLevel.id, body);
            fetchLevels();
            setEditLevel(null);
            setEditModal(false);
            setValidOrInvalid({});
            showToast(data.changed ? "success" : "info", data.message || "Level updated successfully");
            return true
        } catch (error) {
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
            return false
        } finally {
            setIsLoading(false);
        }
    }, [editLevel, fetchLevels]);

    const confirmDelete = useCallback(async () => {
        if (!checked.length) return;
        try {
            const { data } = await deleteMultiple(checked);
            fetchLevels();
            setChecked([]);
            setDeleteModal(false);
            updateParams("page", 1);
            showToast("success", data.message || "Level deleted successfully");
        } catch (error) {
            handleApiError(error as ApiErrorProps)
        }
    }, [checked, fetchLevels, updateParams]);

    const handleNext = useCallback(() => {
        if (page < totalPages) changeLimitOrPageOrSearch("page", page + 1);
    }, [page, totalPages, changeLimitOrPageOrSearch]);

    const handlePrev = useCallback(() => {
        if (page > 1) changeLimitOrPageOrSearch("page", page - 1);
    }, [page, changeLimitOrPageOrSearch]);

    return {
        page,
        limit,
        levels,
        search,
        checked,
        isLoading,
        editModal,
        totalPages,
        createModal,
        deleteModal,
        editLevel,
        isLoadingPage,
        validOrInvalid,
        setChecked,
        setEditLevel,
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