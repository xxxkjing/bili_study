/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['plyr'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.hdslb.com',
        pathname: '/bfs/**'
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/7.x/**'
      }
    ]
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