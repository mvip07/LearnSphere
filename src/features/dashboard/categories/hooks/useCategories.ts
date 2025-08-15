import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { showToast } from "@/assets/utils/toatify";
import { create, deleteMultiple, getList, update } from "../services/categoryService";
import { ValidationErrors } from "@/types/general.t";
import { UseCategoriesReturn } from "@/types/hook.t";
import { Category, CreateCategory } from "@/types/quiz.t";
import { handleApiError } from "@/services/handleApiError/handleApiError";
import { ApiErrorProps } from "@/types/apiError.t";

export const useCategories = (): UseCategoriesReturn => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [limit, setLimit] = useState(Number(searchParams.get("limit") || 5));
    const [totalPages, setTotalPages] = useState(1);
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);
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

    const fetchCategories = useCallback(async () => {
        setIsLoadingPage(true);
        try {
            const { data } = await getList({ page, limit, search });
            setCategories(data.categories ?? []);
            setTotalPages(data.totalPages);
            if (page > data.totalPages && data.totalPages > 0) {
                setPage(data.totalPages);
                updateParams("page", data.totalPages);
            }
        } catch (error) {
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
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
        fetchCategories();
    }, [page, limit, search, fetchCategories]);

    const handleCreate = useCallback(async (body: CreateCategory) => {
        setIsLoading(true);
        try {
            const { data } = await create(body);
            fetchCategories();
            setCreateModal(false);
            setValidOrInvalid({});
            showToast("success", data.message || "Category created successfully");
            return true
        } catch (error) {
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
            return false
        } finally {
            setIsLoading(false);
        }
    }, [fetchCategories]);

    const handleEdit = useCallback(async (body: CreateCategory) => {
        if (!editCategory) return false;
        setIsLoading(true);
        try {
            const { data } = await update(editCategory.id, body);
            fetchCategories();
            setEditCategory(null);
            setEditModal(false);
            setValidOrInvalid({});
            showToast(data.changed ? "success" : "info", data.message || "Category updated successfully");
            return true
        } catch (error) {
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
            return false
        } finally {
            setIsLoading(false);
        }
    }, [editCategory, fetchCategories]);

    const confirmDelete = useCallback(async () => {
        if (!checked.length) return;
        try {
            const { data } = await deleteMultiple(checked);
            fetchCategories();
            setChecked([]);
            setDeleteModal(false);
            updateParams("page", 1);
            showToast("success", data.message || "Category deleted successfully");
        } catch (error) {
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
        }
    }, [checked, fetchCategories, updateParams]);

    const handleNext = useCallback(() => {
        if (page < totalPages) changeLimitOrPageOrSearch("page", page + 1);
    }, [page, totalPages, changeLimitOrPageOrSearch]);

    const handlePrev = useCallback(() => {
        if (page > 1) changeLimitOrPageOrSearch("page", page - 1);
    }, [page, changeLimitOrPageOrSearch]);

    return {
        page,
        limit,
        categories,
        search,
        checked,
        isLoading,
        editModal,
        totalPages,
        createModal,
        deleteModal,
        editCategory,
        isLoadingPage,
        validOrInvalid,
        setPage,
        setLimit,
        setSearch,
        setChecked,
        setEditCategory,
        setEditModal,
        setCreateModal,
        setDeleteModal,
        handleEdit,
        handleCreate,
        confirmDelete,
        handleNext,
        handlePrev,
        changeLimitOrPageOrSearch,
    };
};