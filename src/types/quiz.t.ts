export type QuestionType = "multiple-choice" | "input" | "fill-in-the-blank" | "image" | "video" | "audio";

export interface MultilangQuestion {
    en: string;
    uz: string;
    ru: string;
}

export interface Option {
    id?: string;
    text: string;
    isCorrect: boolean;
}

export interface Blank {
    id?: string;
    position: number;
    correctAnswers: string[];
}

export interface Media {
    image?: string | null;
    video?: string | null;
    audio?: string | null;
}

export interface Question {
    id: string;
    question: MultilangQuestion;
    type: QuestionType;
    coins: number;
    time: number;
    category: Category;
    level: Level;
    topic: Topic;
    options?: Option[];
    correctAnswers?: string[];
    blanks?: Blank[];
    media?: Media;
    createdAt: string;
    updatedAt: string;
}

export interface AnswerQuestion extends  Question{
    timestamp: string;
    isCorrect: boolean;
    userAnswers: string[];
}

export interface AnswerUpdate {
    questionId: string;
    value: string | string[] | { index: number; value: string };
}

export interface CreateQuestion {
    time: number;
    coins: number;
    level: string;
    topic: string;
    category: string;
    type: QuestionType;
    question: MultilangQuestion;
    options?: Option[];
    correctAnswers?: string[];
    blanks?: Blank[];
    media?: string | File;
}

export interface Category {
    id: string;
    title: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCategory {
    title: string;
    image: string | File;
}

export interface Level {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateLevel {
    title: string;
}

export interface Topic {
    id: string;
    title: string;
    category: Category;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTopic {
    title: string;
    categoryId: string;
}

export interface Answer {
    quizId: string;
    earnCoins: number;
    totalCoins: number;
    finishedDate: string;
    questions: AnswerQuestion[];
}

export interface Answers {
    questionId: string;
    userAnswers: string[];
    timestamp: string;
}

export interface Result {
    total: number;
    correct: number;
    inCorrect: number;
    totalCoins: number;
    earnedCoins: number;
}

export type ModalStep = "category" | "level" | "topic" | "qnumber" | "testapp";