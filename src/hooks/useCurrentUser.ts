import useSWR from 'swr'

import fetcher from '@/libs/fetcher'
import type { User } from '@/types/User'

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR<User>(
    '/api/currentUser',
    fetcher,
  )

  return { data, error, isLoading, mutate }
}

export default useCurrentUser
