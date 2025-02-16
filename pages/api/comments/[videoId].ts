import type { NextApiRequest, NextApiResponse } from 'next'
import type { Comment } from '../../../types/comment'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { videoId } = req.query

  // 模拟数据
  const mockComments: Comment[] = [
    {
      id: '1',
      content: '这个视频讲解得很清楚！',
      user: {
        id: 'user1',
        name: '学习达人',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
      },
      createdAt: new Date().toISOString(),
      likes: 12,
      replies: [
        {
          id: '1-1',
          content: '同意，收获很多',
          user: {
            id: 'user2',
            name: '知识探索者',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'
          },
          createdAt: new Date().toISOString(),
          likes: 3
        }
      ]
    },
    {
      id: '2',
      content: '讲解非常详细，对新手很友好',
      user: {
        id: 'user3',
        name: '编程爱好者',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3'
      },
      createdAt: new Date().toISOString(),
      likes: 8
    }
  ]

  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  res.status(200).json(mockComments)
} 