const path = require("path");
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                pathname: '/myportfolio-90f7c.appspot.com/**',
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/v0/b/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**',
            },
        ],
    },
    telemetry: false, 
    webpack: (config) => {
        config.resolve.alias["@components/*"] = path.resolve(__dirname, "src/app/[lang]/components/*");
        config.resolve.alias["@hooks/*"] = path.resolve(__dirname, "src/hooks/*");
        config.resolve.alias["@features/*"] = path.resolve(__dirname, "src/features/*");
        config.resolve.alias["@services/*"] = path.resolve(__dirname, "src/services/*");
        config.resolve.alias["@styles/*"] = path.resolve(__dirname, "src/styles/*");
        config.resolve.alias["@types/*"] = path.resolve(__dirname, "src/types/*");
        config.resolve.alias["@lib/*"] = path.resolve(__dirname, "src/lib/*");
        config.resolve.alias["@context/*"] = path.resolve(__dirname, "src/context/*");
        config.resolve.alias["@assets/*"] = path.resolve(__dirname, "src/assets/*");
        config.resolve.alias["@stores/*"] = path.resolve(__dirname, "src/stores/*");

        return config;
    },
};

export default nextConfig;