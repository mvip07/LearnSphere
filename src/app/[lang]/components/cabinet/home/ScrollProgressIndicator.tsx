"use client";

import { useState, useEffect } from 'react';

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            const progress = (scrollY / (documentHeight - windowHeight)) * 100;
            setScrollProgress(Math.min(100, Math.max(0, progress)));

            setShowBackToTop(scrollY > windowHeight * 0.25);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        if (isAnimating) return;
        if (typeof window === 'undefined') return;


        setIsAnimating(true);

        const trail = document.createElement('div');
        trail.className = 'fixed bottom-4 right-4 w-14 h-14 bg-white rounded-full opacity-70 animate-shimmer-trail';
        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 1000);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    };

    // const radius = 50;
    // const circumference = 2 * Math.PI * radius;
    // const dashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <>
            {/* <div className="fixed top-1 right-1 w-20 h-20 z-[100000]">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        className="text-gray-300 opacity-50"
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashoffset}
                        strokeLinecap="round"
                        className="text-blue-600 transition-all duration-300"
                    />
                </svg>
                <div className="absolute text-xl inset-0 flex items-center justify-center font-bold text-gray-700">
                    {Math.round(scrollProgress)}%
                </div>
            </div> */}
            <div className="fixed top-0 left-0 h-1 z-[100000] bg-blue-600" style={{ width: `${Math.round(scrollProgress)}%` }}>
            </div>

            <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className={`fixed bottom-4 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-500 z-100 ${showBackToTop ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} ${isAnimating ? 'animate-bounce' : ''}`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                </svg>
            </button>
        </>
    );
};

export default ScrollProgress;