export const SphereLoader = () => {
    return (
        <div className="select-none cursor-pointer fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="select-none relative w-32 h-32">
                <div className="select-none absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg animate-spin-slow">
                    <div className="select-none absolute top-1/4 left-1/4 w-6 h-6 bg-white/30 rounded-full" />
                    <div className="select-none absolute bottom-1/4 right-1/4 w-4 h-4 bg-white/40 rounded-full" />
                    <div className="select-none absolute top-1/3 right-1/3 w-5 h-5 bg-white/20 rounded-full" />
                </div>
                <div className="select-none absolute top-1/3 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-ping" />
                <div className="select-none absolute bottom-1/3 right-1/3 w-12 h-12 bg-purple-400/20 rounded-full animate-ping delay-300" />
            </div>
        </div>
    );
};