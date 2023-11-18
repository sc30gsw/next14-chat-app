import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import type { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

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
      if (!currentUser) return

      const newMockMessage = {
        id: '3b40b0b9-eaa2-44ba-b361-92ca653fb667',
        userId: currentUser.id,
        roomId,
        content: data.content,
        image: data.image,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: currentUser,
      }

      // オプティミスティックUI更新
      addMessage(newMockMessage)

      setBase64('')

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
