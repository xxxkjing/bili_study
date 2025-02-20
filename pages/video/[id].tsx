/** @jsxImportSource react */
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
    isFollowing?: boolean
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
  const [isFollowing, setIsFollowing] = React.useState(false)

  const handleFollow = async () => {
    if (!videoInfo) return

    try {
      const response = await fetch('/api/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          upId: videoInfo.uploader.id,
          action: !isFollowing ? 'follow' : 'unfollow'
        })
      })

      if (!response.ok) {
        throw new Error('关注失败')
      }

      setIsFollowing(!isFollowing)
      setVideoInfo({
        ...videoInfo,
        uploader: {
          ...videoInfo.uploader,
          followerCount: videoInfo.uploader.followerCount + (isFollowing ? -1 : 1)
        }
      })
    } catch (err) {
      console.error('关注操作失败:', err)
      alert('关注失败，请稍后重试')
    }
  }

  const fetchVideoInfo = React.useCallback(async () => {
    if (!id) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/video/${id}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '获取视频信息失败')
      }
      const data = await response.json()
      setVideoInfo(data)
    } catch (err) {
      console.error('Error fetching video:', err)
      setError(err instanceof Error ? err.message : '获取视频信息失败')
    } finally {
      setIsLoading(false)
    }
  }, [id])

  React.useEffect(() => {
    fetchVideoInfo()
  }, [fetchVideoInfo])

  if (isLoading || !videoInfo) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchVideoInfo} />
  }

  return (
    <Layout>
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
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{videoInfo.title}</h1>
                  <div className="flex items-center text-gray-600 text-sm">
                    <span>{videoInfo.uploader.name}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(videoInfo.pubdate * 1000).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  onClick={handleFollow}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    isFollowing 
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : 'bg-primary-main text-white hover:bg-primary-dark'
                  }`}
                >
                  {isFollowing ? '已关注' : '+ 关注'}
                </button>
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
            isFollowing={isFollowing}
            onFollow={handleFollow}
          />
        </div>
      </div>
    </Layout>
  )
}

export default VideoPage 