import { z } from 'zod'

export const messageScheme = z
  .object({
    content: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
  })
  .refine((data) => data.content || data.image, {
    message: 'Either message or image is required',
    path: ['content'], // エラーを表示するフィールドを指定
  })

export type MessageInput = z.infer<typeof messageScheme>
