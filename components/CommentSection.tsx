import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Comment } from '../types/comment'

interface CommentSectionProps {
  videoId: string
}

const CommentSection: React.FC<CommentSectionProps> = ({ videoId }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 获取评论数据
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments/${videoId}`)
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error('Failed to fetch comments:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [videoId])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId,
          content: newComment,
        }),
      })

      const data = await response.json()
      setComments(prev => [data, ...prev])
      setNewComment('')
    } catch (error) {
      console.error('Failed to post comment:', error)
    }
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">评论区</h2>
      
      {/* 评论输入框 */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex gap-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="发表你的评论..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors h-fit"
            disabled={!newComment.trim()}
          >
            发表评论
          </button>
        </div>
      </form>

      {/* 评论列表 */}
      {isLoading ? (
        <div className="text-center py-4">加载评论中...</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex items-start gap-3">
                <Image
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{comment.user.name}</span>
                    <span className="text-gray-500 text-sm">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700">{comment.content}</p>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                    <button className="hover:text-blue-600 flex items-center gap-1">
                      <span>👍</span>
                      <span>{comment.likes}</span>
                    </button>
                    <button className="hover:text-blue-600">回复</button>
                  </div>
                </div>
              </div>
              
              {/* 回复列表 */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-12 mt-4 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex items-start gap-3">
                      <Image
                        src={reply.user.avatar}
                        alt={reply.user.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{reply.user.name}</span>
                          <span className="text-gray-500 text-sm">
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-1 text-gray-700">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentSection 