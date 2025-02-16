export interface Playlist {
  id: string
  title: string
  cover: string
  videoCount: number
  updateTime: string
}

export interface Uploader {
  id: string
  name: string
  avatar: string
  description: string
  followerCount: number
  videoCount: number
  playlists: Playlist[]
} 