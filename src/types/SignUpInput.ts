import { z } from 'zod'

export const signUpScheme = z
  .object({
    name: z.string().min(8, 'please enter at latest 8 characters'),
    email: z.string().min(1, 'email is required').email(),
    password: z
      .string()
      .min(8, 'please enter at least 8 characters')
      .refine(
        (password: string) =>
          /[A-Za-z]/.test(password) && /[0-9]/.test(password),
        'password must contain both letters and numbers',
      ),
    passwordConfirmation: z.string(),
  })
  .refine(
    (data: {
      name: string
      email: string
      password: string
      passwordConfirmation: string
    }) => data.password === data.passwordConfirmation,
    {
      message: 'passwords do not match',
      path: ['passwordConfirmation'],
    },
  )

export type SignUpInput = z.infer<typeof signUpScheme>
