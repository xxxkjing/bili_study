import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

const Layout = ({ children, title = 'Bilibili 学习' }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content="纯净的bilibili学习平台" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Bilibili学习
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-blue-600">
                首页
              </Link>
              <Link href="/favorites" className="hover:text-blue-600">
                收藏夹
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2024 Bilibili学习. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Layout 