/** @type {import('next').NextConfig} */
module.exports = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.crystallize.com",
            },
        ],
    },
};
