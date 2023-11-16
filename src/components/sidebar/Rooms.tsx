import Link from 'next/link'
import React from 'react'

const Rooms = () => {
  return (
    <div className="h-full sm:h-[calc(100vh-96px)] bg-slate-800 py-0 px-5 overflow-scroll">
      <div className="pt-5 pb-10 px-0">
        {/* 作られた順に表示 */}
        {/* ルーム作成画面ではユーザーも作成順にでる */}
        <Link
          href="/rooms/1/messages"
          className="no-underline text-white transition duration-200 hover:opacity-70"
        >
          room
        </Link>
      </div>
    </div>
  )
}

export default Rooms
