import { getDefaultUpVideos } from '@/lib/api'
import VideoCard from '@/components/VideoCard'

export default function Home({ videos }: { videos: any[] }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">学习类视频</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.bvid} video={video} />
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const videos = await getDefaultUpVideos()
  return { props: { videos } }
} 