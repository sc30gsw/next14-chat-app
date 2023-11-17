import { z } from 'zod'

export const editAccountScheme = z.object({
  name: z.string().min(8, 'please enter at least 8 characters'),
  email: z.string().min(1, 'email is required').email('format is incorrect'),
})

export type EditAccountInput = z.infer<typeof editAccountScheme>
