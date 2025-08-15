"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Empty from "../Empty";
import Loader from "../Loader";
import QuizMenu from "./QuizMenu";
import QuizLayout from "./ChooseQuestion/Layout";
import LevelSection from "./ChooseQuestion/LevelSection";
import TopicSection from "./ChooseQuestion/TopicSection";
import CategorySection from "./ChooseQuestion/CategorySection";
import { QuestionNumberSection } from "./ChooseQuestion/QuestionNumberSection";
import useTranslation from "@/services/languages";
import { useQuizStore } from "@/features/cabinet/quiz/hooks/useQuizStore";
import { useGoToNextPage } from "@/hooks/useGoToNextPage";

const ChooseQuestion = () => {
    const router = useRouter();
    const t = useTranslation();
    const goTo = useGoToNextPage();
    const searchParams = useSearchParams();
    const {
        currentStep,
        setCurrentStep,
        selectedCategories,
        selectedLevels,
        selectedTopics,
        selectedQuestions,
        categories,
        levels,
        topics,
        questions,
        isLoading,
        fetchCategories,
        fetchLevels,
        fetchTopics,
        fetchQuestions,
        toggleCategory,
        toggleLevel,
        toggleTopic,
        toggleQuestion,
        setSelectedCategories,
        setSelectedLevels,
        setSelectedTopics,
    } = useQuizStore();

    useEffect(() => {
        if (currentStep === "category") fetchCategories();
        if (currentStep === "level") fetchLevels();
        if (currentStep === "topic") fetchTopics();
        if (currentStep === "qnumber") fetchQuestions();
    }, [currentStep, fetchCategories, fetchLevels, fetchTopics, fetchQuestions]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const categoryIds = params.get("categoryIds")?.split(",") || [];
        const levelIds = params.get("levelIds")?.split(",") || [];
        const topicIds = params.get("topicIds")?.split(",") || [];

        if (categoryIds.length) {
            setSelectedCategories(categoryIds);
            setCurrentStep("level");
        }
        if (levelIds.length) {
            setSelectedLevels(levelIds);
            setCurrentStep("topic");
        }
        if (topicIds.length) {
            setSelectedTopics(topicIds);
            setCurrentStep("qnumber");
        }
    }, [searchParams, setSelectedCategories, setSelectedLevels, setSelectedTopics, setCurrentStep]);

    const handleBack = (backCabinet?: boolean) => {
        if (backCabinet) {
            useQuizStore.getState().reset();
            goTo("/cabinet");
        }
        if (currentStep === "level") setCurrentStep("category");
        else if (currentStep === "topic") setCurrentStep("level");
        else if (currentStep === "qnumber") setCurrentStep("topic");
    };

    const onSubmit = () => {
        if (currentStep === "category" && selectedCategories.length) {
            setCurrentStep("level");
            router.replace(`?categoryIds=${selectedCategories.join(",")}`);
        } else if (currentStep === "level" && selectedLevels.length) {
            setCurrentStep("topic");
            router.replace(`?categoryIds=${selectedCategories.join(",")}&levelIds=${selectedLevels.join(",")}`);
        } else if (currentStep === "topic" && selectedTopics.length) {
            setCurrentStep("qnumber");
            router.replace(`?categoryIds=${selectedCategories.join(",")}&levelIds=${selectedLevels.join(",")}&topicIds=${selectedTopics.join(",")}`);
        } else if (currentStep === "qnumber" && selectedQuestions.length) {
            router.replace(`/cabinet/quiz?questionIds=${selectedQuestions.join("&questionIds=")}`);
            setCurrentStep("testapp");
        }
    };
 
    if (isLoading) {
        return (
            <div className="w-[60px] h-[60px] relative top-1/2 start-1/2 -translate-y-1/2 -translate-x-1/2">
                <Loader style={{ width: "60px", background: "var(--dark)", padding: "6px" }} />
            </div>
        );
    }

    switch (currentStep) {
        case "category":
            return (
                <QuizLayout hTitle={t("chooseCategory")} arr={selectedCategories} onSubmit={onSubmit} currentStep={currentStep} handleBack={handleBack}>
                    {categories.length ? <CategorySection options={categories} isSelected={selectedCategories} onToggle={toggleCategory} /> : <Empty />}
                </QuizLayout>
            );
        case "level":
            return (
                <QuizLayout hTitle={t("chooseDifficultyLevel")} arr={selectedLevels} onSubmit={onSubmit} currentStep={currentStep} handleBack={handleBack}>
                    {levels.length ? <LevelSection options={levels} isSelected={selectedLevels} onToggle={toggleLevel} /> : <Empty />}
                </QuizLayout>
            );
        case "topic":
            return (
                <QuizLayout hTitle={t("chooseTopic")} arr={selectedTopics} onSubmit={onSubmit} currentStep={currentStep} handleBack={handleBack}>
                    {topics.length ? <TopicSection options={topics} isSelected={selectedTopics} onToggle={toggleTopic} /> : <Empty />}
                </QuizLayout>
            );
        case "qnumber":
            const maxQuestions = questions.length;
            const defaultOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
            const filteredOptions = Array.from(new Set(defaultOptions.filter((opt) => opt <= maxQuestions).concat(maxQuestions)));
            return (
                <QuizLayout hTitle={t("howManyQuestions")} arr={selectedQuestions} onSubmit={onSubmit} currentStep={currentStep} handleBack={handleBack}>
                    {questions.length ? <QuestionNumberSection options={filteredOptions} onToggle={toggleQuestion} /> : <Empty />}
                </QuizLayout>
            );
        case "testapp":
            return <QuizMenu />;
        default:
            return null;
    }
};

export default ChooseQuestion;