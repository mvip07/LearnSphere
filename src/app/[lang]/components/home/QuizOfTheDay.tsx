"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

type Dot = {
    width: number;
    height: number;
    left: number;
    top: number;
    opacity: number;
    speed: number;
};

const QuizOfTheDay = () => {
    const [rotateX, setRotateX] = useState(20);
    const [rotateY, setRotateY] = useState(-20);
    const [isHovered, setIsHovered] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [dots, setDots] = useState<Dot[]>([]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        setRotateY((x - centerX) / 10);
        setRotateX((centerY - y) / 10);
    };

    const handleMouseLeave = () => {
        setRotateX(20);
        setRotateY(-20);
        setIsHovered(false);
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const quizFaces = [
        {
            title: "Quiz of the Day",
            content: "Space Exploration",
            icon: "🚀",
            bg: "bg-purple-600",
        },
        {
            title: "Time Limit",
            content: "15 Minutes",
            icon: "⏱️",
            bg: "bg-blue-600",
        },
        {
            title: "Difficulty",
            content: "Advanced",
            icon: "🧠",
            bg: "bg-green-600",
        },
        {
            title: "Questions",
            content: "20",
            icon: "❓",
            bg: "bg-yellow-600",
        },
        {
            title: "Category",
            content: "Science",
            icon: "🔬",
            bg: "bg-red-600",
        },
        {
            title: "Rewards",
            content: "500 XP",
            icon: "🏆",
            bg: "bg-indigo-600",
        },
    ];

    useEffect(() => {
        const generatedDots = [...Array(100)].map(() => ({
            width: Math.floor(Math.random() * 3),
            height: Math.floor(Math.random() * 3),
            left: Math.floor(Math.random() * 100),
            top: Math.floor(Math.random() * 100),
            opacity: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.5,
        }));
        setDots(generatedDots);
    }, []);

    return (
        <div className="relative min-h-[600px] overflow-hidden bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 overflow-hidden">
                {dots.map((dot) => (
                    <div
                        key={Math.random()}
                        className="absolute rounded-full bg-white"
                        style={{
                            top: `${dot.top}%`,
                            left: `${dot.left}%`,
                            opacity: dot.opacity,
                            width: `${dot.width}px`,
                            height: `${dot.height}px`,
                            transform: `translateY(${scrollY * dot.speed}px)`,
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 z-10">
                <div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() => setIsHovered(true)}
                    className="w-64 h-64 sm:w-80 sm:h-80 perspective-1000 cursor-pointer"
                >
                    <div style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, }} className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700 ease-out">
                        <div style={{ transform: 'translateZ(100px)' }} className={`absolute inset-0 ${quizFaces[0].bg} rounded-lg shadow-xl flex flex-col items-center justify-center p-6 backface-hidden`}>
                            <span className="text-4xl mb-4">{quizFaces[0].icon}</span>
                            <h3 className="text-2xl font-bold text-white text-center">{quizFaces[0].title}</h3>
                            <p className="text-xl text-white mt-2">{quizFaces[0].content}</p>
                        </div>

                        <div
                            style={{ transform: 'rotateY(90deg) translateZ(100px)' }}
                            className={`absolute inset-0 ${quizFaces[1].bg} rounded-lg shadow-xl flex flex-col items-center justify-center p-6 backface-hidden`}
                        >
                            <span className="text-4xl mb-4">{quizFaces[1].icon}</span>
                            <h3 className="text-2xl font-bold text-white text-center">{quizFaces[1].title}</h3>
                            <p className="text-xl text-white mt-2">{quizFaces[1].content}</p>
                        </div>

                        <div
                            style={{ transform: 'rotateY(180deg) translateZ(100px)' }}
                            className={`absolute inset-0 ${quizFaces[2].bg} rounded-lg shadow-xl flex flex-col items-center justify-center p-6 backface-hidden`}
                        >
                            <span className="text-4xl mb-4">{quizFaces[2].icon}</span>
                            <h3 className="text-2xl font-bold text-white text-center">{quizFaces[2].title}</h3>
                            <p className="text-xl text-white mt-2">{quizFaces[2].content}</p>
                        </div>

                        <div
                            style={{ transform: 'rotateY(-90deg) translateZ(100px)' }}
                            className={`absolute inset-0 ${quizFaces[3].bg} rounded-lg shadow-xl flex flex-col items-center justify-center p-6 backface-hidden`}
                        >
                            <span className="text-4xl mb-4">{quizFaces[3].icon}</span>
                            <h3 className="text-2xl font-bold text-white text-center">{quizFaces[3].title}</h3>
                            <p className="text-xl text-white mt-2">{quizFaces[3].content}</p>
                        </div>

                        <div
                            style={{ transform: 'rotateX(90deg) translateZ(100px)' }}
                            className={`absolute inset-0 ${quizFaces[4].bg} rounded-lg shadow-xl flex flex-col items-center justify-center p-6 backface-hidden`}
                        >
                            <span className="text-4xl mb-4">{quizFaces[4].icon}</span>
                            <h3 className="text-2xl font-bold text-white text-center">{quizFaces[4].title}</h3>
                            <p className="text-xl text-white mt-2">{quizFaces[4].content}</p>
                        </div>

                        <div
                            style={{ transform: 'rotateX(-90deg) translateZ(100px)' }}
                            className={`absolute inset-0 ${quizFaces[5].bg} rounded-lg shadow-xl flex flex-col items-center justify-center p-6 backface-hidden`}
                        >
                            <span className="text-4xl mb-4">{quizFaces[5].icon}</span>
                            <h3 className="text-2xl font-bold text-white text-center">{quizFaces[5].title}</h3>
                            <p className="text-xl text-white mt-2">{quizFaces[5].content}</p>
                        </div>
                    </div>
                </div>

                <div className={`max-w-md transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} lg:opacity-100 lg:translate-y-0`}>
                    <h2 className="text-4xl font-bold text-white mb-4">Today&apos;s Special Challenge</h2>
                    <p className="text-xl text-gray-300 mb-6">
                        Test your knowledge about space exploration with our advanced quiz featuring 20 questions in just 15 minutes.
                    </p>

                    <button className="relative px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg text-white font-bold text-xl overflow-hidden group cursor-pointer">
                        <Link href="/cabinet/quiz" className="relative z-10">Play Now</Link>
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-0 transition-opacity duration-300"></span>
                        <span className="absolute -inset-2 bg-blue-400 blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-500"></span>
                    </button>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-gray-800 bg-opacity-50 rounded-full text-white cursor-pointer">🚀 Space</span>
                        <span className="px-4 py-2 bg-gray-800 bg-opacity-50 rounded-full text-white cursor-pointer">⏱️ 15 min</span>
                        <span className="px-4 py-2 bg-gray-800 bg-opacity-50 rounded-full text-white cursor-pointer">🧠 Advanced</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizOfTheDay;