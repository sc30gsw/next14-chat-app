import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useCallback } from 'react'
import type { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

import type { SignInInput } from '@/types/SignInInput'

const useSignIn = () => {
  const router = useRouter()

  const handleSignIn = useCallback(
    async (data: SignInInput, reset: UseFormReset<SignInInput>) => {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })
      if (result?.error) {
        toast.error('login failed')
        router.push(
          `/error?message=${encodeURIComponent('AuthenticationError')}`,
        )
      } else {
        toast.success('login successful')
        router.push('/')
      }
      reset()
    },
    [router],
  )

  return { handleSignIn }
}

export default useSignIn
