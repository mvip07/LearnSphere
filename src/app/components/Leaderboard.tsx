"use client";

import { useState, useEffect } from 'react';

type Player = {
    id: number;
    name: string;
    score: number;
    avatar: string;
    change: number;
};

const Leaderboard = () => {
    const [players, setPlayers] = useState<Player[]>([
        { id: 1, name: 'Alex Johnson', score: 9850, avatar: 'AJ', change: 0 },
        { id: 2, name: 'Maria Garcia', score: 8720, avatar: 'MG', change: 1 },
        { id: 3, name: 'James Smith', score: 8450, avatar: 'JS', change: -1 },
        { id: 4, name: 'Sarah Williams', score: 7980, avatar: 'SW', change: 2 },
        { id: 5, name: 'David Kim', score: 7650, avatar: 'DK', change: 0 },
        { id: 6, name: 'Emma Davis', score: 7320, avatar: 'ED', change: 3 },
        { id: 7, name: 'Michael Brown', score: 6980, avatar: 'MB', change: -2 },
        { id: 8, name: 'Olivia Wilson', score: 6540, avatar: 'OW', change: 1 },
        { id: 9, name: 'Daniel Miller', score: 6210, avatar: 'DM', change: -1 },
        { id: 10, name: 'Sophia Taylor', score: 5870, avatar: 'ST', change: 0 },
    ]);

    const [visiblePlayers, setVisiblePlayers] = useState<Player[]>([]);

    const getMedalColor = (index: number) => {
        switch (index) {
            case 0: return 'rgba(210,180,50,0.5)';
            case 1: return 'rgba(180,180,180,0.5)';
            case 2: return 'rgba(180,120,50,0.5)';
            default: return 'rgba(180,120,50,0.5)';
        }
    };

    useEffect(() => {
        setVisiblePlayers(players.slice(0, 5));

        const interval = setInterval(() => {
            setPlayers(prev => {
                const updated = [...prev];
                updated.forEach(p => {
                    const change = Math.floor(Math.random() * 100) - 30;
                    p.score = Math.max(0, p.score + change);
                    p.change = change;
                });
                updated.sort((a, b) => b.score - a.score);
                return updated.map((p, i) => ({ ...p, id: i + 1 }));
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setVisiblePlayers(players.slice(0, 5));
    }, [players]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-white mb-2">Live Leaderboard</h1>
                <p className="text-xl text-center text-gray-300 mb-12">Top performers this week</p>
                <div className="space-y-4">
                    {visiblePlayers.map((player, index) => (
                        <div
                            key={player.id}
                            style={{ animation: `slideIn${index % 2 === 0 ? 'Left' : 'Right'} 0.5s ease-out forwards` }}
                            className={`relative bg-gray-800 rounded-xl p-4 flex items-center transition-all duration-500 ease-in-out    ${index === 0 ? 'border-2 border-yellow-400' : ''} hover:bg-gray-700 hover:shadow-lg hover:transform hover:scale-101`}
                        >
                            <div className="relative w-12 h-12 flex-shrink-0">
                                {index < 3 && (
                                    <div
                                        className={`absolute inset-0 rounded-full ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-300' : 'bg-amber-700'} flex items-center justify-center shadow-lg`}
                                        style={{ boxShadow: `0 0 10px rgba(255,255,255,0.3), inset 0 -5px 20px rgba(0,0,0,0.3),  0 5px 0 ${getMedalColor(index)}`, transform: 'rotateY(0deg)' }}
                                    >
                                        <span className="text-gray-900 font-bold text-xl">{index + 1}</span>
                                        <div
                                            className="absolute top-[10%] left-[10%] right-[10%] bottom-[10%] rounded-full blur-[2px]"
                                            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)' }}
                                        ></div>
                                    </div>
                                )}
                                {index >= 3 && (
                                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                                        <span className="text-gray-300 font-bold text-xl">{index + 1}</span>
                                    </div>
                                )}
                            </div>

                            <div className="mx-4 relative group">
                                <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center group-hover:rotate-y-180 transition-transform duration-500 transform-style-preserve-3d">
                                    <div className="backface-hidden absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl font-bold text-white">{player.avatar}</span>
                                    </div>
                                    <div className="backface-hidden absolute inset-0 bg-gray-600 rounded-full flex items-center justify-center rotate-y-180">
                                        <span className="text-xs text-center text-white px-1">Level {Math.floor(player.score / 1000)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-grow">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-semibold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 hover:animate-shimmer">
                                        {player.name}
                                    </h3>
                                    <span className="text-lg font-bold text-white">{player.score.toLocaleString()}</span>
                                </div>

                                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-300' : index === 2 ? 'bg-amber-700' : 'bg-blue-500'}`} style={{ width: `${(player.score / 10000) * 100}%` }}></div>
                                </div>
                            </div>

                            {player.change !== 0 && (
                                <div className={`ml-4 px-3 py-1 rounded-full ${player.change > 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                                    {player.change > 0 ? '↑' : '↓'} {Math.abs(player.change)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes slideInLeft {
                    from { transform: translateX(-100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideInRight {
                    from { transform: translateX(100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .animate-shimmer {
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite linear;
                }
            `}</style>
        </div>
    );
};

export default Leaderboard;