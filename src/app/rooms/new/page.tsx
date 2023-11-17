import React from 'react'

import Form from '@/components/rooms/Form'
import useFetchUsers from '@/hooks/useFetchUsers'

const NewRoomPage = async () => {
  const fetchedUsers = await useFetchUsers()
  const users = fetchedUsers?.users

  return (
    <div className="md:w-[980px] w-full my-[60px] mx-auto px-10 pt-10 pb-20 bg-white border border-solid border-gray-300 box-border">
      <h1 className="text-center font-bold text-2xl tracking-wider">
        新規チャットルーム
      </h1>
      <Form users={users} />
    </div>
  )
}

export default NewRoomPage
