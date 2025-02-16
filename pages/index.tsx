import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { getDefaultUpVideos } from '@/lib/api'
import VideoCard from '@/components/VideoCard'
import Head from 'next/head'
import Link from 'next/link'

interface UpUpdate {
  id: string
  upName: string
  title: string
  cover: string
  timestamp: string
  type: 'video' | 'article'
}

const Home: NextPage = () => {
  const [updates, setUpdates] = useState<UpUpdate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 这里将来需要实现实际的API调用
    const fetchUpdates = async () => {
      try {
        // 模拟API调用
        const response = await fetch('/api/updates')
        const data = await response.json()
        setUpdates(data)
      } catch (error) {
        console.error('获取更新失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUpdates()
  }, [])

  if (loading) {
    return <div className="p-4">加载中...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Bilibili 学习</title>
        <meta name="description" content="纯净的bilibili学习平台" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold mb-8">
          欢迎来到 Bilibili 学习平台
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.map(update => (
            <div 
              key={update.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img 
                src={update.cover} 
                alt={update.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{update.title}</h3>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>{update.upName}</span>
                  <span>{update.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">示例视频</h2>
              <p className="text-gray-600 mb-4">这是一个示例视频描述</p>
              <Link 
                href="/video/BV1234567890" 
                className="text-blue-600 hover:text-blue-800"
              >
                观看视频
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const videos = await getDefaultUpVideos()
  return { props: { videos } }
} 