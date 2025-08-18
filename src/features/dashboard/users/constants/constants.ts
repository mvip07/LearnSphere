import { CreateUser } from "src/types/auth";
import { Filter, FilterConfig } from "src/types/filter";
import { Role } from "src/types/role";

export const COLUMNS = [
    { key: 'user', label: 'User', span: 2 },
    { key: 'email', label: 'Email', span: 2 },
    { key: 'block', label: 'Status', span: 1 },
    { key: 'isVerified', label: 'isVerified', span: 1 },
    { key: 'verificationCode', label: 'Verification', span: 1 },
    { key: 'totalCoins', label: 'Coins', span: 1 },
    { key: 'followers', label: 'Followers', span: 1 },
    { key: 'following', label: 'Following', span: 1 },
    { key: 'roles', label: 'Roles', span: 1 },
    { key: 'createdAt', label: 'CreatedAt', span: 1 },
    { key: 'updatedAt', label: 'UpdatedAt', span: 1 },
    { key: 'actions', label: 'Actions', span: 1 },
] as const;

export const DEFAULT_USER: CreateUser = {
    bio: '',
    roles: [],
    email: '',
    image: '',
    block: false,
    lastname: '',
    password: '',
    username: '',
    firstname: '',
    isVerified: false,
    confirmPassword: '',
};

export const FILTER_OPTIONS = {
    block: [
        { value: 'all', label: '-All Block-' },
        { value: 'true', label: 'Blocked' },
        { value: 'false', label: 'Unblocked' },
    ],
    isVerified: [
        { value: 'all', label: '-All Verified-' },
        { value: 'true', label: 'Verified' },
        { value: 'false', label: 'No Verified' },
    ],
    totalCoins: [
        { value: 'all', label: '-All Coins-' },
        { value: 'desc', label: '(High to Low)' },
        { value: 'asc', label: '(Low to High)' },
    ],
    followers: [
        { value: 'all', label: '-All Followers-' },
        { value: 'desc', label: '(High to Low)' },
        { value: 'asc', label: '(Low to High)' },
    ],
    following: [
        { value: 'all', label: '-All Following-' },
        { value: 'desc', label: '(High to Low)' },
        { value: 'asc', label: '(Low to High)' },
    ],
};

export const DEFAULT_FILTER: Filter = {
    block: '',
    roles: '',
    followers: '',
    following: '',
    totalCoins: '',
    isVerified: '',
};

export const getFilterConfigs = (roles: Role[]): FilterConfig[] => [
    { key: 'block', label: 'Block Status', options: FILTER_OPTIONS.block },
    { key: 'isVerified', label: 'Verification Status', options: FILTER_OPTIONS.isVerified },
    { key: 'totalCoins', label: 'Total Coins', options: FILTER_OPTIONS.totalCoins },
    { key: 'followers', label: 'Followers', options: FILTER_OPTIONS.followers },
    { key: 'following', label: 'Following', options: FILTER_OPTIONS.following },
    {
        key: 'roles',
        label: 'Roles',
        options: [{ value: 'all', label: '-All Roles-' }, ...roles.map((r) => ({ value: r.id, label: r.name }))],
    },
] as const;