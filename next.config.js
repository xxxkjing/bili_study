/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i0.hdslb.com']
  },
  // 添加以下配置以处理跨域问题
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.bilibili.com/:path*'
      }
    ]
  }
}

module.exports = nextConfig 