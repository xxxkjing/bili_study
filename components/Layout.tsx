import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { theme } from '../styles/theme'

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

const Layout = ({ children, title = 'Bilibili 学习' }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {title && (
        <Head>
          <title>{title}</title>
          <meta name="description" content="纯净的bilibili学习平台" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}

      <header className="bg-white border-b sticky top-0 z-50">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-bold text-primary-main hover:text-primary-dark transition-colors"
          >
            Bilibili学习
          </Link>
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-secondary-main hover:text-primary-main transition-colors"
            >
              首页
            </Link>
            <Link 
              href="/favorites" 
              className="text-secondary-main hover:text-primary-main transition-colors"
            >
              收藏夹
            </Link>
            <button className="px-4 py-2 bg-primary-main text-white rounded-md hover:bg-primary-dark transition-colors">
              登录
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white border-t mt-auto py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">关于我们</h3>
              <p className="text-text-secondary">
                提供纯净的bilibili学习体验，专注于知识分享和学习交流。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">快速链接</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-text-secondary hover:text-primary-main">
                    关于平台
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-text-secondary hover:text-primary-main">
                    联系我们
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">联系方式</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>邮箱：contact@example.com</li>
                <li>GitHub：github.com/example</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-text-secondary">
            © 2024 Bilibili学习. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout 