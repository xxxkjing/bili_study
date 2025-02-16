/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i0.hdslb.com'], // Bilibili 图片域名
  },
}

module.exports = nextConfig 