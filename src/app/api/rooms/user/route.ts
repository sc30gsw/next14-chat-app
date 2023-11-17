import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export const GET = async (req: NextRequest) => {
  try {
    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const searchParams = req.nextUrl.searchParams
    const currentUserId = searchParams.get('userId')

    const rooms = await prisma.room.findMany({
      where: {
        roomUsers: {
          some: {
            userId: currentUserId as string,
          },
        },
      },
      include: {
        roomUsers: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return NextResponse.json(
      { rooms: rooms.length === 0 ? [] : rooms },
      { status: 201 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
