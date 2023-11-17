import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

const useIsLiked = (messageId: string, userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<boolean>(
    messageId === '3b40b0b9-eaa2-44ba-b361-92ca653fb667'
      ? null
      : `/api/like/${messageId}/${userId}`,
    fetcher,
  )

  return { data, error, isLoading, mutate }
}

export default useIsLiked
