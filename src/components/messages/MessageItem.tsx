'use client'

import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'

import useCurrentUser from '@/hooks/useCurrentUser'
import type { Message } from '@/types/Message'

type MessageItemProps = {
  message: Message
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const { data: currentUser } = useCurrentUser()
  const isCurrentUserMessage = currentUser?.id === message.userId

  return (
    <div className="mt-[10px] mx-0 mb-0">
      <div className={`flex ${isCurrentUserMessage && 'justify-end'}`}>
        <div className="text-black text-[10px] sm:text-xs md:text-sm">
          {message.user.name}
        </div>
        <div className="text-gray-400 text-[10px] sm:text-xs md:text-sm pl-[10px]">
          {format(new Date(message.createdAt), 'yyyy/MM/dd hh:mm:ss')}
        </div>
      </div>
      {message.content && (
        <div className="mt-[10px]">
          <div
            className={`text-black text-xs sm:text-sm ${
              message.image || 'mb-10'
            } ${isCurrentUserMessage && 'text-right'}`}
          >
            {message.content}
          </div>
        </div>
      )}
      {message.image && (
        <div
          className={`mt-[10px] ${
            isCurrentUserMessage && 'flex justify-end'
          } mb-10`}
        >
          <Image
            width={100}
            height={100}
            src={message.image}
            alt="message image"
            className="max-w-full h-auto"
          />
        </div>
      )}
    </div>
  )
}

export default MessageItem
