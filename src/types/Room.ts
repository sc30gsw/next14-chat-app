import type { RoomUser } from '@/types/RoomUser'

export type Room = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  roomUsers: RoomUser[]
}
