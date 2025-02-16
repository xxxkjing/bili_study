export interface User {
  id: string
  name: string
  avatar: string
}

export interface Comment {
  id: string
  content: string
  user: User
  createdAt: string
  likes: number
  liked?: boolean
  replies?: Comment[]
  parentId?: string
  isEditing?: boolean
}

export interface CommentFormData {
  content: string
  parentId?: string
} 