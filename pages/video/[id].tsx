import { useRouter } from 'next/router'
import { FC } from 'react'

// 定义组件接口
interface VideoPlayerProps {
  videoId: string | string[] | undefined
}

interface CommentSectionProps {
  videoId: string | string[] | undefined
}

// 创建组件
const VideoPlayer: FC<VideoPlayerProps> = ({ videoId }) => {
  return (
    <div>
      {/* 视频播放器实现 */}
      <p>Video ID: {videoId}</p>
    </div>
  )
}

const CommentSection: FC<CommentSectionProps> = ({ videoId }) => {
  return (
    <div>
      {/* 评论区实现 */}
      <p>Comments for video: {videoId}</p>
    </div>
  )
}

// 主页面组件
const VideoPage: FC = () => {
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