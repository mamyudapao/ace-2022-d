/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    emotion: true,
    reactRemoveProperties: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
