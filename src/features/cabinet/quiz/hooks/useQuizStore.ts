import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { showToast } from "@/assets/utils/toatify";
import { encryptedStorage } from "@/lib/secureStorage";
import { getCategories, getFiltered, getLevels, getQuestionByIds, getTopics, postAnswers } from "@/features/cabinet/quiz/services/quizServices";
import { QuizState } from "@/types/state.t";
import { Question } from "@/types/quiz.t";
import { handleApiError } from "@/services/handleApiError/handleApiError";
import { ApiErrorProps } from "@/types/apiError.t";

const QUIZTEST_STORAGE = process.env.NEXT_PUBLIC_QUIZTEST_STORAGE || "quiz_storage";

export const useQuizStore = create<QuizState>()(
    persist(
        immer((set, get) => ({
            categories: [],
            levels: [],
            topics: [],
            questions: [],
            selectedCategories: [],
            selectedLevels: [],
            selectedTopics: [],
            selectedQuestions: [],
            total: 0,
            questionCount: 5,
            isLoading: false,
            currentStep: "category",
            count: 0,
            timeLeft: 0,
            answers: [],
            quizCompleted: false,
            score: { correctAnswers: 0, totalCoins: 0, total: 0 },
            isNavigating: false,

            reset: () => {
                set((state) => {
                    state.selectedCategories = [];
                    state.selectedLevels = [];
                    state.selectedTopics = [];
                    state.selectedQuestions = [];
                    state.questionCount = 5;
                    state.questions = [];
                    state.currentStep = "category";
                    state.count = 0;
                    state.timeLeft = 0;
                    state.answers = [];
                    state.quizCompleted = false;
                    state.score = { correctAnswers: 0, totalCoins: 0, total: 0 };
                    state.isNavigating = false;
                });
            },

            initializeQuiz: () => {
                const { questions, count, timeLeft } = get();
                if (questions.length > 0 && count < questions.length) {
                    if (timeLeft === 0 || timeLeft > questions[count].time) {
                        set({ timeLeft: questions[count].time });
                    }
                } else {
                    set({ count: 0, timeLeft: 0 });
                }
            },

            fetchCategories: async () => {
                const { categories } = get();
                if (categories.length > 0) return;

                set({ isLoading: true });
                try {
                    const { data } = await getCategories();
                    set({ categories: data.categories });
                } catch {
                    showToast("error", "Failed to load categories");
                } finally {
                    set({ isLoading: false });
                }
            },

            fetchLevels: async () => {
                const { levels } = get();
                if (levels.length > 0) return;

                set({ isLoading: true });
                try {
                    const { data } = await getLevels();
                    set({ levels: data.levels });
                } catch (error) {
                    handleApiError(error as ApiErrorProps)
                } finally {
                    set({ isLoading: false });
                }
            },

            fetchTopics: async () => {
                const { selectedCategories, selectedLevels, isLoading } = get();
                if (!selectedCategories.length || !selectedLevels.length || isLoading) return;

                set({ isLoading: true });
                try {
                    const { data } = await getTopics(selectedCategories, selectedLevels);
                    set({ topics: data.topics, selectedTopics: [] });
                } catch (error) {
                    handleApiError(error as ApiErrorProps)
                } finally {
                    set({ isLoading: false });
                }
            },

            fetchQuestions: async () => {
                if (typeof window === "undefined") return;

                const { selectedCategories, selectedLevels, selectedTopics, isLoading } = get();
                if (!selectedCategories.length || !selectedLevels.length || !selectedTopics.length || isLoading) return;

                set({ isLoading: true });
                try {
                    const userData = JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!) || "{}");
                    const userId = userData?.userId ?? "";
                    const { data } = await getFiltered(userId, selectedCategories, selectedLevels, selectedTopics);
                    set({ questions: data.questions, total: data.total, count: 0, timeLeft: data.questions[0]?.time || 0 });
                } catch (error) {
                    handleApiError(error as ApiErrorProps)
                } finally {
                    set({ isLoading: false });
                }
            },

            fetchQuestionsByIds: async () => {
                const { selectedQuestions, reset } = get();
                set({ isLoading: true });
                try {
                    reset();
                    const { data } = await getQuestionByIds(selectedQuestions);
                    set({ questions: data.questions, count: 0, timeLeft: data.questions[0]?.time || 0 });
                } catch (error) {
                    handleApiError(error as ApiErrorProps)
                } finally {
                    set({ isLoading: false });
                }
            },

            toggleCategory: (id: string) => {
                set((state) => {
                    const exists = state.selectedCategories.includes(id);
                    state.selectedCategories = exists ? state.selectedCategories.filter((i) => i !== id) : [...state.selectedCategories, id];
                });
            },

            toggleLevel: (id: string) => {
                set((state) => {
                    const exists = state.selectedLevels.includes(id);
                    state.selectedLevels = exists ? state.selectedLevels.filter((i) => i !== id) : [...state.selectedLevels, id];
                });
            },

            toggleTopic: (id: string) => {
                set((state) => {
                    const exists = state.selectedTopics.includes(id);
                    state.selectedTopics = exists ? state.selectedTopics.filter((i) => i !== id) : [...state.selectedTopics, id];
                });
            },

            toggleQuestion: (val: string) => {
                set((state) => {
                    state.selectedQuestions = [...state.questions].sort(() => 0.5 - Math.random()).slice(0, Number(val)).map(q => q.id);
                });
            },

            setQuestionCount: (count) => set({ questionCount: count }),
            setCurrentStep: (step) => set({ currentStep: step }),
            setSelectedCategories: (ids: string[]) => set({ selectedCategories: ids }),
            setSelectedLevels: (ids: string[]) => set({ selectedLevels: ids }),
            setSelectedTopics: (ids: string[]) => set({ selectedTopics: ids }),
            setSelectedQuestions: (ids: string[]) => set({ selectedQuestions: ids }),
            setCount: (count: number) => set({ count }),
            setTimeLeft: (time) => {
                if (typeof time === "function") {
                    set((state) => ({ timeLeft: time(state.timeLeft) }));
                } else {
                    set({ timeLeft: time });
                }
            },
            completeQuiz: () => set({ quizCompleted: true }),
            setQuestions: (questions: Question[]) => set({ questions }),
            setScore: (correctAnswers: number, totalCoins: number, total: number) => {
                set((state) => (state.score = { correctAnswers, totalCoins, total }));
            },

            setAnswer: (questionId: string, value: string | string[] | { index: number; value: string }) => {
                set((state) => {
                    const existingIndex = state.answers.findIndex((a) => a.questionId === questionId);
                    const newAnswers = [...state.answers];

                    let userAnswers: string[];

                    const currentQuestion = state.questions[state.count];
                    const hasBlanks = currentQuestion?.id === questionId && currentQuestion?.blanks?.length;

                    if (hasBlanks) {
                        const prevAnswer = existingIndex > -1 ? newAnswers[existingIndex].userAnswers : [];

                        if (typeof value === "object" && !Array.isArray(value) && "index" in value && "value" in value) {
                            const updated = [...prevAnswer];
                            updated[value.index] = value.value;
                            userAnswers = updated;
                        } else if (Array.isArray(value)) {
                            userAnswers = value;
                        } else {
                            userAnswers = [value];
                        }
                    } else {
                        userAnswers = Array.isArray(value) ? value : [value as string];
                    }

                    const newAnswer = {
                        questionId,
                        userAnswers,
                        timestamp: new Date().toISOString(),
                    };

                    if (existingIndex > -1) {
                        newAnswers[existingIndex] = newAnswer;
                    } else {
                        newAnswers.push(newAnswer);
                    }

                    state.answers = newAnswers;
                });
            },

            handleSubmit: async () => {
                if (typeof window === "undefined") return;
                const userData = JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!) || "{}");
                const userId: string = userData.userId ?? "";
                const { answers, questions } = get();

                const allAnswers = questions.map(question => {
                    const existingAnswer = answers.find(a => a.questionId === question.id);
                    return {
                        questionId: question.id,
                        userAnswers: existingAnswer?.userAnswers || [],
                        timestamp: existingAnswer?.timestamp || new Date().toISOString()
                    };
                });

                const newAnswers = {
                    userId,
                    answers: allAnswers,
                };

                try {
                    const { data } = await postAnswers(newAnswers);
                    set({
                        score: {
                            correctAnswers: data.correctAnswers,
                            totalCoins: data.totalCoins,
                            total: data.total,
                        },
                        quizCompleted: true,
                        isNavigating: false
                    });
                } catch (error) {
                    handleApiError(error as ApiErrorProps)
                }
            },

            handleNext: () => {
                const { count, questions } = get();
                if (count < questions.length - 1) {
                    set((state) => {
                        state.count += 1;
                        state.timeLeft = questions[state.count].time;
                        state.isNavigating = false;
                    });
                } else {
                    get().handleSubmit();
                }
            },

            onTimeUp: async () => {
                const { count, questions } = get();
                if (count < questions.length - 1) {
                    set((state) => {
                        state.count += 1;
                        state.timeLeft = questions[state.count].time;
                    });
                } else {
                    await get().handleSubmit();
                }
            },
        })),
        {
            name: QUIZTEST_STORAGE,
            storage: encryptedStorage,
        }
    )
);