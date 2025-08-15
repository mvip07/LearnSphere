"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

const QuizCategories = () => {
    const categories = [
        { id: 1, name: 'Science', color: 'bg-blue-500', count: 42 },
        { id: 2, name: 'Mathematics', color: 'bg-purple-500', count: 38 },
        { id: 3, name: 'Logic', color: 'bg-green-500', count: 25 },
        { id: 4, name: 'Geography', color: 'bg-yellow-500', count: 33 },
        { id: 5, name: 'History', color: 'bg-red-500', count: 29 },
        { id: 6, name: 'Literature', color: 'bg-pink-500', count: 21 },
        { id: 7, name: 'Technology', color: 'bg-indigo-500', count: 45 },
        { id: 8, name: 'Art', color: 'bg-teal-500', count: 18 },
    ];

    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('default');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const filteredCategories = categories.filter(category => {
        if (filter === 'all') return true;
        if (filter === 'popular') return category.count > 30;
        return true;
    });

    const sortedCategories = [...filteredCategories].sort((a, b) => {
        if (sort === 'name') return a.name.localeCompare(b.name);
        if (sort === 'count-asc') return a.count - b.count;
        if (sort === 'count-desc') return b.count - a.count;
        return 0;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-white mb-2">Quiz Categories</h1>
                <p className="text-xl text-center text-gray-300 mb-12">Choose your challenge</p>

                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex gap-2">
                        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full transition-all ${filter === 'all' ? 'bg-white text-gray-900' : 'bg-gray-700 text-white'}`} >
                            All
                        </button>
                        <button onClick={() => setFilter('popular')} className={`px-4 py-2 rounded-full transition-all ${filter === 'popular' ? 'bg-white text-gray-900' : 'bg-gray-700 text-white'}`} >
                            Popular
                        </button>
                    </div>

                    <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-gray-700 text-white px-4 py-2 rounded-full">
                        <option value="default">Default</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="count-asc">Questions (Low to High)</option>
                        <option value="count-desc">Questions (High to Low)</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {sortedCategories.map((category) => (
                        <div key={category.id} className="relative group perspective-1000" style={{ '--mouse-x': `${mousePosition.x}px`, '--mouse-y': `${mousePosition.y}px`, } as React.CSSProperties}>
                            <div className="relative w-full h-64 transition-all duration-500 transform-style-preserve-3d group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-[rgba(255,255,255,0.2)]">
                                <div className={`absolute inset-0 ${category.color} rounded-xl p-6 flex flex-col justify-between backface-hidden transition-all duration-500 transform group-hover:rotate-y-180 shadow-md`}>
                                    <div className="text-white">
                                        <h3 className="text-2xl font-bold">{category.name}</h3>
                                        <p className="text-white/80 mt-2">Test your knowledge</p>
                                    </div>
                                    <div className="text-white text-4xl font-bold self-end">
                                        {category.count}
                                    </div>
                                </div>

                                <div className={`absolute inset-0 ${category.color} bg-opacity-90 rounded-xl p-6 flex flex-col justify-center items-center backface-hidden transition-all duration-500 transform rotate-y-180 group-hover:rotate-y-0 shadow-md`}>
                                    <Link href="/cabinet/quiz" className="px-6 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors cursor-pointer">
                                        Start Quiz
                                    </Link>
                                    <p className="text-white mt-4 text-center">Explore {category.count} questions in this category</p>
                                </div>
                            </div>

                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="absolute inset-0 rounded-xl" style={{ background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.3) 0%, transparent 70%)` }}>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuizCategories;