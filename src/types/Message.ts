import type { User } from '@/types/User'

export type Message = {
  id: string
  userId: string
  roomId: string
  content?: string
  image?: string
  createdAt: string
  updatedAt: string
  user: User
}
