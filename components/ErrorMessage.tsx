import React from 'react'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
    <div className="text-red-700 mb-2">{message}</div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="text-sm text-red-600 hover:text-red-800 underline"
      >
        重试
      </button>
    )}
  </div>
)

export default ErrorMessage 