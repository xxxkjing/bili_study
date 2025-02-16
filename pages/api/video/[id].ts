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
          'Referer': 'https://www.bilibili.com',
          'Cookie': process.env.BILIBILI_COOKIE || '',
          'Origin': 'https://www.bilibili.com'
        },
        validateStatus: (status) => status < 500 // 不要让axios抛出错误
      }
    )

    // 检查响应
    if (infoResponse.data.code !== 0) {
      console.error('B站API返回错误:', infoResponse.data)
      return res.status(404).json({ 
        error: infoResponse.data.message || '视频不存在或已被删除',
        code: infoResponse.data.code
      })
    }

    const videoInfo = infoResponse.data.data
    if (!videoInfo) {
      return res.status(404).json({ error: '视频不存在' })
    }

    const cid = videoInfo.cid

    // 获取视频流URL
    const playUrlResponse = await axios.get(
      `https://api.bilibili.com/x/player/playurl?bvid=${id}&cid=${cid}&qn=80&fnval=16`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.bilibili.com',
          'Cookie': process.env.BILIBILI_COOKIE || '',
          'Origin': 'https://www.bilibili.com'
        },
        validateStatus: (status) => status < 500
      }
    )

    if (playUrlResponse.data.code !== 0) {
      console.error('获取视频地址失败:', playUrlResponse.data)
      return res.status(403).json({ 
        error: playUrlResponse.data.message || '无法获取视频播放地址',
        code: playUrlResponse.data.code
      })
    }

    const videoData: VideoData = {
      title: videoInfo.title,
      description: videoInfo.desc,
      uploader: {
        id: videoInfo.owner.mid,
        name: videoInfo.owner.name,
        avatar: videoInfo.owner.face,
        description: videoInfo.owner.sign || '这是UP主的简介',
        followerCount: videoInfo.owner.fans || 0,
        videoCount: videoInfo.owner.video_count || 0,
        playlists: [
          {
            id: 'pl1',
            title: videoInfo.title,
            cover: videoInfo.pic,
            videoCount: 1,
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
    const errorMessage = error instanceof Error ? error.message : '获取视频信息失败'
    console.error('Error details:', errorMessage)
    
    res.status(500).json({ 
      error: errorMessage,
      details: error instanceof Error ? error.stack : undefined,
      message: '视频可能不存在或需要登录才能访问'
    })
  }
} 