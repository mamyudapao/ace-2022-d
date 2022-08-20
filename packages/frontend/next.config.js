/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    emotion: true,
    reactRemoveProperties: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: ['2208-ace-d.s3.ap-northeast-1.amazonaws.com'],
  },
};

module.exports = nextConfig;
