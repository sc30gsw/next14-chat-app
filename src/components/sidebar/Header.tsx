'use client'

import Link from 'next/link'
import React from 'react'

import useCurrentUser from '@/hooks/useCurrentUser'

const Header = () => {
  const { data: currentUser } = useCurrentUser()

  return (
    <div className="h-24 py-0 px-5 bg-slate-900 flex justify-between items-center">
      <Link
        href={`/users/${currentUser?.id}`}
        className="text-base text-white no-underline transition duration-200 hover:opacity-70"
      >
        {currentUser?.name}
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
