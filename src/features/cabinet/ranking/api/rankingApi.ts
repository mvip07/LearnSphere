import API from "@assets/api/index";
import { SortByState } from "src/types/filter";

export const fetchProfileRanking = async (sortBy: SortByState) => {
    const params = new URLSearchParams();
    params.append('page', sortBy.page.toString());
    params.append('limit', sortBy.limit.toString());
    if (sortBy.search) params.append('search', sortBy.search);
    if (sortBy.sortBy) params.append('sortBy', sortBy.sortBy);
    return await API.get(`user/profiles?${params.toString()}`);
};
