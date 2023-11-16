'use client'

import React from 'react'

type ImageUploaderProps = {
  existsMessage: boolean
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ existsMessage }) => {
  return (
    <label
      htmlFor="fileInput"
      className={`relative text-xs text-white p-3 w-[60px] my-[5px] mx-[10px] text-center ${
        existsMessage
          ? 'shadow-md bg-sky-500 transition duration-200 hover:opacity-70'
          : 'bg-sky-200'
      }`}
    >
      画像
      <input
        disabled={existsMessage}
        value={undefined}
        id="fileInput"
        type="file"
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0"
      />
    </label>
  )
}

export default ImageUploader
