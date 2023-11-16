import type { Room } from '@/types/Room'

const useFetchRooms = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/rooms?userId=${userId}`,
      {
        next: { revalidate: 1 },
      },
    )
    const res = await response.json()
    const rooms: Room[] = res.rooms

    return { rooms }
  } catch (err) {
    console.log(err)
  }
}

export default useFetchRooms
