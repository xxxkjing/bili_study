import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Uploader, Playlist } from '../types/uploader'

interface UploaderSidebarProps {
  uploader: Uploader
  currentVideoId?: string
  isFollowing?: boolean
  onFollow?: () => void
}

const PlaylistItem = ({ playlist, currentVideoId }: { playlist: Playlist, currentVideoId?: string }) => (
  <Link 
    href={`/playlist/${playlist.id}`}
    className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
  >
    <div className="flex gap-3">
      <div className="relative w-20 aspect-video rounded-md overflow-hidden bg-gray-100">
        <Image
          src={playlist.cover}
          alt={playlist.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-text-primary line-clamp-2">
          {playlist.title}
        </h4>
        <div className="mt-1 text-sm text-text-secondary">
          {playlist.videoCount} 个视频
        </div>
      </div>
    </div>
  </Link>
)

const UploaderSidebar: React.FC<UploaderSidebarProps> = ({ 
  uploader, 
  currentVideoId,
  isFollowing,
  onFollow
}) => {
  return (
    <div className="w-80 flex-shrink-0">
      <div className="sticky top-20 bg-white rounded-lg shadow p-4">
        {/* UP主信息 */}
        <div className="flex items-center gap-3 pb-4 border-b">
          <Image
            src={uploader.avatar}
            alt={uploader.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary">
              {uploader.name}
            </h3>
            <div className="mt-1 text-sm text-text-secondary">
              {uploader.followerCount.toLocaleString()} 粉丝 · {uploader.videoCount} 视频
            </div>
          </div>
          <button 
            onClick={onFollow}
            className={`px-4 py-2 rounded-full transition-colors ${
              isFollowing 
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                : 'bg-primary-main text-white hover:bg-primary-dark'
            }`}
          >
            {isFollowing ? '已关注' : '+ 关注'}
          </button>
        </div>

        {/* UP主简介 */}
        <div className="py-4 border-b">
          <p className="text-sm text-text-secondary line-clamp-3">
            {uploader.description}
          </p>
        </div>

        {/* 合集列表 */}
        <div className="pt-4">
          <h3 className="font-semibold text-text-primary mb-3">
            UP主合集
          </h3>
          <div className="space-y-2">
            {uploader.playlists.map(playlist => (
              <PlaylistItem 
                key={playlist.id} 
                playlist={playlist}
                currentVideoId={currentVideoId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploaderSidebar 