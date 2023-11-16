import { z } from 'zod'

export const messageScheme = z.object({
  message: z.string().min(1, 'message is required'),
  image: z.string().optional().nullable(),
})

export type MessageInput = z.infer<typeof messageScheme>
