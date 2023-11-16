'use client'

import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const ErrorPage = () => {
  const params = useSearchParams()
  const message = params.get('message')

  const url = message === 'AuthenticationError' ? '/users/signIn' : '/'
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="sm:text-2xl text-lg font-semibold text-red-500 mb-4">
        Something Went Wrong
      </h1>
      <Link
        href={url}
        className="text-blue-600 border border-blue-600 px-4 py-2 text-sm rounded hover:bg-blue-600 hover:text-white transition-colors"
      >
        Try again
      </Link>
    </div>
  )
}

export default ErrorPage
