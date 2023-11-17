import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

type RoomMessagesParams = {
  params: { roomId: string }
}

export const GET = async (req: NextRequest, { params }: RoomMessagesParams) => {
  try {
    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    if (!params.roomId)
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    const messages = await prisma.message.findMany({
      where: { roomId: params.roomId },
      include: { user: true },
    })

    return NextResponse.json(messages, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
