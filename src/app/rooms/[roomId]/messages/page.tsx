import React, { Suspense } from 'react'

import Form from '@/components/messages/Form'
import Header from '@/components/messages/Header'
import MessageList from '@/components/messages/MessageList'
import Sidebar from '@/components/sidebar/Sidebar'
import Spinner from '@/components/Spinner'
import useFetchRoom from '@/hooks/useFetchRoom'
import prisma from '@/libs/prismadb'

export const generateStaticParams = async () => {
  const rooms = await prisma.room.findMany({
    include: { roomUsers: true },
  })

  return rooms.map((room) => ({
    roomId: room.id,
  }))
}

type MessagePageProps = {
  params: { roomId: string }
}

const MessagesPage: React.FC<MessagePageProps> = async ({ params }) => {
  const room = await useFetchRoom(params.roomId)

  return (
    <main className="flex sm:flex-row flex-col">
      <Sidebar />
      <div className="bg-white w-full md:w-[calc(100%-300px)] sm:w-[calc(100%-230px)]">
        <Suspense fallback={<Spinner />}>
          <Header room={room} />
          <MessageList roomId={params.roomId} />
          <Form roomId={params.roomId} />
        </Suspense>
      </div>
    </main>
  )
}

export default MessagesPage
