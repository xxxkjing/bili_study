import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import React from 'react'

// 定义组件接口
interface VideoPlayerProps {
  videoId: string | string[] | undefined
}

interface CommentSectionProps {
  videoId: string | string[] | undefined
}

// 创建组件
const VideoPlayer = ({ videoId }: VideoPlayerProps): React.ReactElement => {
  return (
    <div>
      {/* 视频播放器实现 */}
      <p>Video ID: {videoId}</p>
    </div>
  )
}

const CommentSection = ({ videoId }: CommentSectionProps): React.ReactElement => {
  return (
    <div>
      {/* 评论区实现 */}
      <p>Comments for video: {videoId}</p>
    </div>
  )
}

// 主页面组件
const VideoPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  
  return (
    <div className="video-container">
      <VideoPlayer videoId={id} />
      <CommentSection videoId={id} />
    </div>
  )
}

export default VideoPage 