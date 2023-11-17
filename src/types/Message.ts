import type { User } from '@/types/User'

export type Message = {
  id: string
  userId: string
  roomId: string
  content?: string | null
  image?: string | null
  createdAt: string
  updatedAt: string
  user: User
}
