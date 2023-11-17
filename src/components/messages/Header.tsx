import React from 'react'

import type { Room } from '@/types/Room'

type HeaderProps = {
  room?: Room
}

const Header: React.FC<HeaderProps> = ({ room }) => {
  return (
    <div className="h-24 py-0 px-10 flex justify-between">
      <div className="text-black text-sm md:text-2xl sm:text-base mt-9">
        {room?.name}
      </div>
      <div className="mt-10">
        <span className="no-underline border border-solid border-red-900 text-red-900 p-3 sm:p-5 sm:text-xs md:text-base transition duration-200 hover:brightness-200">
          チャットを終了する
        </span>
      </div>
    </div>
  )
}

export default Header
