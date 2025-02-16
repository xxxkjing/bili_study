import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

interface VideoData {
  title: string
  description: string
  uploader: {
    id: string
    name: string
    avatar: string
    description: string
    followerCount: number
    videoCount: number
    playlists: {
      id: string
      title: string
      cover: string
      videoCount: number
      updateTime: string
    }[]
  }
  urls: {
    [key: string]: string
  }
  pubdate: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  try {
    // 获取视频基本信息
    const infoResponse = await axios.get(
      `https://api.bilibili.com/x/web-interface/view?bvid=${id}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.bilibili.com'
        }
      }
    )

    if (infoResponse.data.code !== 0) {
      throw new Error(infoResponse.data.message || '获取视频信息失败')
    }

    const videoInfo = infoResponse.data.data
    const cid = videoInfo.cid

    // 获取视频流URL
    const playUrlResponse = await axios.get(
      `https://api.bilibili.com/x/player/playurl?bvid=${id}&cid=${cid}&qn=80&fnval=16`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.bilibili.com'
        }
      }
    )

    if (playUrlResponse.data.code !== 0) {
      throw new Error(playUrlResponse.data.message || '获取视频播放地址失败')
    }

    const videoData: VideoData = {
      title: videoInfo.title,
      description: videoInfo.desc,
      uploader: {
        id: videoInfo.owner.mid,
        name: videoInfo.owner.name,
        avatar: videoInfo.owner.face,
        description: '这是UP主的简介',
        followerCount: 10000,
        videoCount: 100,
        playlists: [
          {
            id: 'pl1',
            title: '前端开发教程',
            cover: 'https://example.com/cover1.jpg',
            videoCount: 12,
            updateTime: new Date().toISOString()
          },
          {
            id: 'pl2',
            title: 'React实战课程',
            cover: 'https://example.com/cover2.jpg',
            videoCount: 8,
            updateTime: new Date().toISOString()
          }
        ]
      },
      urls: {
        '1': playUrlResponse.data.data.durl[0].url
      },
      pubdate: videoInfo.pubdate
    }

    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    res.status(200).json(videoData)
  } catch (error) {
    console.error('Error fetching video data:', error)
    res.status(500).json({ 
      error: error instanceof Error ? error.message : '获取视频信息失败'
    })
  }
} 