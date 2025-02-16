import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

interface VideoData {
  title: string
  description: string
  owner: {
    name: string
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
      owner: {
        name: videoInfo.owner.name
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