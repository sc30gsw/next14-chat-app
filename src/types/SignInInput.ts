import { z } from 'zod'

export const signInScheme = z.object({
  email: z.string().min(1, 'email is required').email('format is incorrect'),
  password: z
    .string()
    .min(8, 'please enter at least 8 characters')
    .refine(
      (password: string) => /[A-Za-z]/.test(password) && /[0-9]/.test(password),
      'password must contain both letters and numbers',
    ),
})

export type SignInInput = z.infer<typeof signInScheme>
