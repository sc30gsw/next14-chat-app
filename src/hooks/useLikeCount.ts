import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

const useLikeCount = (messageId: string) => {
  const { data, error, isLoading, mutate } = useSWR<number>(
    `/api/like/${messageId}`,
    fetcher,
  )

  return { data, error, isLoading, mutate }
}

export default useLikeCount
