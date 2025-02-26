const isDevelopment = process.env.NODE_ENV === 'development';
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["87.248.156.130", "files.novaarchai.com", isDevelopment && 'localhost' ].filter(Boolean),
        
    },
};

export default nextConfig;
