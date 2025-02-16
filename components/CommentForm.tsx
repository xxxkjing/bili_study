import React, { useState } from 'react'
import type { CommentFormData } from '../types/comment'

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => Promise<void>
  parentId?: string
  initialValue?: string
  placeholder?: string
  buttonText?: string
  onCancel?: () => void
}

const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  parentId,
  initialValue = '',
  placeholder = '发表你的评论...',
  buttonText = '发表评论',
  onCancel
}) => {
  const [content, setContent] = useState(initialValue)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await onSubmit({ content, parentId })
      setContent('')
    } catch (error) {
      console.error('Failed to submit comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main resize-none"
        rows={3}
      />
      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            取消
          </button>
        )}
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="px-4 py-2 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {isSubmitting ? '提交中...' : buttonText}
        </button>
      </div>
    </form>
  )
}

export default CommentForm 