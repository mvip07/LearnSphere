"use client";

import { useState, useRef, useEffect, useMemo } from 'react';

const QuizMaster = () => {
    const [typedText, setTypedText] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const ctaRef = useRef<HTMLDivElement>(null);
    const deviceRef = useRef<HTMLDivElement>(null);

    const messages = useMemo(() => [
        "Create amazing quizzes...",
        "Engage your audience...",
        "Share your knowledge...",
        "Become a Quiz Master!"
    ], []);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        let charIndex = 0;
        let timeout: NodeJS.Timeout;

        const type = () => {
            if (charIndex <= messages[currentMessageIndex].length) {
                setTypedText(messages[currentMessageIndex].substring(0, charIndex));
                charIndex++;
                timeout = setTimeout(type, 100);
            } else {
                timeout = setTimeout(() => {
                    setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
                }, 1500);
            }
        };

        type();

        return () => clearTimeout(timeout);
    }, [currentMessageIndex, messages]);

    useEffect(() => {
        const ctaElement = ctaRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (ctaElement) observer.observe(ctaElement);

        return () => {
            if (ctaElement) observer.unobserve(ctaElement);
        };
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!deviceRef.current) return;

            const rect = deviceRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 20;
            const y = -(e.clientY - rect.top - rect.height / 2) / 20;

            setRotate({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={ctaRef} className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className={`absolute inset-0 bg-white/10 wave-pattern ${isVisible ? 'animate-wave' : ''}`}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    <div
                        ref={deviceRef}
                        className="w-full lg:w-1/2 flex justify-center transition-all duration-500"
                        style={{ transform: isVisible ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1)` : 'rotateX(10deg) rotateY(10deg) scale(0.9)' }}
                    >
                        <div className="relative w-72 h-64 perspective-1000">
                            <div className="absolute bottom-0 w-full h-32 bg-gray-800 rounded-lg shadow-xl transform-style-preserve-3d">
                                <div className="absolute inset-0 bg-gray-700 rounded-lg backface-hidden"></div>
                                <div className="absolute inset-0 bg-gray-900 rounded-lg backface-hidden transform rotate-y-180"></div>
                                <div className="absolute inset-0 border-4 border-gray-600/50 rounded-lg"></div>

                                <div className="absolute bottom-2 left-4 right-4 h-6 bg-gray-900 rounded-sm"></div>
                                <div className="absolute bottom-10 left-4 right-4 h-1 bg-gray-700 rounded-full"></div>
                            </div>

                            <div className="absolute top-0 w-full h-40 bg-gray-200 rounded-t-lg shadow-lg transform-origin-bottom transform rotate-x-20 transform-style-preserve-3d">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg backface-hidden flex items-center justify-center">
                                    <div className="text-5xl animate-pulse">?</div>
                                </div>
                                <div className="absolute inset-0 bg-gray-300 rounded-t-lg backface-hidden transform rotate-y-180"></div>
                                <div className="absolute inset-0 border-4 border-gray-400/30 rounded-t-lg"></div>
                            </div>

                            <div className="absolute top-24 -right-4 w-28 h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transform rotate-12 transform-style-preserve-3d shadow-md">
                                <div className="absolute -right-1 top-1/2 w-2 h-2 bg-gray-800 rounded-full transform -translate-y-1/2"></div>
                                <div className="absolute left-1 top-1/2 w-3 h-3 bg-yellow-600 rounded-full transform -translate-y-1/2"></div>
                            </div>
                        </div>
                    </div>

                    <div className={`w-full lg:w-1/2 space-y-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            <span className="inline-block min-h-[1.5em] border-r-2 border-white animate-blink">
                                {typedText}
                            </span>
                        </h2>

                        <p className="text-xl text-white/90">
                            Join thousands of educators and content creators who are transforming learning with interactive quizzes.
                        </p>

                        <button className={`relative px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-xl shadow-lg overflow-hidden transition-all duration-300 ${isVisible ? 'animate-bounce' : 'opacity-0'} hover:scale-105 hover:shadow-xl`} >
                            <span className="relative z-10">Start Creating Free</span>
                            <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity"></span>
                            <span className="absolute -inset-2 bg-white/30 rounded-lg blur-md opacity-0 hover:opacity-100 transition-opacity"></span>
                        </button>

                        <div className="flex items-center gap-2 text-white/80">
                            <svg className="w-5 h-5 animate-spin-slow-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>No credit card required</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizMaster;