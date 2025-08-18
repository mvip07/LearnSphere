import React from "react";
import { IconType } from "react-icons/lib";
import { Language, ValidationErrors } from "./general";
import { User, CreateUser, Follower, Following } from "./auth";
import { Filter, ProfileRankingState, SortByState } from "./filter";
import { Permission, Role, CreatePermission, CreateRole, EditPermission } from "./role";
import { CreateCategory, CreateLevel, CreateQuestion, CreateTopic, Answer, Answers, Category, Level, Question, Topic, ModalStep, AnswerQuestion } from "./quiz";

export interface FollowSectionProps {
    followers: Follower[];
    following: Following[];
}

export interface QuizDetailsProps {
    answer: Answer;
    lang: Language;
    questions: AnswerQuestion[];
    onClose: () => void;
}

export interface LanguageDropdownProps {
    open: boolean;
    place?: string;
    selectedLang: Language;
    setOpen: (open: boolean) => void;
    changeLanguage: (lang: Language) => void;
}

export interface UserDropdownProps {
    open2: boolean;
    logout: () => void;
    setOpen2: (open: boolean) => void;
    user: Pick<User, "id" | "firstname" | "lastname" | "username" | "image">;
}

export interface CategoryProps {
    options: Category[];
    isSelected: string[];
    onToggle: (id: string) => void;
}

export interface LevelProps {
    options: Level[];
    isSelected: string[];
    onToggle: (id: string) => void;
}

export interface TopicProps {
    options: Topic[];
    isSelected: string[];
    onToggle: (id: string) => void;
}

export interface QuestionNumberProps {
    options: number[];
    onToggle: (id: string) => void;
}

export interface QuizLayoutPorps {
    arr: string[];
    hTitle: string;
    currentStep: ModalStep;
    children: React.ReactNode;
    onSubmit: () => void;
    handleBack: (backCabinet?: boolean) => void;
}

export interface FinalModalProps {
    total: number;
    totalCoins: number;
    correctAnswers: number;
}

export interface CircleProgressProps {
    size?: number;
    timeLeft: number;
    progress: number;
    strokeWidth?: number;
}

export interface FillInTheBlankProps {
    question: Question;
}

export interface InputProps {
    question: Question;
}

export interface MultipleChoiceProps {
    answers: Answers[];
    question: Question;
}

export interface CategoryModalProps {
    title: string;
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    validOrInvalid: ValidationErrors;
    initialData?: CreateCategory | null;
    onSubmit: (data: CreateCategory) => Promise<boolean>;
}

export interface CategoryTableProps {
    checked: string[];
    categories: Category[];
    onDelete: (ids: string[]) => void;
    onEdit: (category: Category) => void;
    setChecked: (checked: string[]) => void;
}

export interface LevelModalProps {
    title: string;
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    validOrInvalid: ValidationErrors;
    initialData?: CreateLevel | null;
    onSubmit: (data: CreateLevel) => Promise<boolean>;
}

export interface LevelTableProps {
    checked: string[];
    levels: Level[];
    validOrInvalid: ValidationErrors;
    onDelete: (ids: string[]) => void;
    onEdit: (level: Level) => void;
    setChecked: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface TopicModalProps {
    title: string;
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    categories: Category[];
    initialData?: Topic | null;
    validOrInvalid: ValidationErrors;
    onSubmit: (data: CreateTopic) => Promise<boolean>;
}

export interface TopicSortedProps {
    filter: Filter,
    categories: Category[],
    updateFilterParam: (key: keyof Filter, value: string) => void;
}

export interface TopicTableProps {
    topics: Topic[];
    checked: string[];
    onEdit: (topic: Topic) => void;
    onDelete: (ids: string[]) => void;
    setChecked: (checked: string[]) => void;
}

export interface QuestionModalProps {
    title: string;
    isOpen: boolean;
    isLoading: boolean;
    levels: Level[];
    topics: Topic[];
    categories: Category[];
    initialData?: Question | null;
    validOrInvalid: ValidationErrors;
    onClose: () => void;
    onSubmit: (data: CreateQuestion) => Promise<boolean>;
}

export interface QuestionTableProps {
    checked: string[];
    questions: Question[];
    setChecked: React.Dispatch<React.SetStateAction<string[]>>;
    onDelete: (ids: string[]) => void;
    onEdit: (question: Question) => void;
}

export interface QuestionSortedProps {
    filter: Filter;
    topics: Topic[];
    levels: Level[];
    categories: Category[];
    type: string[];
    updateFilterParam: (key: keyof Filter, value: string | string[]) => void;
}

export interface PermissionModalProps {
    title: string;
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    validOrInvalid: ValidationErrors;
    initialData?: CreatePermission | null;
    onSubmit: (data: CreatePermission) => void;
}

export interface PermissionTableProps {
    checked: string[];
    permissions: Permission[];
    onDelete: (ids: string[]) => void;
    onEdit: (permission: Permission) => void;
    validOrInvalid: ValidationErrors;
    setChecked: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface RoleModalProps {
    title: string;
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    permissions: Permission[];
    initialData?: Role | null;
    validOrInvalid: ValidationErrors;
    onSubmit: (data: CreateRole) => Promise<boolean>;
}

export interface RoleTableProps {
    roles: Role[];
    checked: string[];
    isLoading: boolean;
    permissions: Permission[];
    permissionChecked: string[];
    validOrInvalid: ValidationErrors;
    onEdit: (role: Role) => void;
    onDelete: (ids: string[]) => void;
    handlePermissionEdit: (data: EditPermission) => void;
    setChecked: React.Dispatch<React.SetStateAction<string[]>>;
    setPermissionChecked: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface PermissionDropdownProps {
    role: { id: string };
    isLoading: boolean;
    onClose: () => void;
    permissions: Permission[];
    permissionChecked: string[];
    validOrInvalid: ValidationErrors;
    handlePermissionEdit: (data: EditPermission) => void;
    setPermissionChecked: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface UserModalProps {
    title: string;
    roles: Role[];
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    initialData?: User | null;
    onSubmit: (data: CreateUser) => Promise<boolean>;
    validOrInvalid: Partial<Record<keyof CreateUser, string[]>>;
}

export interface UserTableProps {
    users: User[];
    checked: string[];
    onEdit: (user: User) => void;
    onDelete: (ids: string[]) => void;
    setChecked: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface SideBarProps {
    id: number;
    url: string;
    icon: IconType;
    titleKey: string;
    disabled: boolean;
}

export interface StyleProps {
    width: string;
    padding: string;
    background: string;
}

export interface DeleteModalProps {
    text: string;
    title: string;
    setCancel: React.Dispatch<React.SetStateAction<boolean>>;
    setDelete: () => void;
}

export interface TablePaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export interface TableHeaderProps2 {
    sortBy: SortByState;
    handleSortByChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

export interface TableHeaderProps {
    limit: number;
    search: string;
    btnTitle: string
    onAddClick: () => void;
    onLimitChange: (type: "page" | "limit" | "search", value: number | string) => void;
}

export interface UserListProps {
    index: number;
    sortBy: string;
    page: number;
    user: ProfileRankingState;
}

export interface NotFoundPageProps {
    title: string;
}

export interface TableFooterProps {
    page: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
}

export interface UserSortedProps {
    filter: Filter,
    roles: Role[],
    updateFilterParam: (key: keyof Filter, value: string) => void
}