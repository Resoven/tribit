/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  typescript: {
    // Allows production builds to finish even with type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allows production builds to finish even with linting errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;