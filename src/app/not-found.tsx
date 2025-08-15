import Link from 'next/link';
import { Metadata } from 'next';
import InteractiveSpace from './[lang]/components/InteractiveSpace';

export const metadata: Metadata = {
    title: "404 Not Found – Page Missing | LearnSphere",
    description: "Uh-oh! The page you’re looking for doesn’t exist. Explore other sections of the site or enjoy some interactive fun while you’re here!",
    keywords: ["404", "Not Found", "Missing Page", "Interactive", "Fun Page"],
    robots: "noindex, nofollow",
};

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-indigo-900 flex flex-col items-center justify-center text-white px-4 overflow-hidden">
            <h1 className="text-5xl md:text-7xl font-bold animate-bounce mb-4 text-center">404 - Page Not Found</h1>
            <p className="text-lg md:text-2xl mb-8 animate-pulse text-center">Oops! You&apos;re lost in space. Explore the floating cubes!</p>
            <div className="w-full max-w-4xl h-64 md:h-96 mb-8 border border-indigo-500 rounded-lg overflow-hidden">
                <InteractiveSpace />
            </div>
            <Link href="/" className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                Beam Me Home
            </Link>
        </div>
    );
}