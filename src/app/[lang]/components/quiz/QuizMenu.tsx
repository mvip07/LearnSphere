"use client";
import { memo } from "react";
import FinalModal from "./Test/FinalModal";
import QuizQuestion from "./Test/QuizQuestion";
import { useQuizStore } from "@/features/cabinet/quiz/hooks/useQuizStore";

const QuizMenu = () => {
    const { quizCompleted, score } = useQuizStore();

    return quizCompleted ? (
        <FinalModal totalCoins={score.totalCoins} total={score.total} correctAnswers={score.correctAnswers} />
    ) : (
        <QuizQuestion />
    );
};

export default memo(QuizMenu);