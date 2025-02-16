import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import Layout from '../../components/Layout'
import VideoPlayer from '../../components/VideoPlayer'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import CommentSection from '../../components/CommentSection'

interface VideoInfo {
  title: string
  description: string
  owner: {
    name: string
  }
  urls: {
    [key: string]: string
  }
  pubdate: number
}

const VideoPage = (): ReactElement => {
  const router = useRouter()
  const { id } = router.query
  const [videoInfo, setVideoInfo] = React.useState<VideoInfo | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (id) {
      setIsLoading(true)
      fetch(`/api/video/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            throw new Error(data.error)
          }
          setVideoInfo(data)
        })
        .catch(err => {
          setError(err.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [id])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!videoInfo) {
    return <ErrorMessage message="视频信息加载失败" />
  }

  return (
    <Layout title={`${videoInfo.title} - Bilibili 学习`}>
      <div className="max-w-4xl mx-auto">
        <VideoPlayer 
          videoUrl={videoInfo.urls['1']} 
          title={videoInfo.title}
        />

        <div className="mt-4 bg-white rounded-lg shadow p-4">
          <h1 className="text-2xl font-bold mb-2">{videoInfo.title}</h1>
          <div className="flex items-center text-gray-600 text-sm mb-4">
            <span>{videoInfo.owner.name}</span>
            <span className="mx-2">•</span>
            <span>{new Date(videoInfo.pubdate * 1000).toLocaleDateString()}</span>
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

        {/* 添加评论组件 */}
        <CommentSection videoId={id as string} />
      </div>
    </Layout>
  )
}

export default VideoPage 