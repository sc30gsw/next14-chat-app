import React from 'react'

const MessageList = () => {
  return (
    <div className="bg-gray-100 h-[calc(100vh-96px-90px)] px-10 pt-[46px] pb-0 overflow-scroll">
      <div className="mt-[10px] mx-0 mb-0">
        <div className="flex justify-end">
          <div className="text-black text-[10px] sm:text-xs md:text-sm">
            username
          </div>
          <div className="text-gray-400 text-[10px] sm:text-xs md:text-sm pl-[10px]">
            2023/11/16 09:13:28
          </div>
        </div>
        <div className="mt-[10px]">
          <div className="text-black text-xs sm:text-sm mb-10 text-right">
            testMessage
          </div>
        </div>
      </div>
      <div className="mt-[10px] mx-0 mb-0">
        <div className="flex">
          <div className="text-black text-[10px] sm:text-xs md:text-sm">
            username
          </div>
          <div className="text-gray-400 text-[10px] sm:text-xs md:text-sm pl-[10px]">
            2023/11/16 09:13:28
          </div>
        </div>
        <div className="mt-[10px]">
          <div className="text-black text-xs sm:text-sm mb-10">testMessage</div>
        </div>
      </div>
      <div className="mt-[10px] mx-0 mb-0">
        <div className="flex">
          <div className="text-black text-[10px] sm:text-xs md:text-sm">
            username
          </div>
          <div className="text-gray-400 text-[10px] sm:text-xs md:text-sm pl-[10px]">
            2023/11/16 09:13:28
          </div>
        </div>
        <div className="mt-[10px]">
          <div className="text-black text-xs sm:text-sm mb-10">testMessage</div>
        </div>
      </div>
    </div>
  )
}

export default MessageList
