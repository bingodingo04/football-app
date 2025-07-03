/** @type {import('next').NextConfig} */

console.log("✅ Loaded next.config.js");
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
