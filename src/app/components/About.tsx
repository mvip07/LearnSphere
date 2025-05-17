"use client";

import { useState, useRef, useEffect } from 'react';

const About = () => {
    const [activeCard, setActiveCard] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);

    const milestones = [
        {
            year: "2015",
            title: "Our Beginning",
            description: "Founded in a small garage with just 3 passionate developers",
            emoji: "🏠",
            color: "bg-blue-500"
        },
        {
            year: "2017",
            title: "First Launch",
            description: "Released our first product to 10,000 active users",
            emoji: "🚀",
            color: "bg-purple-500"
        },
        {
            year: "2019",
            title: "Series A Funding",
            description: "Raised $5M to expand our engineering team",
            emoji: "💰",
            color: "bg-green-500"
        },
        {
            year: "2021",
            title: "Global Reach",
            description: "Expanded to 15 countries with localized content",
            emoji: "🌎",
            color: "bg-yellow-500"
        },
        {
            year: "2023",
            title: "Today & Beyond",
            description: "Serving over 1 million users with AI-powered features",
            emoji: "🤖",
            color: "bg-red-500"
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            if (typeof window === 'undefined') return;

            const { scrollY } = window;
            const { offsetTop, offsetHeight } = sectionRef.current;
            const start = offsetTop - window.innerHeight * 0.3;
            const end = offsetTop + offsetHeight - window.innerHeight * 0.7;

            const progress = Math.min(1, Math.max(0, (scrollY - start) / (end - start)));
            setScrollProgress(progress);

            const cardCount = milestones.length;
            setActiveCard(Math.min(cardCount - 1, Math.floor(progress * cardCount)));

            if (avatarRef.current) {
                const waveAmount = Math.sin(progress * Math.PI * 4) * 15;
                avatarRef.current.style.transform = `rotate(${waveAmount}deg)`;

                const shouldBlink = progress % 0.2 > 0.1;
                const eyes = avatarRef.current.querySelectorAll('.eye');
                eyes.forEach(eye => {
                    (eye as HTMLElement).style.height = shouldBlink ? '2px' : '8px';
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [milestones.length]);

    const parallaxLayers = [
        { speed: 0.1, position: scrollProgress * 100 * 0.1 },
        { speed: 0.3, position: scrollProgress * 100 * 0.3 },
        { speed: 0.6, position: scrollProgress * 100 * 0.6 }
    ];

    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientY);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientY);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            setActiveCard(prev => Math.min(milestones.length - 1, prev + 1));
        } else if (touchEnd - touchStart > 50) {
            setActiveCard(prev => Math.max(0, prev - 1));
        }
    };

    return (
        <section
            ref={sectionRef}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
            className="relative  py-20 md:py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800"
        >
            {parallaxLayers.map((layer, i) => (
                <div
                    key={i}
                    className="absolute inset-0 opacity-10"
                    style={{
                        zIndex: 0,
                        backgroundSize: '40px 40px',
                        transform: `translateY(${layer.position}px)`,
                        backgroundImage: `radial-gradient(circle, white ${i * 0.5}px, transparent ${i * 1}px)`,
                    }}
                />
            ))}

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12 md:mb-16 sticky top-4 md:top-8">
                    Our Story
                    <span ref={avatarRef} className="inline-block ml-2 md:ml-4 text-2xl md:text-4xl transition-transform duration-300">
                        👨‍💻
                        <span className="eye absolute top-2 left-2 md:top-3 md:left-3 w-2 h-1 md:w-3 md:h-2 bg-black rounded-full transform transition-all duration-100"></span>
                        <span className="eye absolute top-2 right-2 md:top-3 md:right-3 w-2 h-1 md:w-3 md:h-2 bg-black rounded-full transform transition-all duration-100"></span>
                    </span>
                </h2>

                <div className="block space-y-6 mb-12">
                    {milestones.map((milestone, index) => (
                        <div key={index} className={`${milestone.color} w-full sm:w-96 mx-auto rounded-xl shadow-2xl p-6 h-48 flex flex-col justify-center items-center text-center text-white transition-all duration-300 ${index === activeCard ? 'scale-105 opacity-100' : 'scale-95 opacity-70'}`}>
                            <div className="text-4xl mb-3">{milestone.emoji}</div>
                            <span className="text-xs font-semibold text-white/80 mb-1">{milestone.year}</span>
                            <h3 className="text-xl font-bold mb-1">{milestone.title}</h3>
                            <p className="text-sm text-white/90">{milestone.description}</p>
                        </div>
                    ))}
                </div>

                <div className="hidden sticky bottom-8 mx-auto w-64 h-2 bg-white/20 rounded-full mt-16">
                    <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: `${scrollProgress * 100}%` }}></div>
                </div>

                <div className=" flex justify-center gap-2 mt-8">
                    {milestones.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCard(index)}
                            aria-label={`Go to milestone ${index + 1}`}
                            className={`w-3 h-3 rounded-full transition-all ${index === activeCard ? 'bg-white w-6' : 'bg-white/30'}`}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .transform-style-preserve-3d {
                    transform-style: preserve-3d;
                }
            `}</style>
        </section>
    );
};

export default About;