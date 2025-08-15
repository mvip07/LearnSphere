"use client"
import { useEffect, useRef, useState } from "react";

type Quiz = {
    id: number;
    title: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    questions: number;
    time: number;
    isNew: boolean;
    image: string;
    tags: string[];
};

const QuizGallery = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [isVisible, setIsVisible] = useState(false);
    const galleryRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const quizzes: Quiz[] = [
        {
            id: 1,
            title: 'Space Exploration Trivia',
            category: 'Science',
            difficulty: 'Medium',
            questions: 15,
            time: 10,
            isNew: true,
            image: 'bg-gradient-to-br from-purple-500 to-blue-600',
            tags: ['Astronomy', 'NASA', 'Planets']
        },
        {
            id: 2,
            title: 'World Capitals Challenge',
            category: 'Geography',
            difficulty: 'Easy',
            questions: 20,
            time: 15,
            isNew: false,
            image: 'bg-gradient-to-br from-green-500 to-teal-600',
            tags: ['Countries', 'Cities', 'Travel']
        },
        {
            id: 3,
            title: 'Advanced Math Puzzles',
            category: 'Mathematics',
            difficulty: 'Hard',
            questions: 10,
            time: 20,
            isNew: false,
            image: 'bg-gradient-to-br from-yellow-500 to-orange-600',
            tags: ['Algebra', 'Calculus', 'Logic']
        },
        {
            id: 4,
            title: 'Movie Quotes Quiz',
            category: 'Entertainment',
            difficulty: 'Medium',
            questions: 12,
            time: 8,
            isNew: true,
            image: 'bg-gradient-to-br from-red-500 to-pink-600',
            tags: ['Hollywood', 'Actors', 'Classics']
        },
        {
            id: 5,
            title: 'Historical Events Timeline',
            category: 'History',
            difficulty: 'Hard',
            questions: 18,
            time: 25,
            isNew: false,
            image: 'bg-gradient-to-br from-indigo-500 to-purple-600',
            tags: ['World Wars', 'Ancient', 'Leaders']
        },
        {
            id: 6,
            title: 'Biological Discoveries',
            category: 'Science',
            difficulty: 'Medium',
            questions: 14,
            time: 12,
            isNew: false,
            image: 'bg-gradient-to-br from-blue-500 to-cyan-600',
            tags: ['Biology', 'Medicine', 'Evolution']
        }
    ];

    const filteredQuizzes = activeFilter === 'all'
        ? quizzes
        : quizzes.filter(quiz =>
            quiz.category.toLowerCase() === activeFilter ||
            quiz.difficulty.toLowerCase() === activeFilter
        );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const galleryElement = galleryRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (galleryElement) {
            observer.observe(galleryElement);
        }

        return () => {
            if (galleryElement) {
                observer.unobserve(galleryElement);
            }
        };
    }, []);

    const [cardTransform, setCardTransform] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (typeof window === "undefined") return;

        setCardTransform(
            `rotateX(${(mousePosition.y - window.innerHeight / 2) / 40}deg) rotateY(${(mousePosition.x - window.innerWidth / 2) / 40
            }deg)`
        );
    }, [mousePosition]);

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
                    Popular Quizzes
                </h2>
                <p className="text-xl text-center text-gray-600 mb-12">
                    Test your knowledge with these trending challenges
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button onClick={() => setActiveFilter('all')} className={`px-4 py-2 rounded-full transition-all cursor-pointer ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 shadow-sm'}`}>
                        All Quizzes
                    </button>
                    <button onClick={() => setActiveFilter('science')} className={`px-4 py-2 rounded-full transition-all cursor-pointer ${activeFilter === 'science' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 shadow-sm'}`} >
                        Science
                    </button>
                    <button onClick={() => setActiveFilter('geography')} className={`px-4 py-2 rounded-full transition-all cursor-pointer ${activeFilter === 'geography' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 shadow-sm'}`}>
                        Geography
                    </button>
                    <button onClick={() => setActiveFilter('easy')} className={`px-4 py-2 rounded-full transition-all cursor-pointer ${activeFilter === 'easy' ? 'bg-blue-400 text-white' : 'bg-white text-gray-700 shadow-sm'}`} >
                        Easy
                    </button>
                    <button onClick={() => setActiveFilter('hard')} className={`px-4 py-2 rounded-full transition-all cursor-pointer ${activeFilter === 'hard' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 shadow-sm'}`}>
                        Hard
                    </button>
                </div>

                <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
                    {filteredQuizzes.map((quiz, index) => (
                        <div
                            key={quiz.id}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        >
                            <div className="relative h-80 group perspective-1000" style={{ transform: cardTransform }}>
                                <div className={`absolute inset-0 ${quiz.image} flex flex-col justify-between p-6 transition-all duration-700 transform-style-preserve-3d backface-hidden group-hover:rotate-y-180`}>
                                    <div>
                                        {quiz.isNew && (
                                            <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-white bg-pink-500 rounded-full animate-pulse">
                                                NEW
                                            </span>
                                        )}
                                        <h3 className="text-2xl font-bold text-white">{quiz.title}</h3>
                                    </div>
                                    <div className="text-white/90">
                                        <p>{quiz.questions} questions • {quiz.time} min</p>
                                        <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${quiz.difficulty === 'Easy' ? 'bg-green-500' :
                                            quiz.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                                            {quiz.difficulty}
                                        </span>
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-white p-6 flex flex-col justify-between transition-all duration-700 transform-style-preserve-3d backface-hidden rotate-y-180 group-hover:rotate-y-0">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h3>
                                        <p className="text-gray-600 mb-4">{quiz.category} • {quiz.questions} questions</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {quiz.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    style={{ animationDelay: `${i * 0.1 + 0.3}s` }}
                                                    className="inline-block px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-800 rounded-full transition-all duration-300 hover:bg-blue-100 hover:text-blue-800 animate-tag-fadeIn cursor-pointer"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 cursor-pointer">
                                        Start Quiz
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default QuizGallery;