/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['plyr'],
  images: {
    domains: ['api.dicebear.com', 'i0.hdslb.com']
  },
  async rewrites() {
    return [
      {
        source: '/api/bilibili/:path*',
        destination: 'https://api.bilibili.com/:path*'
      }
    ]
  }
}

module.exports = nextConfig 