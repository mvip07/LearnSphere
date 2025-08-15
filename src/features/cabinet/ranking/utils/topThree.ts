const TOP_THREE_CLASSES = [
    "bg-[var(--firstPlace)]",
    "bg-[var(--secondPlace)]",
    "bg-[var(--thirdPlace)]"
];

const VALID_SORT_TYPES = new Set(["coins", "following"]);

const TopThree = (index: number, sortBy: string, page: number): string => {
    return (VALID_SORT_TYPES.has(sortBy) && page === 1 && index < 3) ? TOP_THREE_CLASSES[index] : "";
};

export default TopThree;