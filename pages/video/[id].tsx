import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import Layout from '../../components/Layout'
import VideoPlayer from '../../components/VideoPlayer'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import CommentSection from '../../components/CommentSection'
import Head from 'next/head'
import UploaderSidebar from '../../components/UploaderSidebar'

interface VideoInfo {
  title: string
  description: string
  uploader: {
    id: string
    name: string
    avatar: string
    description: string
    followerCount: number
    videoCount: number
    playlists: {
      id: string
      title: string
      cover: string
      videoCount: number
      updateTime: string
    }[]
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

  const fetchVideoInfo = React.useCallback(async () => {
    if (!id) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/video/${id}`)
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      setVideoInfo(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取视频信息失败')
    } finally {
      setIsLoading(false)
    }
  }, [id])

  React.useEffect(() => {
    fetchVideoInfo()
  }, [fetchVideoInfo])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchVideoInfo} />
  }

  if (!videoInfo) {
    return <ErrorMessage message="视频信息加载失败" />
  }

  return (
    <Layout title={videoInfo.title}>
      <Head>
        <title>{`${videoInfo.title} - Bilibili 学习`}</title>
      </Head>
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          {/* 主内容区 */}
          <div className="flex-1 min-w-0">
            <VideoPlayer 
              videoUrl={videoInfo.urls['1']} 
              title={videoInfo.title}
            />

            <div className="mt-4 bg-white rounded-lg shadow p-4">
              <h1 className="text-2xl font-bold mb-2">{videoInfo.title}</h1>
              <div className="flex items-center text-gray-600 text-sm mb-4">
                <span>{videoInfo.uploader.name}</span>
                <span className="mx-2">•</span>
                <span>{new Date(videoInfo.pubdate * 1000).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700">{videoInfo.description}</p>
            </div>

            <div className="mt-4 flex space-x-4">
              <button 
                onClick={() => {/* 实现收藏功能 */}}
                className="px-4 py-2 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                收藏视频
              </button>
              <button 
                onClick={() => {/* 实现分享功能 */}}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                分享
              </button>
            </div>

            <CommentSection videoId={id as string} />
          </div>

          {/* UP主侧边栏 */}
          <UploaderSidebar 
            uploader={videoInfo.uploader}
            currentVideoId={id as string}
          />
        </div>
      </div>
    </Layout>
  )
}

export default VideoPage 