const { Compilation, sources } = require('webpack');
const { obfuscate } = require('javascript-obfuscator');

class ObfuscatorPlugin {
  apply(compiler) {
    compiler.hooks['compilation'].tap('Obfuscator', compilation => {
      compilation.hooks['processAssets'].tap(
        {
          name: 'Obfuscator',
          stage: Compilation['PROCESS_ASSETS_STAGE_DEV_TOOLING'],
        },
        assets =>
          Object.keys(assets).forEach(path => {
            const asset = assets[path];
            if (!asset) return;

            if (!path.startsWith('static/chunks')) return;

            if (
              ['framework', 'main', 'polyfills', 'webpack'].some(ignoredPrefix =>
                path.startsWith(`static/chunks/${ignoredPrefix}`)
              )
            )
              return;

            assets[path] = new sources.RawSource(
              obfuscate(asset.source(), {
                seed: Math.round(Math.random() * Number.MAX_SAFE_INTEGER),
                controlFlowFlattening: true,
                deadCodeInjection: true,
                disableConsoleOutput: true,
                numbersToExpressions: true,
                selfDefending: true,
              }).getObfuscatedCode()
            );

            process.stdout.write('.');
          })
      );
    });
  }
}

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
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.plugins.push(new ObfuscatorPlugin());
    }

    return config;
  },
};

module.exports = nextConfig;
