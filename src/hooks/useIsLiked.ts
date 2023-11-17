import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

const useIsLiked = (messageId: string, userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<boolean>(
    `/api/like/${messageId}/${userId}`,
    fetcher,
  )

  return { data, error, isLoading, mutate }
}

export default useIsLiked
