import { memo, useEffect, useRef } from "react";
import CircleProgress from "./Progress";
import { useQuizStore } from "@/features/cabinet/quiz/hooks/useQuizStore";

const QuizTimer = memo(({ questionId }: { questionId: string }) => {
    const { timeLeft, setTimeLeft, questions, count, onTimeUp, answers, setAnswer } = useQuizStore();
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const currentQuestion = questions[count];
    const totalTime = currentQuestion?.time || 0;

    useEffect(() => {
        if (!currentQuestion) return;

        if (timeLeft === 0 || timeLeft > totalTime) {
            setTimeLeft(totalTime);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [questionId, timeLeft, totalTime, currentQuestion, setTimeLeft]);

    useEffect(() => {
        if (!currentQuestion) return;

        if (timeLeft <= 0) {
            const hasAnswer = answers.some(a => a.questionId === currentQuestion.id);
            if (!hasAnswer) {
                setAnswer(currentQuestion.id, '');
            }
            onTimeUp();
            return;
        }

        timerRef.current = setInterval(() => {
            setTimeLeft((prev: number) => prev - 1);
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [timeLeft, currentQuestion, onTimeUp, setTimeLeft, answers, setAnswer]);

    const progress = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;

    return (
        <div className="flex items-center gap-2">
            <CircleProgress size={60} strokeWidth={4} timeLeft={timeLeft} progress={progress} />
        </div>
    );
});

QuizTimer.displayName = "QuizTimer";
export default QuizTimer;