/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["images.unsplash.com", "picsum.photos"],
  },
};

module.exports = nextConfig;
