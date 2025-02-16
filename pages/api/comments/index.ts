import type { NextApiRequest, NextApiResponse } from 'next'
import type { Comment, User } from '../../../types/comment'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { videoId, content } = req.body

  // 创建模拟用户
  const guestUser: User = {
    id: `guest_${Date.now()}`,
    name: '访客用户',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest'
  }

  // 模拟创建新评论
  const newComment: Comment = {
    id: Date.now().toString(),
    content,
    user: guestUser,
    createdAt: new Date().toISOString(),
    likes: 0
  }

  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  res.status(201).json(newComment)
} 