import useSWR from 'swr'

import fetcher from '@/libs/fetcher'
import type { Message } from '@/types/Message'

const useMessages = (roomId: string) => {
  const { data, error, isLoading, mutate } = useSWR<Message[]>(
    `/api/rooms/${roomId}/messages`,
    fetcher,
  )

  const addMessage = (message: Message) =>
    mutate((messages) => [...(messages || []), message], false)

  return { data, addMessage, error, isLoading }
}

export default useMessages
