import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { getDefaultUpVideos } from '@/lib/api'
import VideoCard from '@/components/VideoCard'

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">关注UP主更新</h1>
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
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const videos = await getDefaultUpVideos()
  return { props: { videos } }
} 