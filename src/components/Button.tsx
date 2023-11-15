import React from 'react'

type ButtonProps = {
  type?: 'reset' | 'button' | 'submit'
  label: string
}

const Button: React.FC<ButtonProps> = ({ type, label }) => {
  return (
    <button
      type={type}
      className="text-white mt-5 bg-sky-400 h-12 py-0 px-8 rounded-md border-0 text-center shadow-md hover:opacity-70"
    >
      {label}
    </button>
  )
}

export default Button
