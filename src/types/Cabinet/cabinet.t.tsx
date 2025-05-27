export interface UserDto {
    token: string;
    userId: string;
}

export interface Categories {
    id: string;
    title: string;
    image: string;
}

export interface Question {
    id: string;
    coins: number;
    userId: string;
    isCorrect: boolean;
    questionId: string;
    question: {
        en: string;
        ru: string;
        uz: string;
    };
    category: string;
}

export interface Questions {
    total: number;
    correct: number;
    incorrect: number;
    totalCoins: number;
    earnedCoins: number;
}

export interface User {
    id: string;
    bio?: string;
    email: string;
    image: string;
    firstname: string;
    lastname: string;
    username: string;
    questions: Questions;
    [k: string]: unknown;
}

export interface Follower {
    id: string;
    followerId: string;
    user: {
        id: string;
        image: string;
        firstname: string;
        username: string;
        lastname: string;
    };
}

export interface Following {
    id: string;
    followingId: string;
    user: {
        id: string;
        image: string;
        firstname: string;
        username: string;
        lastname: string;
    };
}

export interface UserFollowData {
    user: User | null;
    answers: Question[];
    follower: Follower[];
    following: Following[];
    categories: Categories[];
}

export interface CabinetContextType extends UserFollowData {
    logout: () => void;
    fetchUser: () => Promise<void>;
}

export interface SocketContextType {
    onlineUsers: string[];
    isConnected: boolean;
}

export type LoaderContextType = {
    showLoader: () => void;
    hideLoader: () => void;
};