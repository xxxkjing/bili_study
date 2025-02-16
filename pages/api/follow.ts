import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { upId, action } = req.body

  try {
    const response = await axios.post(
      `https://api.bilibili.com/x/relation/modify`,
      {
        fid: upId,
        act: action === 'follow' ? 1 : 2,  // 1: 关注, 2: 取消关注
        re_src: 11,
        csrf: process.env.BILIBILI_CSRF
      },
      {
        headers: {
          'Cookie': process.env.BILIBILI_COOKIE || '',
          'Referer': 'https://www.bilibili.com',
          'Origin': 'https://www.bilibili.com',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    if (response.data.code !== 0) {
      throw new Error(response.data.message || '关注失败')
    }

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('关注操作失败:', error)
    res.status(500).json({ 
      error: error instanceof Error ? error.message : '关注失败'
    })
  }
} 