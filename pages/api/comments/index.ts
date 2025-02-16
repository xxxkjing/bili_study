import type { NextApiRequest, NextApiResponse } from 'next'
import type { Comment } from '../../../types/comment'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { videoId, content } = req.body

  // 模拟创建新评论
  const newComment: Comment = {
    id: Date.now().toString(),
    content,
    user: {
      name: '访客用户',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest'
    },
    createdAt: new Date().toISOString(),
    likes: 0
  }

  res.status(201).json(newComment)
} 