import { redirect, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import type { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

import useCurrentUser from '@/hooks/useCurrentUser'
import useMessages from '@/hooks/useMessages'
import type { MessageInput } from '@/types/MessageInput'

const useCreateMessage = (roomId: string) => {
  const { data: currentUser } = useCurrentUser()
  const { addMessage } = useMessages(roomId)
  const router = useRouter()

  const handleCreateMessage = useCallback(
    async (
      data: MessageInput,
      reset: UseFormReset<MessageInput>,
      setBase64: (prev: string) => void,
    ) => {
      if (!currentUser) return redirect('/users/signIn')

      const newMockMessage = {
        id: uuidv4(),
        userId: currentUser.id,
        roomId,
        content: data.content || undefined,
        image: data.image || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: currentUser,
      }

      // オプティミスティックUI更新
      addMessage(newMockMessage)

      try {
        await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUser?.id,
            roomId,
            content: data.content,
            image: data.image,
          }),
        })

        reset()
        setBase64('')
        router.refresh()
      } catch (err) {
        toast.error('Failed create message')
        console.log(err)
      }
    },
    [addMessage, currentUser, roomId, router],
  )

  return { handleCreateMessage }
}

export default useCreateMessage
