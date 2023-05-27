/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/kriteria",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
