import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useCallback } from 'react'
import type { UseFormReset, UseFormSetError } from 'react-hook-form'
import toast from 'react-hot-toast'

import useCurrentUser from '@/hooks/useCurrentUser'
import type { EditAccountInput } from '@/types/EditAccountInput'

const useEditAccount = (userId: string) => {
  const { data: currentUser, mutate } = useCurrentUser()
  const router = useRouter()

  const handleEditAccount = useCallback(
    async (
      data: EditAccountInput,
      setError: UseFormSetError<EditAccountInput>,
      reset: UseFormReset<EditAccountInput>,
    ) => {
      try {
        const email = currentUser?.email
        const response = await fetch(`/api/users/${userId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          const error = await response.json()
          if (error.message === 'Email is taken')
            setError('email', { type: 'manual', message: error.message })

          return
        }

        if (email !== data.email)
          signOut({ callbackUrl: '/users/signIn?message=updateemail' })

        toast.success('Updated successful')
        mutate()
        reset()
        router.push('/')
      } catch (err) {
        console.log(err)

        toast.error('Failed update')
      }
    },
    [currentUser?.email, userId, mutate, router],
  )

  return { handleEditAccount }
}

export default useEditAccount
