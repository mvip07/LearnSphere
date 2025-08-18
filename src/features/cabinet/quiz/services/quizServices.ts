import API from "@assets/api/index";
import { AnswerResult, CategoriesResponse, LevelsResponse, QuestionsResponse, TopicsResponse } from "src/types/api";

export const getCategories = async (): Promise<CategoriesResponse> => {
    return await API.get("question/categories");
};

export const getLevels = async (): Promise<LevelsResponse> => {
    return await API.get("question/levels");
};

export const getFiltered = async (userId?: string, categoryIds: string[] = [], levelIds: string[] = [], topicIds: string[] = []) => {
    const params = new URLSearchParams();
    if (userId) params.set('userId', userId);
    if (categoryIds.length) params.set('categoryIds', categoryIds.join(','));
    if (levelIds.length) params.set('levelIds', levelIds.join(','));
    if (topicIds.length) params.set('topicIds', topicIds.join(','));
    return await API.get(`question/filtered?${params.toString()}`);
};

export const getQuestionByIds = async (questionIds: string[]): Promise<QuestionsResponse> => {
    return await API.get(`question/by-ids/${questionIds.join(",")}`);
};

export const getTopics = async (categoryIds: string[], levelIds: string[]): Promise<TopicsResponse> => {
    return await API.get(`question/topics/${categoryIds.join(",")}/${levelIds.join(",")}`);
};

export const postAnswers = async (answers: AnswerResult) => {
    return await await API.post("/answers/create", answers);
};
