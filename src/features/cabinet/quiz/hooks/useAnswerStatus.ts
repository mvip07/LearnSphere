import { useEffect, useState } from "react";
import { useQuizStore } from "@features/cabinet/quiz/hooks/useQuizStore";

export const useAnswerStatus = () => {
    const { count, answers, questions } = useQuizStore();
    const [hasAnswer, setHasAnswer] = useState(false);

    useEffect(() => {
        const currentQuestion = questions[count];
        const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

        if (!currentAnswer) {
            setHasAnswer(false);
            return;
        }

        if (currentQuestion?.blanks?.length) {
            const allBlanksFilled = currentAnswer.userAnswers.length === currentQuestion.blanks.length && currentAnswer.userAnswers.every(ans => ans.trim() !== '');
            setHasAnswer(allBlanksFilled);
        } else {
            setHasAnswer(currentAnswer.userAnswers.length > 0);
        }
    }, [answers, count, questions]);

    return { hasAnswer };
};