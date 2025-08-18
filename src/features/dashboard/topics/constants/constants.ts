import { Filter, FilterConfig } from "src/types/filter";
import { Category } from "src/types/quiz";

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