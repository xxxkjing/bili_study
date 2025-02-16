import React, { useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'plyr/dist/plyr.css' // 这会被Next.js自动处理

interface VideoPlayerProps {
  videoUrl: string
  title: string
}

// 动态导入Plyr，只在客户端加载
const VideoPlayer = ({ videoUrl, title }: VideoPlayerProps): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // 在客户端动态导入和初始化Plyr
    const initPlyr = async () => {
      if (videoRef.current) {
        const Plyr = (await import('plyr')).default
        // 使用require导入CSS
        require('plyr/dist/plyr.css')
        
        const player = new Plyr(videoRef.current, {
          controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'settings',
            'fullscreen'
          ],
          settings: ['quality', 'speed']
        })

        return () => {
          player.destroy()
        }
      }
    }

    initPlyr()
  }, [videoUrl])

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full"
        crossOrigin="anonymous"
        playsInline
        controls
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

// 使用dynamic导入组件，禁用SSR
export default dynamic(() => Promise.resolve(VideoPlayer), {
  ssr: false
}) 