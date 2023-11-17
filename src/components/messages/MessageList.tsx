'use client'

import React from 'react'

import MessageItem from '@/components/messages/MessageItem'
import useMessages from '@/hooks/useMessages'
import type { Message } from '@/types/Message'

type MessageListProps = {
  roomId: string
}

const MessageList: React.FC<MessageListProps> = ({ roomId }) => {
  const { data: messages } = useMessages(roomId)

  return (
    <div className="bg-gray-100 h-[calc(100vh-96px-90px)] px-10 pt-[46px] pb-0 overflow-scroll">
      {messages?.map((message: Message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessageList
