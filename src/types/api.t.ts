import { User } from "./auth.t";
import { Permission, Role } from "./role.t";
import { Answers, Category, Level, Question, Topic } from "./quiz.t";

export interface AnswerResult {
    userId: string;
    answers: Answers[];
}

export interface TopicsResponse {
    data: { topics: Topic[]; message: string };
}

export interface CategoriesResponse {
    data: { categories: Category[]; message: string };
}

export interface LevelsResponse {
    data: { levels: Level[]; message: string };
}

export interface QuestionsResponse {
    data: { questions: Question[]; message: string };
}

export interface QuestionData {
    total: number;
    questions: Question[];
}

export interface GetListReq {
    data: {
        totalPages: number;
        levels?: Level[];
        topics?: Topic[];
        questions?: Question[];
        categories?: Category[];
        users?: User[];
        roles?: Role[];
        permissions?: Permission[];
    };
}

export interface CreateReq {
    data: {
        category?: Category;
        level?: Level;
        topic?: Topic;
        question?: Question;
        user?: User;
        role?: Role;
        message: string;
    };
}

export interface UpdateReq {
    data: {
        category?: Category;
        level?: Level;
        topic?: Topic;
        question?: Question;
        user?: User;
        role?: Role;
        message: string;
        changed: boolean;
    };
}

export interface DeleteReq {
    data: { message: string; deletedCount: number };
}