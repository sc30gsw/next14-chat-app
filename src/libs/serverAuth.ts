import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

import authOptions from '@/libs/authOptions'
import prisma from '@/libs/prismadb'

const serverAuth = async (req: NextRequest) => {
  const session = await getServerSession(authOptions)

  if (!session) throw new Error('Not signed in')

  const currentUser = await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { email: session.user?.email as string },
  })

  if (!currentUser) throw new Error('Not signed in')

  return { currentUser }
}

export default serverAuth
