import { signIn } from 'next-auth/react'
import { useCallback } from 'react'
import type { UseFormReset, UseFormSetError } from 'react-hook-form'
import toast from 'react-hot-toast'

import type { SignUpInput } from '@/types/SignUpInput'

const useSignUp = () => {
  const handleSignUp = useCallback(
    async (
      data: SignUpInput,
      setError: UseFormSetError<SignUpInput>,
      reset: UseFormReset<SignUpInput>,
    ) => {
      try {
        const response = await fetch('/api/auth/signUp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          const error = await response.json()
          if (error.message === 'Email is taken')
            setError('email', { type: 'manual', message: error.message })

          return
        }

        toast.success('Account created.')

        await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: '/',
        })

        reset()
      } catch (err) {
        toast.error('something went wrong')
      }
    },
    [],
  )

  return handleSignUp
}

export default useSignUp
