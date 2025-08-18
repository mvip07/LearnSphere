import { Dispatch } from "react";
import { User, Follower, Following } from "./auth";
import { Answer, Result, Category, Level, Topic, ModalStep, Answers, Question } from "./quiz";

export interface UserFollowData {
    user: User | null;
    answers: Answer[];
    topics: Topic[];
    levels: Level[];
    results: Result;
    follower: Follower[];
    following: Following[];
    categories: Category[];
}

export interface CabinetContextType extends UserFollowData {
    logout: () => void;
    fetchUser: () => Promise<void>;
    isSidebarOpen: boolean;
    setIsSidebarOpen: Dispatch<React.SetStateAction<boolean>>

}

export interface SocketContextType {
    onlineUsers: string[];
    isConnected: boolean;
}

export interface LoaderContextType {
    showLoader: () => void;
    hideLoader: () => void;
}

export interface QuizState {
    categories: Category[];
    levels: Level[];
    topics: Topic[];
    questions: Question[];
    selectedCategories: string[];
    selectedLevels: string[];
    selectedTopics: string[];
    selectedQuestions: string[];
    total: number;
    questionCount: number;
    isLoading: boolean;
    currentStep: ModalStep;
    count: number;
    timeLeft: number;
    answers: Answers[];
    quizCompleted: boolean;
    score: { correctAnswers: number; totalCoins: number; total: number };
    isNavigating: boolean;

    fetchCategories: () => Promise<void>;
    fetchLevels: () => Promise<void>;
    fetchTopics: () => Promise<void>;
    fetchQuestions: () => Promise<void>;
    fetchQuestionsByIds: () => Promise<void>;
    toggleCategory: (id: string) => void;
    toggleLevel: (id: string) => void;
    toggleTopic: (id: string) => void;
    toggleQuestion: (val: string) => void;
    setQuestionCount: (count: number) => void;
    setSelectedCategories: (ids: string[]) => void;
    setSelectedLevels: (ids: string[]) => void;
    setSelectedTopics: (ids: string[]) => void;
    setSelectedQuestions: (ids: string[]) => void;
    setCurrentStep: (step: ModalStep) => void;
    setCount: (count: number) => void;
    setTimeLeft: (time: number | ((prev: number) => number)) => void;
    completeQuiz: () => void;
    setQuestions: (questions: Question[]) => void;
    setAnswer: (questionId: string, value: string | string[] | { index: number; value: string }) => void;
    setScore: (correctAnswers: number, totalCoins: number, total: number) => void;
    reset: () => void;
    handleSubmit: () => Promise<void>;
    handleNext: () => void;
    onTimeUp: () => Promise<void>;
    initializeQuiz: () => void;
}