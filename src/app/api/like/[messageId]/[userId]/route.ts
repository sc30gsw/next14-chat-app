import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

type LikeMessageParams = {
  params: { messageId: string; userId: string }
}

export const GET = async (req: NextRequest, { params }: LikeMessageParams) => {
  try {
    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    if (!params.messageId || !params.userId)
      return NextResponse.json({ message: 'Invalid Fields' }, { status: 400 })

    const like = await prisma.like.findUnique({
      where: {
        userId_messageId: {
          userId: params.userId,
          messageId: params.messageId,
        },
      },
    })

    return NextResponse.json(!!like, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
