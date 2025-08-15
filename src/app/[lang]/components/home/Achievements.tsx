// app/achievements/page.tsx
"use client";

import { useState, useEffect, useRef } from 'react';

type Badge = {
    id: number;
    icon: string;
    title: string;
    date?: string;
    unlocked: boolean;
    progress?: number;
    description: string;
    category: 'daily' | 'weekly' | 'challenge';
};

const Achievements = () => {
    const [filter, setFilter] = useState<'all' | 'daily' | 'weekly' | 'challenge'>('all');
    const [visibleBadges, setVisibleBadges] = useState<number[]>([]);
    const sectionRef = useRef<HTMLDivElement>(null);

    const badges: Badge[] = [
        {
            id: 1,
            title: "Early Bird",
            description: "Complete a quiz before 8 AM",
            icon: "🌅",
            category: "daily",
            unlocked: true,
            date: "2023-05-15"
        },
        {
            id: 2,
            title: "Streak Starter",
            description: "Complete quizzes for 3 consecutive days",
            icon: "🔥",
            category: "weekly",
            unlocked: true,
            date: "2023-06-02"
        },
        {
            id: 3,
            title: "Master Explorer",
            description: "Attempt quizzes in 5 different categories",
            icon: "🧭",
            category: "challenge",
            unlocked: false,
            progress: 3
        },
        {
            id: 4,
            title: "Perfect Score",
            description: "Score 100% on any quiz",
            icon: "💯",
            category: "daily",
            unlocked: false
        },
        {
            id: 5,
            title: "Weekend Warrior",
            description: "Complete quizzes on both weekend days",
            icon: "🏆",
            category: "weekly",
            unlocked: true,
            date: "2023-06-11"
        },
        {
            id: 6,
            title: "Speed Demon",
            description: "Complete a quiz in half the allotted time",
            icon: "⚡",
            category: "challenge",
            unlocked: true,
            date: "2023-06-18"
        },
        {
            id: 7,
            title: "Scholar",
            description: "Score 90%+ on 10 quizzes",
            icon: "🎓",
            category: "challenge",
            unlocked: false,
            progress: 3
        },
        {
            id: 8,
            title: "Daily Grind",
            description: "Complete a quiz every day for a week",
            icon: "🔄",
            category: "weekly",
            unlocked: false
        }
    ];

    const filteredBadges = badges.filter(badge =>
        filter === 'all' || badge.category === filter
    );

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const badgeId = parseInt(entry.target.getAttribute('data-badge-id') as string) || 0;
                    setVisibleBadges(prev => [...prev, badgeId]);
                }
            });
        }, { threshold: 0.1 });

        const badgeElements = sectionRef.current?.querySelectorAll('.badge-item');
        badgeElements?.forEach(el => observer.observe(el));

        return () => {
            badgeElements?.forEach(el => observer.unobserve(el));
        };
    }, [filteredBadges]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
                    Your Achievements
                </h2>
                <p className="text-xl text-center text-gray-600 mb-12">
                    Celebrate your learning milestones
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full transition-all cursor-pointer ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 shadow-sm'}`}>
                        All Badges
                    </button>
                    <button onClick={() => setFilter('daily')} className={`px-4 py-2 rounded-full transition-all cursor-pointer ${filter === 'daily' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 shadow-sm'}`}>
                        Daily
                    </button>
                    <button onClick={() => setFilter('weekly')} className={`px-4 py-2 rounded-full transition-all cursor-pointer ${filter === 'weekly' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 shadow-sm'}`} >
                        Weekly
                    </button>
                    <button onClick={() => setFilter('challenge')} className={`px-4 py-2 rounded-full transition-all cursor-pointer ${filter === 'challenge' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 shadow-sm'}`}>
                        Challenges
                    </button>
                </div>

                <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredBadges.map((badge) => (
                        <div
                            key={badge.id}
                            data-badge-id={badge.id}
                            style={{ animationDelay: `${(badge.id % 4) * 0.1}s` }}
                            className={`badge-item relative cursor-pointer ${visibleBadges.includes(badge.id) ? 'animate-scale-in' : 'opacity-0'}`}
                        >
                            <div className={`relative w-full h-64 perspective-1000 group ${badge.unlocked ? '' : 'opacity-60'}`}>
                                <div className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-500 group-hover:rotate-y-180`}>
                                    <div className={`absolute inset-0 ${badge.unlocked ? badge.category === 'daily' ? 'bg-green-100' : badge.category === 'weekly' ? 'bg-purple-100' : 'bg-yellow-100' : 'bg-gray-200'} rounded-xl p-6 flex flex-col items-center justify-center shadow-lg backface-hidden border-4 ${badge.unlocked ? badge.category === 'daily' ? 'border-green-400' : badge.category === 'weekly' ? 'border-purple-400' : 'border-yellow-400' : 'border-gray-300'}`}>
                                        <div className={`text-5xl mb-4 ${badge.unlocked ? '' : 'grayscale'}`}>
                                            {badge.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
                                            {badge.title}
                                        </h3>
                                        <p className="text-sm text-center text-gray-600 mb-4">
                                            {badge.description}
                                        </p>

                                        {badge.unlocked ? (
                                            <div className="text-xs text-green-700 font-medium">
                                                Unlocked on {badge.date}
                                            </div>
                                        ) : (
                                            <div className="w-full bg-gray-300 rounded-full h-2.5">
                                                <div
                                                    className={`h-2.5 rounded-full ${badge.progress ? 'bg-blue-600' : 'bg-gray-400'}`}
                                                    style={{ width: `${badge.progress ? Math.max((badge.progress / (badge.title.includes('10') ? 10 : 5)) * 100, 100) : 0}%` }}
                                                ></div>
                                            </div>
                                        )}
                                    </div>

                                    <div className={`absolute inset-0 ${badge.unlocked ? badge.category === 'daily' ? 'bg-green-50' : badge.category === 'weekly' ? 'bg-purple-50' : 'bg-yellow-50' : 'bg-gray-100'} rounded-xl p-6 flex flex-col items-center justify-center shadow-lg backface-hidden rotate-y-180 border-4 ${badge.unlocked ? badge.category === 'daily' ? 'border-green-400' : badge.category === 'weekly' ? 'border-purple-400' : 'border-yellow-400' : 'border-gray-300'}`}>
                                        <div className="relative">
                                            <div className={`text-5xl mb-4 ${badge.unlocked ? 'animate-spin-slow' : 'grayscale'}`}>
                                                {badge.icon}
                                            </div>
                                            {badge.unlocked && (
                                                <div className="absolute inset-0 overflow-hidden rounded-full">
                                                    <div className="absolute -inset-8 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-shine"></div>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
                                            {badge.unlocked ? 'Achievement Unlocked!' : 'Locked'}
                                        </h3>
                                        <p className="text-sm text-center text-gray-600">
                                            {badge.unlocked ? 'Great job!' : 'Keep going!'}
                                        </p>
                                    </div>
                                </div>

                                {badge.unlocked && (
                                    <div className={`absolute -top-2 -right-2 w-24 overflow-hidden h-24 z-10`}>
                                        <div className={`absolute top-0 left-0 w-32 h-8 ${badge.category === 'daily' ? 'bg-green-500' : badge.category === 'weekly' ? 'bg-purple-500' : 'bg-yellow-500'} transform rotate-45 translate-x-8 -translate-y-2 shadow-md flex items-end justify-center`}>
                                            <span className="text-xs font-bold text-white mb-1">UNLOCKED</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Achievements;