'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

import useRooms from '@/hooks/useRooms'
import type { Room } from '@/types/Room'

type HeaderProps = {
  room?: Room
  userId: string
}

const Header: React.FC<HeaderProps> = ({ room, userId }) => {
  const router = useRouter()

  const { mutate: mutateRooms } = useRooms(userId)

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await fetch(`/api/rooms/${room?.id}`)
      if (!response.ok) {
        toast.error('The room has been deleted')
        router.push('/')
        router.refresh()
      }
    }, 5000) // 5秒ごとにチェック

    // コンポーネントがアンマウントされたときにインターバルをクリア
    return () => clearInterval(intervalId)
  }, [room, router])

  const handleClick = async () => {
    try {
      await fetch(`/api/rooms/${room?.id}`, {
        method: 'DELETE',
      })
      mutateRooms()
      toast.success('Successful delete room')
      router.push('/')
      router.refresh()
    } catch (err) {
      console.log(err)
      toast.error('Failed delete room')
    }
  }
  return (
    <div className="h-24 py-0 px-10 flex justify-between">
      <div className="text-black text-sm md:text-2xl sm:text-base mt-9">
        {room?.name}
      </div>
      <div className="mt-5">
        <button
          onClick={handleClick}
          className="no-underline border border-solid border-red-900 text-red-900 p-3 sm:p-5 sm:text-xs md:text-base transition duration-200 hover:brightness-200"
        >
          チャットを終了する
        </button>
      </div>
    </div>
  )
}

export default Header
