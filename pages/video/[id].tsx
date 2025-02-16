import { useRouter } from 'next/router'
import React from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import LoadingSpinner from '../../components/LoadingSpinner'

interface VideoInfo {
  bvid: string
  title: string
  description: string
  uploader: string
  uploadTime: string
}

const VideoPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const [videoInfo, setVideoInfo] = React.useState<VideoInfo | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (id) {
      // 模拟加载视频信息
      setIsLoading(true)
      setTimeout(() => {
        setVideoInfo({
          bvid: id as string,
          title: '示例视频标题',
          description: '这是视频描述',
          uploader: 'UP主名称',
          uploadTime: '2024-03-20'
        })
        setIsLoading(false)
      }, 1000)
    }
  }, [id])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!videoInfo) {
    return <div className="text-center py-8">视频信息加载失败</div>
  }

  return (
    <Layout title={`${videoInfo.title} - Bilibili 学习`}>
      <div className="max-w-4xl mx-auto">
        {/* 视频播放器 */}
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`//player.bilibili.com/player.html?bvid=${id}&page=1`}
            scrolling="no"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* 视频信息 */}
        <div className="mt-4 bg-white rounded-lg shadow p-4">
          <h1 className="text-2xl font-bold mb-2">{videoInfo.title}</h1>
          <div className="flex items-center text-gray-600 text-sm mb-4">
            <span>{videoInfo.uploader}</span>
            <span className="mx-2">•</span>
            <span>{videoInfo.uploadTime}</span>
          </div>
          <p className="text-gray-700">{videoInfo.description}</p>
        </div>

        {/* 功能按钮 */}
        <div className="mt-4 flex space-x-4">
          <button 
            onClick={() => {/* 实现收藏功能 */}}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            收藏视频
          </button>
          <button 
            onClick={() => {/* 实现分享功能 */}}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            分享
          </button>
        </div>

        {/* 评论区 */}
        <div className="mt-8 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-4">评论区</h2>
          <div className="text-gray-600">
            评论功能开发中...
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default VideoPage 