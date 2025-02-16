import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Comment } from '../types/comment'

interface CommentSectionProps {
  videoId: string
}

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <div className="border-b pb-6 last:border-b-0">
      <div className="flex space-x-4">
        <Image
          src={comment.user.avatar}
          alt={comment.user.name}
          width={40}
          height={40}
          className="rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-text-primary hover:text-primary-main transition-colors">
              {comment.user.name}
            </span>
            <span className="text-text-secondary text-sm">
              {new Date(comment.createdAt).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <p className="mt-2 text-text-primary whitespace-pre-wrap break-words">
            {comment.content}
          </p>
          <div className="mt-2 flex items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-1">
              <span className="text-lg">👍</span>
              <span>{comment.likes > 999 ? `${(comment.likes/1000).toFixed(1)}k` : comment.likes}</span>
            </div>
            {comment.replies && comment.replies.length > 0 && (
              <span className="text-text-secondary">
                {comment.replies.length} 条回复
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 回复列表 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-14 mt-4 space-y-6 pl-4 border-l border-gray-100">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  )
}

const CommentSection: React.FC<CommentSectionProps> = ({ videoId }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments/${videoId}`)
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error('Failed to fetch comments:', error)
        setError('评论加载失败')
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [videoId])

  if (isLoading) {
    return (
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <div className="text-red-500 text-center">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-4 text-primary-main hover:underline"
          >
            重试
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text-primary">评论区</h2>
        <span className="text-text-secondary">
          {comments.length} 条评论
        </span>
      </div>
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="text-center py-8 text-text-secondary">
            暂无评论，快来发表第一条评论吧
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentSection 