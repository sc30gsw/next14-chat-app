import bcrypt from 'bcrypt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export const POST = async (req: NextRequest) => {
  try {
    if (req.method !== 'POST')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { name, email, password, passwordConfirmation } = await req.json()
    console.log(name, email, password, passwordConfirmation)

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser)
      return NextResponse.json({ message: 'Email is taken' }, { status: 422 })

    const hashedPassword = await bcrypt.hash(password, 12)
    const hashedConfirmPassword = await bcrypt.hash(passwordConfirmation, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        emailVerified: new Date(),
        hashedPassword,
        hashedConfirmPassword,
        image: '',
      },
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
