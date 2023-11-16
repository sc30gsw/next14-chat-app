import { z } from 'zod'

export const createRoomScheme = z.object({
  name: z.string().min(1, { message: 'RoomName is required' }),
  userId: z.string().min(1, 'userId is required'),
})

export type CreateRoomInput = z.infer<typeof createRoomScheme>
