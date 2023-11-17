import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

type RoomParams = {
  params: { roomId: string }
}

export const GET = async (req: NextRequest, { params }: RoomParams) => {
  try {
    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    if (!params.roomId)
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    const room = await prisma.room.findUnique({
      where: { id: params.roomId },
      include: { roomUsers: true },
    })

    if (!room)
      return NextResponse.json({ message: 'Room not found' }, { status: 404 })

    return NextResponse.json(room, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export const DELETE = async (req: NextRequest, { params }: RoomParams) => {
  try {
    if (req.method !== 'DELETE')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    if (!params.roomId)
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    const room = await prisma.room.delete({ where: { id: params.roomId } })

    if (!room)
      return NextResponse.json({ message: 'Room not found' }, { status: 404 })

    return NextResponse.json(room, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
