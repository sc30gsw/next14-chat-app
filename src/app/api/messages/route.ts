import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export const POST = async (req: NextRequest) => {
  try {
    if (req.method !== 'POST')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { userId, roomId, content, image } = await req.json()

    if (!userId || !roomId || (!content && !image))
      return NextResponse.json({ message: 'Invalid Fields' }, { status: 400 })

    const newMessage = await prisma.message.create({
      data: { userId, roomId, content, image },
    })

    return NextResponse.json(newMessage, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
