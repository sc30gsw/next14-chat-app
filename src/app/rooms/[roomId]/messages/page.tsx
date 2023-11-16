import React from 'react'

import Form from '@/components/messages/Form'
import Header from '@/components/messages/Header'
import MessageList from '@/components/messages/MessageList'
import Sidebar from '@/components/sidebar/Sidebar'
import prisma from '@/libs/prismadb'

export const generateStaticParams = async () => {
  const rooms = await prisma.room.findMany({ include: { roomUsers: true } })

  return rooms.map((room) => ({
    roomId: room.id,
  }))
}

type MessagePageProps = {
  params: { roomId: string }
}

const MessagesPage: React.FC<MessagePageProps> = ({ params }) => {
  return (
    <main className="flex sm:flex-row flex-col">
      <Sidebar />
      <div className="bg-white w-full md:w-[calc(100%-300px)] sm:w-[calc(100%-230px)]">
        <Header />
        <MessageList />
        <Form />
      </div>
    </main>
  )
}

export default MessagesPage
