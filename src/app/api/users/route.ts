import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

export const GET = async (req: NextRequest) => {
  try {
    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const searchParams = req.nextUrl.searchParams
    const currentUserId = searchParams.get('userId')

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id: { not: currentUserId || '' } },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json(
      { users: users.length === 0 ? [] : users },
      { status: 200 },
    )
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
