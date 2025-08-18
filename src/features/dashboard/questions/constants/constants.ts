import { Filter, FilterConfig } from "types/filter";
import { Category, CreateQuestion, Level, Topic } from "types/quiz";

export const QUESTION_TYPES = {
    ALL: ['multiple-choice', 'input', 'fill-in-the-blank', 'image', 'video', 'audio'],
    MEDIA: ['image', 'video', 'audio'],
};

export const FORM_FIELDS = {
    labelClass: 'block text-[var(--dark)] text-[16px] dark:text-[var(--whi)] leading-normal font-medium capitalize cursor-pointer',
    inputClass: 'input w-full outline-0 !py-2 mt-2',
};

export const DEFAULT_FILTER: Filter = {
    categoryIds: [],
    levelIds: [],
    topicIds: [],
    type: '',
};

export const getFilterConfigs = (categories: Category[], levels: Level[], topics: Topic[], type: string[]): FilterConfig[] => [
    {
        key: 'categoryIds',
        label: 'Category',
        options: [{ value: '', label: '--All Categories--' }, ...categories.map((r) => ({ value: r.id, label: r.title }))],
    },
    {
        key: 'levelIds',
        label: 'Level',
        options: [{ value: '', label: '--All Levels--' }, ...levels.map((r) => ({ value: r.id, label: r.title }))],
    },
    {
        key: 'topicIds',
        label: 'Topic',
        options: [{ value: '', label: '--All Topics--' }, ...topics.map((r) => ({ value: r.id, label: r.title }))],
    },
    {
        key: 'type',
        label: 'Question Type',
        options: [{ value: '', label: '--All Types--' }, ...type.map((t) => ({ value: t, label: t.replace(/-/g, ' ') }))],
    },
];

export const DEFAULT_QUESTION: CreateQuestion = {
    question: { ru: '', en: '', uz: '' },
    type: 'multiple-choice',
    time: 5,
    coins: 1,
    category: '',
    level: '',
    topic: '',
    options: [],
    correctAnswers: [''],
    blanks: [],
    media: '',
};
