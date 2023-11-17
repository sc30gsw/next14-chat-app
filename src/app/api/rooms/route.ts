import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export const POST = async (req: NextRequest) => {
  try {
    if (req.method !== 'POST')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { name, userId, currentUserId } = await req.json()

    const exitingUser = await prisma.user.findUnique({ where: { id: userId } })

    if (!exitingUser)
      return NextResponse.json({ message: 'User not found' }, { status: 400 })

    const newRoom = await prisma.room.create({
      data: {
        name,
      },
      select: {
        id: true,
      },
    })

    const newRoomUser = await prisma.roomUser.create({
      data: {
        userId,
        roomId: newRoom.id,
      },
    })

    const newRoomUserOfCurrentUser = await prisma.roomUser.create({
      data: {
        userId: currentUserId,
        roomId: newRoom.id,
      },
    })

    return NextResponse.json(
      {
        room: newRoom,
        roomUser: newRoomUser,
        roomUserWithCurrentUser: newRoomUserOfCurrentUser,
      },
      { status: 201 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
