import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchProfileRanking } from "../api/rankingApi";
import { ApiErrorProps } from "@/types/apiError.t";
import { ProfileRankingState, SortByState } from "@/types/filter.t";
import { handleApiError } from "@/services/handleApiError/handleApiError";

export const useProfileRanking = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [profileRanking, setProfileRanking] = useState<ProfileRankingState[]>([]);

    const getInitialState = useCallback(() => {
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '5', 10);
        const search = searchParams.get('search') || '';
        const sortBy = searchParams.get('sortBy') || 'coins';

        return {
            page: isNaN(page) || page < 1 ? 1 : page,
            limit: isNaN(limit) || limit < 1 ? 5 : limit,
            search,
            sortBy,
        };
    }, [searchParams]);

    const [sortBy, setSortBy] = useState<SortByState>(getInitialState);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', sortBy.page.toString());
        params.set('limit', sortBy.limit.toString());
        if (sortBy.search) params.set('search', sortBy.search);
        if (sortBy.sortBy !== 'coins') params.set('sortBy', sortBy.sortBy);

        router.replace(`?${params.toString()}`);
    }, [sortBy, router, searchParams]);

    const getProfileRanking = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await fetchProfileRanking(sortBy);
            setProfileRanking(data.users);
            setTotalPages(data.totalPages);
        } catch (error) {
            handleApiError(error as ApiErrorProps)
        } finally {
            setIsLoading(false);
        }
    }, [sortBy]);

    useEffect(() => {
        const timer = setTimeout(() => {
            getProfileRanking();
        }, 300);

        return () => clearTimeout(timer);
    }, [getProfileRanking]);

    useEffect(() => {
        const newState = getInitialState();
        setSortBy(newState);
    }, [searchParams, getInitialState]);

    const handleSortByChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSortBy(prev => ({ ...prev, [name]: name === "limit" || name === "page" ? Number(value) : value, page: name !== "page" ? 1 : prev.page }));
    }, []);

    const handlePageChange = useCallback((newPage: number) => {
        setSortBy(prev => ({ ...prev, page: newPage }));
    }, []);

    return { sortBy, isLoading, totalPages, profileRanking, handlePageChange, handleSortByChange };
};