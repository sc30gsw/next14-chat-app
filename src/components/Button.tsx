import React from 'react'

type ButtonProps = {
  type?: 'reset' | 'button' | 'submit'
  label: string
  isChat?: boolean
}

const Button: React.FC<ButtonProps> = ({ type, label, isChat }) => {
  return (
    <button
      type={type}
      className={`text-white bg-sky-400 border-0 rounded-md text-center shadow-md hover:opacity-70 ${
        isChat
          ? 'text-sm sm:text-base h-[50px] ml-[15px] px-4 sm:w-[75px] w-3/12'
          : 'mt-5 h-12 px-8'
      }`}
    >
      {label}
    </button>
  )
}

export default Button
