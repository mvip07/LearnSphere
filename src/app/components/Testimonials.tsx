"use client"
import { useState, useEffect, useRef, useMemo } from 'react';

const TestimonialSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; left: number; top: number }[]>([]);

    const testimonials = useMemo(() => [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Marketing Director",
            content: "This platform transformed how we train our team. The interactive quizzes boosted engagement by 300%!",
            emoji: "🚀",
            color: "bg-blue-500"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Education Specialist",
            content: "As an educator, I appreciate the thoughtful design that makes learning fun and effective for students.",
            emoji: "🧠",
            color: "bg-purple-500"
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            role: "Product Manager",
            content: "Our user retention improved dramatically after implementing these quizzes in our onboarding flow.",
            emoji: "🌟",
            color: "bg-green-500"
        },
        {
            id: 4,
            name: "David Kim",
            role: "CTO",
            content: "The API integration was seamless and our engineering team was impressed with the documentation.",
            emoji: "💻",
            color: "bg-yellow-500"
        }
    ], []);

    useEffect(() => {
        const sectionElement = sectionRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    addFloatingEmojis();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionElement) {
            observer.observe(sectionElement);
        }

        return () => {
            if (sectionElement) {
                observer.unobserve(sectionElement);
            }
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEnd = e.changedTouches[0].clientX;
        const difference = touchStart - touchEnd;

        if (difference > 50) {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        } else if (difference < -50) {
            setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        }
    };

    const addFloatingEmojis = () => {
        const emojis = ["👍", "❤️", "👏", "🎯", "🔥", "💡"];
        const newEmojis = [];

        for (let i = 0; i < 8; i++) {
            newEmojis.push({
                id: Date.now() + i,
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                left: Math.random() * 100,
                top: Math.random() * 100
            });
        }

        setFloatingEmojis(newEmojis);
    };

    const handleCardClick = () => {
        if (typeof window === 'undefined') return;

        if (window.innerWidth < 768) {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }
    };

    return (
        <div ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {floatingEmojis.map((emoji) => (
                <div
                    key={emoji.id}
                    className="absolute text-2xl md:text-3xl opacity-0 animate-float"
                    style={{ left: `${emoji.left}%`, top: `${emoji.top}%`, animationDelay: `${Math.random() * 2}s` }}
                >
                    {emoji.emoji}
                </div>
            ))}

            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
                    What Our Users Say
                </h2>
                <p className="text-xl text-center text-gray-600 mb-12">
                    Don&apos;t just take our word for it
                </p>

                <div className="relative h-96 md:h-80 perspective-1000">
                    {testimonials.map((testimonial, index) => {
                        const position = (index - activeIndex + testimonials.length) % testimonials.length;
                        let transform = '';
                        let opacity = 'opacity-0';
                        let zIndex = 'z-0';

                        if (position === 0) {
                            transform = 'translateZ(0px)';
                            opacity = 'opacity-100';
                            zIndex = 'z-10';
                        } else if (position === 1) {
                            transform = 'translateX(40%) translateZ(-100px)';
                            opacity = 'opacity-70';
                            zIndex = 'z-5';
                        } else if (position === testimonials.length - 1) {
                            transform = 'translateX(-40%) translateZ(-100px)';
                            opacity = 'opacity-70';
                            zIndex = 'z-5';
                        } else {
                            transform = 'translateX(0) translateZ(-200px)';
                            opacity = 'opacity-0';
                        }

                        return (
                            <div
                                key={testimonial.id}
                                style={{ transform }}
                                onClick={handleCardClick}
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                                className={`absolute inset-0 w-full max-w-lg mx-auto transition-all duration-500 transform-style-preserve-3d ${opacity} ${zIndex} ${isVisible ? 'translate-y-0' : 'translate-y-20'}`}
                            >
                                <div className={`absolute inset-0 ${testimonial.color} rounded-xl shadow-2xl p-8 flex flex-col justify-between backface-hidden transition-all duration-300 hover:shadow-xl`}>
                                    <div className="text-white">
                                        <p className="text-5xl mb-4">{testimonial.emoji}</p>
                                        <p className="text-xl md:text-2xl font-medium mb-6">
                                            &quot;{testimonial.content}&quot;
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg">{testimonial.name}</p>
                                        <p className="text-white text-opacity-80">{testimonial.role}</p>
                                    </div>
                                </div>

                                <div className={`absolute inset-0 bg-white rounded-xl shadow-2xl p-8 flex flex-col justify-between backface-hidden rotate-y-180 md:hidden`}>
                                    <div className="text-gray-800">
                                        <p className="text-5xl mb-4 text-center">{testimonial.emoji}</p>
                                        <p className="text-lg text-center text-gray-600">
                                            Tap to see next testimonial
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-900 font-bold">{testimonial.name}</p>
                                        <p className="text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center mt-12 space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === activeIndex ? 'bg-gray-900 w-6' : 'bg-gray-300'}`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }
                .animate-float {
                    animation: float 6s ease-in-out forwards;
                }
            `}</style>
        </div>
    );
};

export default TestimonialSlider;