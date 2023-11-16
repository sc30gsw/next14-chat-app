import React from 'react'

import Form from '@/components/messages/Form'
import Header from '@/components/messages/Header'
import MessageList from '@/components/messages/MessageList'
import Sidebar from '@/components/sidebar/Sidebar'

const MessagesPage = () => {
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
