/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Explicitly enable the App Router
    appDir: true,
  },
  // Configure NextAuth.js custom pages if needed
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/api/auth/signin",
        permanent: true,
      },
    ];
  },
  // Add ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
