import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export const POST = async (req: NextRequest) => {
  try {
    if (req.method !== 'POST')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { userId, messageId } = await req.json()

    if (!userId || !messageId)
      return NextResponse.json({ message: 'Invalid Fields' }, { status: 400 })

    const newLike = await prisma.like.create({
      data: { userId, messageId },
    })

    return NextResponse.json(newLike, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    if (req.method !== 'DELETE')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { userId, messageId } = await req.json()

    if (!userId || !messageId)
      return NextResponse.json({ message: 'Invalid Fields' }, { status: 400 })

    const like = await prisma.like.findUnique({
      where: { userId_messageId: { userId, messageId } },
    })

    if (!like)
      return NextResponse.json({ message: 'Like not found' }, { status: 404 })

    const deletedLike = await prisma.like.delete({ where: { id: like.id } })

    return NextResponse.json(deletedLike, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
