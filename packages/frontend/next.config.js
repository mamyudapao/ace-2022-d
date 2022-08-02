/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    emotion: true,
    reactRemoveProperties: true,
    removeConsole: true,
  },
};

module.exports = nextConfig;
