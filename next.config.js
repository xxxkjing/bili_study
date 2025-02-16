/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['plyr'],
  images: {
    domains: [
      'api.dicebear.com', 
      'i0.hdslb.com',
      'i1.hdslb.com',
      'i2.hdslb.com',
      'i3.hdslb.com',
      'i4.hdslb.com',
      'i5.hdslb.com',
      'i6.hdslb.com',
      'i7.hdslb.com',
      'i8.hdslb.com',
      'i9.hdslb.com'
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