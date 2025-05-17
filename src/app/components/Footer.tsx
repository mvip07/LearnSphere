"use client";

import { useState, useRef, useEffect } from 'react';

const Footer = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const footerRef = useRef<HTMLDivElement>(null);
    const [stars, setStars] = useState<{ id: number; left: number; top: number; size: number; delay: number }[]>([]);

    useEffect(() => {
        const newStars = [];
        for (let i = 0; i < 15; i++) {
            newStars.push({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
                size: Math.random() * 2 + 1,
                delay: Math.random() * 5
            });
        }
        setStars(newStars);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const calculateRotation = (element: HTMLElement | null) => {
        if (!element || !footerRef.current) return { x: 0, y: 0 };

        const rect = footerRef.current.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const centerX = elementRect.left + elementRect.width / 2 - rect.left;
        const centerY = elementRect.top + elementRect.height / 2 - rect.top;

        const x = (mousePosition.x - rect.left - centerX) / 40;
        const y = -(mousePosition.y - rect.top - centerY) / 40;

        return { x, y };
    };

    const planet1Ref = useRef<HTMLDivElement>(null);
    const planet2Ref = useRef<HTMLDivElement>(null);
    const planet3Ref = useRef<HTMLDivElement>(null);

    return (
        <footer ref={footerRef} className="relative bg-gray-900 text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden" >
            {stars.map(star => (
                <div
                    key={star.id}
                    className="absolute bg-white rounded-full pointer-events-none animate-shooting-star"
                    style={{
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDelay: `${star.delay}s`
                    }}
                />
            ))}

            <div
                ref={planet1Ref}
                className="absolute left-1/4 top-1/4 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg transform-style-preserve-3d transition-transform duration-300"
                style={{ transform: `rotateX(${calculateRotation(planet1Ref.current).x}deg) rotateY(${calculateRotation(planet1Ref.current).y}deg)` }} >
                <div className="absolute inset-0 rounded-full bg-blue-300/20 backface-hidden transform rotate-y-180"></div>
                <div className="absolute inset-2 rounded-full bg-blue-500/30 animate-pulse"></div>
            </div>

            <div
                ref={planet2Ref}
                className="absolute right-1/3 top-1/3 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg transform-style-preserve-3d transition-transform duration-300"
                style={{ transform: `rotateX(${calculateRotation(planet2Ref.current).x}deg) rotateY(${calculateRotation(planet2Ref.current).y}deg)` }}>
                <div className="absolute inset-0 rounded-full bg-purple-300/20 backface-hidden transform rotate-y-180"></div>
            </div>

            <div
                ref={planet3Ref}
                className="absolute left-1/3 bottom-1/4 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg transform-style-preserve-3d transition-transform duration-300"
                style={{ transform: `rotateX(${calculateRotation(planet3Ref.current).x}deg) rotateY(${calculateRotation(planet3Ref.current).y}deg)` }}>
                <div className="absolute inset-0 rounded-full bg-orange-300/20 backface-hidden transform rotate-y-180"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold flex items-center">
                            <span className="mr-2">🌌</span>
                            Quiz Universe
                        </h3>
                        <p className="text-gray-400">
                            Explore the cosmos of knowledge with our interactive quizzes.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Explore</h4>
                        <ul className="space-y-3">
                            {['Home', 'Categories', 'Popular', 'New Releases'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">
                                        {item}
                                        <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full"></span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {['About Us', 'Contact', 'FAQ', 'Privacy Policy'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 relative group">
                                        {item}
                                        <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full"></span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                        <div className="flex space-x-4 relative">
                            {[
                                { icon: '🐦', name: 'Twitter' },
                                { icon: '📘', name: 'Facebook' },
                                { icon: '📸', name: 'Instagram' },
                                { icon: '🎥', name: 'YouTube' }
                            ].map((social) => (
                                <a
                                    href="#"
                                    key={social.name}
                                    className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full text-xl hover:bg-white hover:text-gray-900 transition-all duration-500 hover:transform hover:scale-110 hover:shadow-lg relative group"
                                >
                                    <span>{social.icon}</span>
                                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs transition-opacity duration-300">
                                        {social.name}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Quiz Universe. All rights reserved.
                </div>
            </div>

            <style jsx>{`
                @keyframes shooting-star {
                    0% {
                        transform: translate(0, 0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    100% {
                        transform: translate(100px, -100px);
                        opacity: 0;
                    }
                }
                .animate-shooting-star {
                    animation: shooting-star 5s linear infinite;
                }
                .transform-style-preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
            `}</style>
        </footer>
    );
};

export default Footer;