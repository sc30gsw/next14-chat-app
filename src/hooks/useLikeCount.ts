import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

const useLikeCount = (messageId: string) => {
  const { data, error, isLoading, mutate } = useSWR<number>(
    messageId === '3b40b0b9-eaa2-44ba-b361-92ca653fb667'
      ? null
      : `/api/like/${messageId}`,
    fetcher,
  )

  return { data, error, isLoading, mutate }
}

export default useLikeCount
