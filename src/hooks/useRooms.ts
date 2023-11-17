import useSWR from 'swr'

import fetcher from '@/libs/fetcher'
import type { Room } from '@/types/Room'

const useRooms = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<Room[]>(
    `/api/rooms/user?userId=${userId}`,
    fetcher,
  )

  return { data, error, isLoading, mutate }
}

export default useRooms
