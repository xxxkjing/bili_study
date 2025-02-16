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
    // 获取视频信息
    const infoResponse = await axios.get(
      `https://api.bilibili.com/x/web-interface/view?bvid=${id}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      }
    )

    // 获取视频流URL
    const playUrlResponse = await axios.get(
      `https://api.bilibili.com/x/player/playurl?bvid=${id}&cid=${infoResponse.data.data.cid}&qn=80&fnval=16`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      }
    )

    const videoData: VideoData = {
      title: infoResponse.data.data.title,
      description: infoResponse.data.data.desc,
      owner: {
        name: infoResponse.data.data.owner.name
      },
      urls: playUrlResponse.data.data.durl.reduce((acc: any, curr: any) => {
        acc[curr.order] = curr.url
        return acc
      }, {}),
      pubdate: infoResponse.data.data.pubdate
    }

    res.status(200).json(videoData)
  } catch (error) {
    console.error('Error fetching video data:', error)
    res.status(500).json({ error: '获取视频信息失败' })
  }
} 