import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

type UserParams = {
  params: { userId: string }
}

export const PATCH = async (req: NextRequest, { params }: UserParams) => {
  try {
    if (req.method !== 'PATCH')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    if (!params.userId)
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { id: params.userId } })

    if (!user)
      return NextResponse.json({ message: 'User not found' }, { status: 404 })

    const { name, email } = await req.json()

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        id: {
          not: params.userId,
        },
      },
    })

    if (existingUser)
      return NextResponse.json({ message: 'Email is taken' }, { status: 422 })

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { name, email },
    })

    return NextResponse.json(updatedUser, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
