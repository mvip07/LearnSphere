import { useQuizStore } from "@/features/cabinet/quiz/hooks/useQuizStore";
import { AnswerUpdate } from "@/types/quiz.t";

export const handleAnswerUpdate = ({ questionId, value }: AnswerUpdate) => {
    useQuizStore.getState().setAnswer(questionId, value);
};