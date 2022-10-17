/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['bit.ly', 'scontent-sin6-2.cdninstagram.com'],
  },
};

module.exports = nextConfig;
