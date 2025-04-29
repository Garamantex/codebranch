import type { NextConfig } from "next";

const config: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  transpilePackages: ['@ui5/webcomponents', '@ui5/webcomponents-react', '@ui5/webcomponents-base', '@ui5/webcomponents-icons'],
};

export default config;
