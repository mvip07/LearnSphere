import { Filter, FilterConfig } from "@/types/filter.t";
import { Category } from "@/types/quiz.t";

export const getFilterConfigs = (categories: Category[]): FilterConfig[] => [
    {
        key: "categoryId",
        label: 'Categories',
        options: [{ value: '', label: '--All Categories--' }, ...categories.map((r) => ({ value: r.id, label: r.title }))],
    },
] as const;

export const DEFAULT_FILTER: Filter = {
    categoryId: ''
};