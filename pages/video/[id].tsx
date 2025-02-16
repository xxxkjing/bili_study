import { useRouter } from 'next/router'
import Head from 'next/head'

const VideoPage = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) {
    return <div>加载中...</div>
  }

  return (
    <div>
      <Head>
        <title>视频播放</title>
      </Head>
      <div className="container mx-auto p-4">
        <div className="aspect-video bg-black">
          <iframe
            className="w-full h-full"
            src={`//player.bilibili.com/player.html?bvid=${id}&page=1`}
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export default VideoPage 