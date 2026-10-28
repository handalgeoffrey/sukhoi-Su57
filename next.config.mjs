/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  ...(isGitHubPages
    ? {
        basePath: "/sukhoi-Su57",
        assetPrefix: "/sukhoi-Su57/",
      }
    : {}),
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
