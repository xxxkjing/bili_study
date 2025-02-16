import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'

// 定义组件接口
interface VideoPlayerProps {
  videoId: string | string[] | undefined
}

interface CommentSectionProps {
  videoId: string | string[] | undefined
}

// 创建组件
const VideoPlayer = ({ videoId }: VideoPlayerProps): JSX.Element => {
  return (
    <div className="w-full aspect-video bg-black">
      <iframe
        className="w-full h-full"
        src={`//player.bilibili.com/player.html?bvid=${videoId}&page=1`}
        scrolling="no"
        border="0"
        frameBorder="no"
        framespacing="0"
        allowFullScreen={true}
      ></iframe>
    </div>
  )
}

const CommentSection = ({ videoId }: CommentSectionProps): JSX.Element => {
  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">评论区</h2>
      {/* 这里将来实现评论列表 */}
      <p className="text-gray-600">评论功能开发中...</p>
    </div>
  )
}

// 主页面组件
const VideoPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  
  return (
    <>
      <Head>
        <title>视频播放 - {id}</title>
      </Head>
      <div className="container mx-auto px-4 py-6">
        <VideoPlayer videoId={id} />
        <CommentSection videoId={id} />
      </div>
    </>
  )
}

export default VideoPage 