import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { showToast } from "@/assets/utils/toatify";
import { DEFAULT_FILTER } from "../constants/constants";
import { UseQuestionsReturn } from "@/types/hook.t";
import { ValidationErrors } from "@/types/general.t";
import { Filter, QueryParams } from "@/types/filter.t";
import { Category, CreateQuestion, Level, Question, Topic } from "@/types/quiz.t";
import { create, deleteMultiple, getList, update } from '../services/questionService';
import { handleApiError } from "@/services/handleApiError/handleApiError";
import { ApiErrorProps } from "@/types/apiError.t";

const parseQueryParams = (searchParams: URLSearchParams): QueryParams => ({
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 5,
    search: searchParams.get('search') || '',
    filter: {
        categoryIds: searchParams.getAll('categoryIds').filter(Boolean),
        topicIds: searchParams.getAll('topicIds').filter(Boolean),
        levelIds: searchParams.getAll('levelIds').filter(Boolean),
        type: searchParams.get('type') || '',
    },
});

export const useQuestions = (): UseQuestionsReturn => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState<QueryParams>(parseQueryParams(searchParams));
    const [questions, setQuestions] = useState<Question[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [levels, setLevels] = useState<Level[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editQuestion, setEditQuestion] = useState<Question | null>(null);
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

        params.set('page', String(newQuery.page));
        params.set('limit', String(newQuery.limit));

        if (newQuery.search) {
            params.set('search', newQuery.search);
        } else {
            params.delete('search');
        }

        const filter = newQuery.filter;
        if (filter.categoryIds && filter.categoryIds.length) {
            params.delete('categoryIds');
            filter.categoryIds.forEach(id => params.append('categoryIds', id));
        } else {
            params.delete('categoryIds');
        }

        if (filter.topicIds && filter.topicIds.length) {
            params.delete('topicIds');
            filter.topicIds.forEach(id => params.append('topicIds', id));
        } else {
            params.delete('topicIds');
        }

        if (filter.levelIds && filter.levelIds.length) {
            params.delete('levelIds');
            filter.levelIds.forEach(id => params.append('levelIds', id));
        } else {
            params.delete('levelIds');
        }

        if (filter.type) {
            params.set('type', filter.type);
        } else {
            params.delete('type');
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        setQuery(newQuery);
    }, [pathname, router, searchParams, query]);

    const fetchQuestions = useCallback(async () => {
        setIsLoadingPage(true);
        try {
            const { data } = await getList(queryParams);
            setTopics(data.topics ?? []);
            setLevels(data.levels ?? []);
            setQuestions(data.questions ?? []);
            setCategories(data.categories ?? []);
            setTotalPages(data.totalPages);
            if (query.page > data.totalPages && data.totalPages > 0) {
                updateSearchParams({ page: data.totalPages });
            }
        } catch (error) {
            handleApiError(error as ApiErrorProps)
        } finally {
            setIsLoadingPage(false);
        }
    }, [queryParams, query.page, updateSearchParams]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    const handleCreate = useCallback(async (body: CreateQuestion) => {
        try {
            setIsLoading(true);
            const { data } = await create(body);
            await fetchQuestions();
            setCreateModal(false);
            setValidOrInvalid({});
            showToast('success', data.message || 'Question created successfully');
            return true;
        } catch (error) {
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
            return false
        } finally {
            setIsLoading(false);
        }
    }, [fetchQuestions]);

    const handleEdit = useCallback(async (body: CreateQuestion) => {
        if (!editQuestion) return false;
        setIsLoading(true);
        try {
            const { data } = await update(editQuestion.id, body);
            await fetchQuestions();
            setEditQuestion(null);
            setEditModal(false);
            setValidOrInvalid({});
            showToast(data.changed ? 'success' : 'info', data.message || 'Question updated successfully');
            return true;
        } catch (error) {
            handleApiError(error as ApiErrorProps, setValidOrInvalid)
            return false
        } finally {
            setIsLoading(false);
        }
    }, [editQuestion, fetchQuestions]);

    const handleDelete = useCallback(async () => {
        if (!checked.length) return;
        setIsLoading(true);
        try {
            const { data } = await deleteMultiple(checked);
            await fetchQuestions();
            setChecked([]);
            setDeleteModal(false);
            updateSearchParams({ page: 1 });
            showToast('success', data.message || 'Questions deleted successfully');
        } catch (error) {
            handleApiError(error as ApiErrorProps)
        } finally {
            setIsLoading(false);
        }
    }, [checked, fetchQuestions, updateSearchParams]);

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

    const updateFilterParam = useCallback((key: keyof Filter, value: string | string[]) => {
        updateSearchParams({
            page: 1,
            filter: {
                ...query.filter ?? DEFAULT_FILTER,
                [key]: Array.isArray(value) ? value : [value].filter(Boolean)
            }
        });
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
        topics,
        levels,
        questions,
        categories,
        isLoading,
        isLoadingPage,
        totalPages,
        createModal,
        editModal,
        deleteModal,
        editQuestion,
        checked,
        validOrInvalid,
        setValidOrInvalid,
        setChecked,
        setEditQuestion,
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