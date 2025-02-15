import Image from 'next/image'
import Link from 'next/link'

interface VideoCardProps {
  video: {
    bvid: string
    title: string
    cover: string
    author: string
    duration: string
  }
}

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <Link href={`/video/${video.bvid}`} className="block">
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <div className="relative aspect-video">
          <Image
            src={video.cover}
            alt={video.title}
            fill
            className="rounded-t-lg object-cover"
          />
          <span className="absolute bottom-1 right-1 bg-black/70 text-white px-1 rounded text-sm">
            {video.duration}
          </span>
        </div>
        <div className="p-2">
          <h3 className="font-medium line-clamp-2">{video.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{video.author}</p>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard 