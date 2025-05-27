"use client";
import { useState, useRef, useEffect } from 'react';

const Guide = () => {
    const [activeStep, setActiveStep] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

    const steps = [
        {
            title: "Sign Up",
            description: "Create your account in just 30 seconds",
            icon: (
                <svg viewBox="0 0 24 24" className="w-16 h-16">
                    <path
                        fill="currentColor"
                        d="M12,3A4,4 0 0,1 16,7A4,4 0 0,1 12,11A4,4 0 0,1 8,7A4,4 0 0,1 12,3M12,13C16.42,13 20,14.79 20,17V20H4V17C4,14.79 7.58,13 12,13Z"
                        className="animate-morph-1"
                    />
                </svg>
            ),
            color: "bg-blue-500"
        },
        {
            title: "Choose Template",
            description: "Select from our pre-made quiz templates or start blank",
            icon: (
                <svg viewBox="0 0 24 24" className="w-16 h-16">
                    <path
                        fill="currentColor"
                        d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z"
                        className="animate-morph-2"
                    />
                </svg>
            ),
            color: "bg-purple-500"
        },
        {
            title: "Add Questions",
            description: "Create your questions with multiple choice options",
            icon: (
                <svg viewBox="0 0 24 24" className="w-16 h-16">
                    <path
                        fill="currentColor"
                        d="M10,15H14V17H10V15M10,7H14V13H10V7M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19Z"
                        className="animate-morph-3"
                    />
                </svg>
            ),
            color: "bg-green-500"
        },
        {
            title: "Customize Design",
            description: "Personalize colors, fonts, and branding",
            icon: (
                <svg viewBox="0 0 24 24" className="w-16 h-16">
                    <path
                        fill="currentColor"
                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                        className="animate-morph-4"
                    />
                </svg>
            ),
            color: "bg-yellow-500"
        },
        {
            title: "Publish & Share",
            description: "Get a shareable link or embed in your website",
            icon: (
                <svg viewBox="0 0 24 24" className="w-16 h-16">
                    <path
                        fill="currentColor"
                        d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"
                        className="animate-morph-5"
                    />
                </svg>
            ),
            color: "bg-red-500"
        }
    ];

    const scrollToStep = (index: number) => {
        if (containerRef.current && stepsRef.current[index]) {
            const container = containerRef.current;
            const step = stepsRef.current[index];

            const containerWidth = container.clientWidth;
            const stepWidth = step?.clientWidth || 0;
            const stepLeft = step?.offsetLeft || 0;
            const scrollTo = stepLeft - (containerWidth - stepWidth) / 2;

            container.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });

            setActiveStep(index);
        }
    };

    useEffect(() => {
        const container = containerRef.current;

        const handleScroll = () => {
            if (!container) return;

            const containerLeft = container.scrollLeft;
            const containerWidth = container.clientWidth;
            const containerCenter = containerLeft + containerWidth / 2;

            stepsRef.current.forEach((stepEl, index) => {
                if (!stepEl) return;

                const stepLeft = stepEl.offsetLeft;
                const stepWidth = stepEl.clientWidth;
                const stepCenter = stepLeft + stepWidth / 2;

                if (Math.abs(stepCenter - containerCenter) < stepWidth / 2) {
                    setActiveStep(index);
                }
            });
        };

        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
                    How to Create Your Quiz
                </h2>
                <p className="text-xl text-center text-gray-600 mb-12">
                    Follow these simple steps to build engaging quizzes
                </p>

                <div className="relative mb-12">
                    <div className="flex justify-between relative z-10">
                        {steps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToStep(index)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${index <= activeStep ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 border-2 border-gray-300'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 z-0">
                        <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}></div>
                    </div>
                </div>

                <div ref={containerRef} className="relative overflow-x-auto flex pb-12 scroll-smooth" style={{ scrollSnapType: 'x mandatory' }}>
                    <div className="flex gap-8 px-8">
                        {steps.map((step, index) => (
                            <div key={index} ref={el => { if (el) stepsRef.current[index] = el; }} className="flex-shrink-0 w-[300px] snap-center">
                                <div className={`${step.color} rounded-2xl shadow-xl p-8 h-64 flex flex-col items-center justify-center text-white`}>
                                    <div className="text-5xl mb-4">{step.icon}</div>
                                    <h3 className="text-2xl font-bold text-center mb-2">{step.title}</h3>
                                    <p className="text-center">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    <button
                        disabled={activeStep === 0}
                        onClick={() => scrollToStep(Math.max(0, activeStep - 1))}
                        className="p-3 rounded-full bg-white shadow-md disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        disabled={activeStep === steps.length - 1}
                        onClick={() => scrollToStep(Math.min(steps.length - 1, activeStep + 1))}
                        className="p-3 rounded-full bg-white shadow-md disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <style jsx>{`
                
            `}</style>
        </div>
    );
};

export default Guide;