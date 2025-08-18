import type { NextConfig } from "next";
const path = require("path");

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
    webpack: (config) => {
        config.resolve.alias["@components"] = path.resolve(__dirname, "src/app/[lang]/components");
        return config;
    },
};

export default nextConfig;
