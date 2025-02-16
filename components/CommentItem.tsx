import React, { useState } from 'react'
import Image from 'next/image'
import type { Comment } from '../types/comment'
import CommentForm from './CommentForm'

interface CommentItemProps {
  comment: Comment
  onReply: (content: string, parentId: string) => Promise<void>
  onEdit: (content: string, commentId: string) => Promise<void>
  onDelete: (commentId: string) => Promise<void>
  onLike: (commentId: string) => Promise<void>
  currentUser?: { id: string }
  level?: number
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onReply,
  onEdit,
  onDelete,
  onLike,
  currentUser,
  level = 0
}) => {
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const isAuthor = currentUser?.id === comment.user.id
  const maxLevel = 2 // 最大回复层级

  const handleReply = async (data: { content: string }) => {
    await onReply(data.content, comment.id)
    setIsReplying(false)
  }

  const handleEdit = async (data: { content: string }) => {
    await onEdit(data.content, comment.id)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (window.confirm('确定要删除这条评论吗？')) {
      await onDelete(comment.id)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Image
          src={comment.user.avatar}
          alt={comment.user.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{comment.user.name}</span>
            <span className="text-text-secondary text-sm">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          {isEditing ? (
            <CommentForm
              onSubmit={handleEdit}
              initialValue={comment.content}
              buttonText="保存"
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <p className="mt-2 text-text-primary">{comment.content}</p>
          )}

          <div className="mt-2 flex items-center space-x-4 text-sm text-text-secondary">
            <button
              onClick={() => onLike(comment.id)}
              className={`flex items-center space-x-1 hover:text-primary-main transition-colors ${
                comment.liked ? 'text-primary-main' : ''
              }`}
            >
              <span>👍</span>
              <span>{comment.likes}</span>
            </button>
            {level < maxLevel && (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="hover:text-primary-main transition-colors"
              >
                回复
              </button>
            )}
            {isAuthor && (
              <>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="hover:text-primary-main transition-colors"
                >
                  编辑
                </button>
                <button
                  onClick={handleDelete}
                  className="hover:text-red-600 transition-colors"
                >
                  删除
                </button>
              </>
            )}
          </div>

          {isReplying && (
            <div className="mt-4">
              <CommentForm
                onSubmit={handleReply}
                placeholder={`回复 ${comment.user.name}...`}
                buttonText="回复"
                onCancel={() => setIsReplying(false)}
              />
            </div>
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className={`ml-${level > 0 ? '0' : '14'} pl-14 space-y-4 border-l`}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              onLike={onLike}
              currentUser={currentUser}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentItem 