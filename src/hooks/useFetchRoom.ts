import type { Room } from '@/types/Room'

const useFetchRoom = async (roomId: string) => {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/rooms/${roomId}`,
    )

    const room: Room = await response.json()

    return room
  } catch (err) {
    console.log(err)
  }
}

export default useFetchRoom
