import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import type { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import prisma from '@/libs/prismadb'

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password)
          throw new Error('Invalid Credentials')

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.hashedPassword)
          throw new Error('Email does not exists')

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        )

        if (!isCorrectPassword) throw new Error('Incorrect password')

        return user
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      if (session.user) session.user.id = token.sub as string

      return session
    },
  },
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions
