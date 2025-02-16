/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['plyr'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              auto: true
            }
          }
        }
      ]
    })
    return config
  },
  images: {
    domains: ['api.dicebear.com']
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