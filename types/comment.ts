export interface Comment {
  id: string
  content: string
  user: {
    name: string
    avatar: string
  }
  createdAt: string
  likes: number
  replies?: Comment[]
} 