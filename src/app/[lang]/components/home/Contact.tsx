"use client";
import { useState, useRef, useEffect } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const sectionRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const [emojis, setEmojis] = useState<{ id: number; emoji: string; left: number; top: number }[]>([]);

    useEffect(() => {
        const emojiList = ["😊", "👍", "💡", "✨", "❤️", "🚀", "🎯", "👏"];
        const newEmojis = [];

        for (let i = 0; i < 8; i++) {
            newEmojis.push({
                id: i,
                emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
                left: Math.random() * 80 + 10,
                top: Math.random() * 80 + 10
            });
        }

        setEmojis(newEmojis);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!boxRef.current) return;

            const rect = boxRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 20;
            const y = -(e.clientY - rect.top - rect.height / 2) / 20;

            setRotate({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        setTimeout(() => {
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };

    return (
        <section ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {emojis.map(emoji => (
                <div
                    key={emoji.id}
                    className="absolute text-2xl md:text-3xl opacity-0 animate-float pointer-events-none"
                    style={{ left: `${emoji.left}%`, top: `${emoji.top}%`, animationDelay: `${emoji.id * 0.5}s` }}
                >
                    {emoji.emoji}
                </div>
            ))}

            <div className="max-w-7xl mx-auto">
                <h2 className={`text-4xl font-bold text-center mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    Contact Us
                </h2>
                <p className={`text-xl text-center text-gray-600 mb-16 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    We&apos;d love to hear your feedback!
                </p>

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <form onSubmit={handleSubmit} className={`w-full lg:w-1/2 space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {isSubmitted ? (
                            <div className="relative bg-green-100 border border-green-400 text-green-700 px-4 py-8 rounded-lg text-center">
                                <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-10">
                                    {[...Array(20)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-2 h-2 bg-yellow-500 rounded-full animate-confetti"
                                            style={{ opacity: 0.7, animationDelay: `${i * 0.1}s`, left: `${Math.random() * 100}%`, transform: `rotate(${Math.random() * 360}deg)` }}
                                        >

                                        </div>
                                    ))}
                                </div>
                                <div className="relative z-10">
                                    <div className="text-5xl mb-4">🎉</div>
                                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                                    <p>Your message has been sent successfully.</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="relative">
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        className="w-full px-6 py-4 bg-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 shadow-sm hover:shadow-md outline-0"
                                    />
                                </div>

                                <div className="relative">
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Your Email"
                                        className="w-full px-6 py-4 bg-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 shadow-sm hover:shadow-md outline-0"
                                    />
                                </div>

                                <div className="relative">
                                    <textarea
                                        rows={5}
                                        required
                                        name="message"
                                        onChange={handleChange}
                                        value={formData.message}
                                        placeholder="Your Message"
                                        className="w-full px-6 py-4 bg-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 shadow-sm hover:shadow-md outline-0"
                                    ></textarea>
                                </div>

                                <button type="submit" className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer">
                                    Send Message
                                </button>
                            </>
                        )}
                    </form>

                    <div
                        ref={boxRef}
                        style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
                        className={`w-full lg:w-1/2 flex justify-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        <div className="relative w-64 h-64 perspective-1000">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-2xl transform-style-preserve-3d transition-transform duration-1000 hover:rotate-y-180">
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 backface-hidden">
                                    <div className="text-6xl mb-4">📩</div>
                                    <h3 className="text-2xl font-bold text-white text-center">Get In Touch</h3>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex flex-col items-center justify-center p-6 backface-hidden rotate-y-180">
                                    <div className="text-6xl mb-4">💬</div>
                                    <h3 className="text-2xl font-bold text-white text-center">We&apos;re Listening</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;