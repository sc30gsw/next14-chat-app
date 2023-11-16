import Link from 'next/link'
import { getServerSession } from 'next-auth'
import React from 'react'

import authOptions from '@/libs/authOptions'

const Header = async () => {
  const session = await getServerSession(authOptions)

  if (!session) return null
  return (
    <div className="h-24 py-0 px-5 bg-slate-900 flex justify-between items-center">
      <Link
        href="/"
        className="text-base text-white no-underline transition duration-200 hover:opacity-70"
      >
        {session.user?.name}
      </Link>
      <div className="text-[10px]">
        <Link
          href="/rooms/new"
          className="border border-solid border-blue-300 rounded-sm text-sky-400 sm:p-2 p-[14px] no-underline transition duration-200 hover:brightness-200"
        >
          チャットを作成する
        </Link>
      </div>
    </div>
  )
}

export default Header
