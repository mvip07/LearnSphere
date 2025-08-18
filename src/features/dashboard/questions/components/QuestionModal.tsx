import { AxiosError } from 'axios';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { QUESTION_TYPES, FORM_FIELDS, DEFAULT_QUESTION } from '../constants/constants';
import { showToast } from '@assets/utils/toatify';
import Loader from '@components/Loader';
import { Blanks } from './Blanks';
import { Options } from './Options';
import { MediaSection } from './Media';
import { CorrectAnswers } from './CorrectAnswers';
import { QuestionModalProps } from 'src/types/component';
import { Blank, CreateQuestion, Option, QuestionType } from 'src/types/quiz';

const QuestionModal = React.memo(({ title, topics, levels, categories, isOpen, onClose, onSubmit, isLoading, initialData, validOrInvalid }: QuestionModalProps) => {
    const [formData, setFormData] = useState<CreateQuestion>(DEFAULT_QUESTION);
    const [answerQType, setAnswerQType] = useState<'options' | 'correctAnswers' | 'blanks' | ''>('correctAnswers');

    useEffect(() => {
        if (initialData) {
            const mediaUrl = initialData.media?.image || initialData.media?.video || initialData.media?.audio || '';
            setFormData({
                question: initialData.question,
                level: initialData.level.id,
                category: initialData.category.id,
                topic: initialData.topic.id,
                time: initialData.time,
                coins: initialData.coins,
                type: initialData.type,
                options: initialData.options || [],
                correctAnswers: initialData.correctAnswers || [],
                blanks: initialData.blanks || [],
                media: mediaUrl,
            });
            setAnswerQType(initialData.options?.length ? 'options' : initialData.correctAnswers?.length ? 'correctAnswers' : initialData.blanks?.length ? 'blanks' : '');
        } else {
            setFormData(DEFAULT_QUESTION);
            setAnswerQType('correctAnswers');
        }
    }, [initialData]);

    useEffect(() => {
        if (!initialData) {
            setFormData((prev) => ({
                ...prev,
                options: prev.type === 'multiple-choice' || QUESTION_TYPES.MEDIA.includes(prev.type) ? prev.options ?? [] : [],
                correctAnswers: prev.type === 'input' || QUESTION_TYPES.MEDIA.includes(prev.type) ? prev.correctAnswers ?? [] : [],
                blanks: prev.type === 'fill-in-the-blank' || QUESTION_TYPES.MEDIA.includes(prev.type) ? prev.blanks ?? [] : [],
                media: '',
            }));

            if (QUESTION_TYPES.MEDIA.includes(formData.type)) {
                setAnswerQType((prev) => prev || 'correctAnswers');
            } else {
                setAnswerQType('');
            }
        }
    }, [formData.type, initialData]);

    const handleInputChange = (
        key: keyof CreateQuestion | `question.${'uz' | 'ru' | 'en'}`,
        value: string | number
    ) => {
        if (key.startsWith('question.')) {
            const lang = key.split('.')[1] as 'ru' | 'en' | 'uz';
            setFormData((prev) => ({
                ...prev,
                question: { ...prev.question, [lang]: value }
            }));
        } else if (key === 'type') {
            const typedValue = value as QuestionType; // ✅ cast to correct type
            setFormData((prev) => ({
                ...prev,
                media: '',
                type: typedValue,
                options: ['multiple-choice', 'image', 'video', 'audio'].includes(typedValue)
                    ? prev.options ?? []
                    : [],
                correctAnswers: ['input', 'image', 'video', 'audio'].includes(typedValue)
                    ? prev.correctAnswers ?? []
                    : [],
                blanks: ['fill-in-the-blank', 'image', 'video', 'audio'].includes(typedValue)
                    ? prev.blanks ?? []
                    : []
            }));
            setAnswerQType('');
        } else if (key === 'time' || key === 'coins') {
            setFormData((prev) => ({ ...prev, [key]: Number(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [key as keyof CreateQuestion]: value }));
        }
    };


    const handleSubmit = useCallback(async () => {
        try {
            const payload: CreateQuestion = {
                ...formData,
                options: formData.type === 'multiple-choice' || (QUESTION_TYPES.MEDIA.includes(formData.type) && answerQType === 'options') ? formData.options : [],
                correctAnswers: formData.type === 'input' || (QUESTION_TYPES.MEDIA.includes(formData.type) && answerQType === 'correctAnswers') ? formData.correctAnswers : [],
                blanks: formData.type === 'fill-in-the-blank' || (QUESTION_TYPES.MEDIA.includes(formData.type) && answerQType === 'blanks') ? formData.blanks : [],
                media: initialData && formData.media === (initialData.media?.image || initialData.media?.video || initialData.media?.audio || '') ? '' : formData.media,
            };
            const success = await onSubmit(payload);
            if (success && !initialData) {
                setFormData(DEFAULT_QUESTION);
                setAnswerQType('correctAnswers');
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string, errors?: { [key: string]: string[] } }>;
            showToast('error', err.message || 'Submission failed');
        }
    }, [formData, answerQType, onSubmit, initialData]);

    const answerTypeSection = useMemo(() => {
        if (!QUESTION_TYPES.MEDIA.includes(formData.type)) return null;
        return (
            <div className="form-group my-3">
                <label htmlFor="answer" className={FORM_FIELDS.labelClass}>
                    Answer Type
                </label>
                <select
                    id="answer"
                    value={answerQType}
                    className={`input w-full outline-0 py-2 mt-2 ${validOrInvalid['answer'] ? 'invalid' : ''}`}
                    onChange={(e) => setAnswerQType(e.target.value as 'options' | 'correctAnswers' | 'blanks' | '')}
                >
                    <option value="">--Select Answer Type--</option>
                    <option value="options">Multiple Choice</option>
                    <option value="correctAnswers">Input</option>
                    <option value="blanks">Fill in the Blank</option>
                </select>
                {validOrInvalid['answer']?.map((error, idx) => (
                    <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">{error}</p>
                ))}
            </div>
        );
    }, [formData.type, answerQType, validOrInvalid]);

    const renderAnswerSection = useMemo(() => {
        if (QUESTION_TYPES.MEDIA.includes(formData.type)) {
            switch (answerQType) {
                case 'options':
                    return (
                        <Options
                            questionType={formData.type}
                            validOrInvalid={validOrInvalid}
                            options={formData.options ?? []}
                            setOptions={(value: React.SetStateAction<Option[]>) => setFormData((prev) => ({ ...prev, options: typeof value === 'function' ? value(prev.options ?? []) : value }))}
                        />
                    );
                case 'correctAnswers':
                    return (
                        <CorrectAnswers
                            questionType={formData.type}
                            validOrInvalid={validOrInvalid}
                            correctAnswers={formData.correctAnswers ?? []}
                            setCorrectAnswers={(value: React.SetStateAction<string[]>) => setFormData((prev) => ({ ...prev, correctAnswers: typeof value === 'function' ? value(prev.correctAnswers ?? []) : value }))}
                        />
                    );
                case 'blanks':
                    return (
                        <Blanks
                            questionType={formData.type}
                            blanks={formData.blanks ?? []}
                            validOrInvalid={validOrInvalid}
                            setBlanks={(value: React.SetStateAction<Blank[]>) => setFormData((prev) => ({ ...prev, blanks: typeof value === 'function' ? value(prev.blanks ?? []) : value }))}
                        />
                    );
                default:
                    return null;
            }
        }

        switch (formData.type) {
            case 'fill-in-the-blank':
                return (
                    <Blanks
                        questionType={formData.type}
                        blanks={formData.blanks ?? []}
                        validOrInvalid={validOrInvalid}
                        setBlanks={(value: React.SetStateAction<Blank[]>) => setFormData((prev) => ({ ...prev, blanks: typeof value === 'function' ? value(prev.blanks ?? []) : value }))}
                    />
                );
            case 'input':
                return (
                    <CorrectAnswers
                        questionType={formData.type}
                        validOrInvalid={validOrInvalid}
                        correctAnswers={formData.correctAnswers ?? []}
                        setCorrectAnswers={(value: React.SetStateAction<string[]>) => setFormData((prev) => ({ ...prev, correctAnswers: typeof value === 'function' ? value(prev.correctAnswers ?? []) : value }))}
                    />
                );
            case 'multiple-choice':
                return (
                    <Options
                        questionType={formData.type}
                        validOrInvalid={validOrInvalid}
                        options={formData.options ?? []}
                        setOptions={(value: React.SetStateAction<Option[]>) => setFormData((prev) => ({ ...prev, options: typeof value === 'function' ? value(prev.options ?? []) : value }))}
                    />
                );
            case 'image':
            case 'video':
            case 'audio':
                if (formData?.blanks?.length) {
                    <Blanks
                        questionType={formData.type}
                        blanks={formData.blanks ?? []}
                        validOrInvalid={validOrInvalid}
                        setBlanks={(value: React.SetStateAction<Blank[]>) => setFormData((prev) => ({ ...prev, blanks: typeof value === 'function' ? value(prev.blanks ?? []) : value }))}
                    />
                } else if (formData?.options?.length) {
                    <Options
                        questionType={formData.type}
                        validOrInvalid={validOrInvalid}
                        options={formData.options ?? []}
                        setOptions={(value: React.SetStateAction<Option[]>) => setFormData((prev) => ({ ...prev, options: typeof value === 'function' ? value(prev.options ?? []) : value }))}
                    />
                } else if (formData?.correctAnswers?.length) {
                    <CorrectAnswers
                        questionType={formData.type}
                        validOrInvalid={validOrInvalid}
                        correctAnswers={formData.correctAnswers ?? []}
                        setCorrectAnswers={(value: React.SetStateAction<string[]>) => setFormData((prev) => ({ ...prev, correctAnswers: typeof value === 'function' ? value(prev.correctAnswers ?? []) : value }))}
                    />
                }
            default:
                return null;
        }
    }, [formData.type, answerQType, formData.options, formData.correctAnswers, formData.blanks, validOrInvalid]);

    return (
        <div className={`fixed top-[66px] h-[calc(100dvh-66px)] lg:top-[77px] lg:h-[calc(100dvh-77px)] w-full sm:w-96 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] z-[1000] overflow-y-auto border-t border-s border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] transition-all duration-500 ${isOpen ? 'end-0' : '-end-[1000px]'}`}>
            <div className="sticky top-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] flex items-center justify-between p-4 border-b border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] z-[200]">
                <h3 className="text-[var(--dark)] dark:text-[var(--whi)] text-[18px] font-medium capitalize">{title}</h3>
                <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-[var(--whiLg)] dark:hover:bg-[var(--darkBorderCl)] flex items-center justify-center">
                    <FaXmark className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)]" />
                </button>
            </div>

            <div className="p-4">
                {(['uz', 'ru', 'en'] as const).map((lang) => (
                    <div key={lang} className="mb-4">
                        <label htmlFor={`question.${lang}`} className={FORM_FIELDS.labelClass}>
                            Question Title ({lang.toUpperCase()})
                        </label>
                        <textarea
                            id={`question.${lang}`}
                            placeholder="Enter your Title"
                            value={formData.question[lang]}
                            className={`input w-full outline-0 py-2 mt-2 ${validOrInvalid[`question.${lang}`] ? 'invalid' : ''}`}
                            onChange={(e) => handleInputChange(`question.${lang}` as `question.uz` | `question.ru` | `question.en`, e.target.value)}
                        ></textarea>
                        {validOrInvalid[`question.${lang}`]?.map((error, idx) => (
                            <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">{error}</p>
                        ))}
                    </div>
                ))}

                <div className="mb-4">
                    <label htmlFor="time" className={FORM_FIELDS.labelClass}>
                        Question Time (s)
                    </label>
                    <input
                        id="time"
                        type="number"
                        value={formData.time}
                        placeholder="Enter your Time (s)"
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        className={`input w-full outline-0 py-2 mt-2 ${validOrInvalid['time'] ? 'invalid' : ''}`}
                    />
                    {validOrInvalid['time']?.map((error, idx) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">{error}</p>
                    ))}
                </div>

                <div className="mb-4">
                    <label htmlFor="coins" className={FORM_FIELDS.labelClass}>
                        Question Coins
                    </label>
                    <input
                        id="coins"
                        type="number"
                        value={formData.coins}
                        placeholder="Enter your Coins"
                        onChange={(e) => handleInputChange('coins', e.target.value)}
                        className={`input w-full outline-0 py-2 mt-2 ${validOrInvalid['coins'] ? 'invalid' : ''}`}
                    />
                    {validOrInvalid['coins']?.map((error, idx) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">{error}</p>
                    ))}
                </div>

                <div className="mb-4">
                    <label htmlFor="level" className={FORM_FIELDS.labelClass}>
                        Question Level
                    </label>
                    <select
                        id="level"
                        value={formData.level}
                        onChange={(e) => handleInputChange('level', e.target.value)}
                        className={`input w-full outline-0 py-2 mt-2 ${validOrInvalid['level'] ? 'invalid' : ''}`}
                    >
                        <option value="">--Level--</option>
                        {levels.map((level) => (
                            <option key={level.id} value={level.id}>{level.title}</option>
                        ))}
                    </select>
                    {validOrInvalid['level']?.map((error, idx) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">{error}</p>
                    ))}
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className={FORM_FIELDS.labelClass}>
                        Question Category
                    </label>
                    <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className={`input w-full outline-0 py-2 mt-2 ${validOrInvalid['category'] ? 'invalid' : ''}`}
                    >
                        <option value="">--Category--</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.title}</option>
                        ))}
                    </select>
                    {validOrInvalid['category']?.map((error, idx) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">{error}</p>
                    ))}
                </div>

                <div className="mb-4">
                    <label htmlFor="topic" className={FORM_FIELDS.labelClass}>
                        Question Topic
                    </label>
                    <select
                        id="topic"
                        value={formData.topic}
                        onChange={(e) => handleInputChange('topic', e.target.value)}
                        className={`input w-full outline-0 py-2 mt-2 ${validOrInvalid['topicId'] ? 'invalid' : ''}`}
                    >
                        <option value="">--Topic--</option>
                        {topics.map((topic) => (
                            <option key={topic.id} value={topic.id}>{topic.title}</option>
                        ))}
                    </select>
                    {validOrInvalid['topic']?.map((error, idx) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">{error}</p>
                    ))}
                </div>

                <div className="mb-4">
                    <label htmlFor="type" className={FORM_FIELDS.labelClass}>
                        Question Type
                    </label>
                    <select
                        id="type"
                        value={formData.type}
                        onChange={(e) => handleInputChange('type', e.target.value as QuestionType)}
                        className={`input w-full outline-0 py-2 mt-2 ${validOrInvalid['type'] ? 'invalid' : ''}`}
                    >
                        <option value="">--Question Type--</option>
                        {QUESTION_TYPES.ALL.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    {validOrInvalid['type']?.map((error, idx) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">{error}</p>
                    ))}
                </div>

                <MediaSection
                    formData={formData}
                    setFormData={setFormData}
                    questionType={formData.type}
                    validOrInvalid={validOrInvalid}
                />

                {answerTypeSection}
                {renderAnswerSection}

                {validOrInvalid['correctAnswers']?.map((error, idx) => (
                    <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">{error}</p>
                ))}
                {validOrInvalid['blanks']?.map((error, idx) => (
                    <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">{error}</p>
                ))}
            </div>

            <div className="sticky bottom-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] flex items-center gap-4 p-4 border-t border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                <button
                    disabled={isLoading}
                    onClick={handleSubmit}
                    aria-label="Submit form"
                    className="text-[16px] text-[var(--whi)] bg-[var(--primary)] font-medium capitalize py-2 px-4 rounded disabled:opacity-50"
                >
                    {isLoading ? <Loader style={{ width: '25px', padding: '3px', background: '#fff' }} /> : 'Submit'}
                </button>
                <button
                    onClick={onClose}
                    aria-label="Cancel"
                    className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] bg-[var(--whi)] kids:bg-[var(--darkBoxBg)] font-medium capitalize py-2 px-4 rounded border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
});
QuestionModal.displayName = 'QuestionModal';
export default QuestionModal;