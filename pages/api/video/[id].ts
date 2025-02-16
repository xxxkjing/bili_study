import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  
  try {
    // 调用bilibili API获取视频信息
    const videoData = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${id}`)
    const data = await videoData.json()
    
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: '获取视频信息失败' })
  }
} 