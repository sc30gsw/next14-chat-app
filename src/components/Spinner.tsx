import React from 'react'

const Spinner = ({ color = 'border-blue-500' }: { color?: string }) => {
  return (
    <div className="h-full py-16 flex justify-center bg-slate-800">
      <div
        className={`h-10 w-10 animate-spin rounded-full border-4 ${color} border-t-transparent`}
      ></div>
    </div>
  )
}

export default Spinner
