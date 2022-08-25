/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['flagcdn.com'],
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
};

module.exports = nextConfig;
