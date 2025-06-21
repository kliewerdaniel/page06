import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["next-mdx-remote"],
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
