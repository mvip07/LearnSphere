import Link from 'next/link';
import InteractiveVault from '@components/InteractiveVault';

export default function Forbidden() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-red-900 flex flex-col items-center justify-center text-white px-4 overflow-hidden">
            <h1 className="text-5xl md:text-7xl font-bold animate-pulse mb-4 text-center">403 - Access Forbidden</h1>
            <p className="text-lg md:text-2xl mb-8 animate-bounce text-center">This vault is locked! Try to crack it with the interactive cube.</p>
            <div className="w-full max-w-4xl h-64 md:h-96 mb-8 border border-red-500 rounded-lg overflow-hidden">
                <InteractiveVault />
            </div>
            <Link href="/" className="px-6 py-3 bg-red-600 rounded-lg text-white font-semibold hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                Retreat to Safety
            </Link>
        </div>
    );
}