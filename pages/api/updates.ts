import type { NextApiRequest, NextApiResponse } from 'next'

// 模拟数据类型
type Update = {
  id: string
  upName: string
  title: string
  cover: string
  timestamp: string
  type: 'video' | 'article'
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Update[]>
) {
  // 模拟数据
  const mockUpdates: Update[] = [
    {
      id: '1',
      upName: '技术UP主',
      title: '2024年最新Web开发教程',
      cover: 'https://i0.hdslb.com/example1.jpg',
      timestamp: '2024-03-20 14:30',
      type: 'video'
    },
    {
      id: '2',
      upName: '生活分享',
      title: '一起来看樱花',
      cover: 'https://i0.hdslb.com/example2.jpg',
      timestamp: '2024-03-20 12:00',
      type: 'video'
    },
    // 可以添加更多模拟数据
  ]

  res.status(200).json(mockUpdates)
} 