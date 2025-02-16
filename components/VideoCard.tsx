import React from 'react'
import Link from 'next/link'

interface VideoCardProps {
  id: string
  title: string
  description: string
  thumbnail?: string
}

const VideoCard = ({ id, title, description, thumbnail }: VideoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-duration-300">
      {thumbnail && (
        <div className="aspect-video bg-gray-100">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <Link 
          href={`/video/${id}`}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          观看视频
        </Link>
      </div>
    </div>
  )
}

export default VideoCard 