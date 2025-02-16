import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export interface VideoCardProps {
  id: string
  title: string
  description: string
  thumbnail: string
  author: string
  views: number
  duration: string
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  description,
  thumbnail,
  author,
  views,
  duration
}) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/video/${id}`}>
        <div className="relative aspect-video bg-gray-100">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            unoptimized
          />
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-sm rounded">
            {duration}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium line-clamp-2 group-hover:text-primary-main transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-sm text-text-secondary line-clamp-2">
            {description}
          </p>
          <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
            <span>{author}</span>
            <span>{views.toLocaleString()} 次观看</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default VideoCard 