import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import type { UseFormReset, UseFormSetError } from 'react-hook-form'
import toast from 'react-hot-toast'

import useCurrentUser from '@/hooks/useCurrentUser'
import type { CreateRoomInput } from '@/types/CreateRoomInput'

const useCreateRoom = () => {
  const router = useRouter()
  const { data: currentUser } = useCurrentUser()

  const handleCreateRoom = useCallback(
    async (
      data: CreateRoomInput,
      reset: UseFormReset<CreateRoomInput>,
      setError: UseFormSetError<CreateRoomInput>,
    ) => {
      try {
        const { name, userId } = data
        if (userId === currentUser?.id) {
          setError('userId', {
            type: 'manual',
            message: 'User cannot be selected',
          })

          return
        }

        const response = await fetch('/api/rooms/new', {
          method: 'POST',
          headers: { ContentType: 'application/json' },
          body: JSON.stringify({
            name,
            userId,
            currentUserId: currentUser?.id,
          }),
        })

        if (!response.ok) {
          const error = await response.json()
          if (error.message === 'User not found')
            setError('userId', { type: 'manual', message: error.message })
          return
        }

        toast.success('Chat room created!')
        router.push('/')
        router.refresh()
        reset()
      } catch (err) {
        console.log(err)

        toast.error('Chat room not created')
      }
    },
    [currentUser?.id, router],
  )

  return { handleCreateRoom }
}

export default useCreateRoom
