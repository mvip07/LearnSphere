import { useQuizStore } from "@features/cabinet/quiz/hooks/useQuizStore";
import { AnswerUpdate } from "src/types/quiz";

export const handleAnswerUpdate = ({ questionId, value }: AnswerUpdate) => {
    useQuizStore.getState().setAnswer(questionId, value);
};