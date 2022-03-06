/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BUILD_GIT_HASH: process.env.GIT_HASH || "ffffffff",
    BUILD_DATE: (new Date()).toLocaleString(),
    BUILD_VER: process.env.BUILD_VER || "v-dev"
  }
}

module.exports = nextConfig
