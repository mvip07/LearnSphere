export interface Filter {
    categoryIds?: string[];
    topicIds?: string[];
    levelIds?: string[];
    type?: string;
    block?: string;
    roles?: string;
    followers?: string;
    following?: string;
    totalCoins?: string;
    isVerified?: string;
    categoryId?: string;
}

export interface QueryParams {
    page: number;
    limit: number;
    search: string;
    filter?: Filter;
}

export interface FilterConfig {
    key: keyof Filter;
    label: string;
    options: readonly { value: string; label: string }[];
}

export interface SortByState {
    page: number;
    limit: number;
    search: string;
    sortBy: string;
}

export interface ProfileRankingState {
    id: string;
    bio: string;
    image: string;
    email: string;
    lastname: string;
    username: string;
    follower: number;
    following: number;
    firstname: string;
    totalCoins: number;
}