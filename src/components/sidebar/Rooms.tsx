import Link from 'next/link'
import { getServerSession } from 'next-auth'
import React from 'react'

import useFetchRooms from '@/hooks/useFetchRooms'
import authOptions from '@/libs/authOptions'
import type { Room } from '@/types/Room'

const Rooms = async () => {
  const session = await getServerSession(authOptions)
  const fetchedRooms = await useFetchRooms(session?.user?.id as string)
  const rooms = fetchedRooms?.rooms

  return (
    <div className="h-full sm:h-[calc(100vh-96px)] bg-slate-800 py-0 px-5 overflow-scroll">
      <div className="pt-5 pb-10 px-0">
        {/* 作られた順に表示 */}
        {/* ルーム作成画面ではユーザーも作成順にでる */}
        {rooms?.map((room: Room) => (
          <div key={room.id} className="px-0 md:pt-5 md:pb-10 pt-2 pb-4">
            <Link
              href={`/rooms/${room.id}/messages`}
              className="no-underline text-white transition duration-200 hover:opacity-70"
            >
              {room.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Rooms
