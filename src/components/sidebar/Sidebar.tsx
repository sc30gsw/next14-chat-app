import React, { Suspense } from 'react'

import Header from '@/components/sidebar/Header'
import Rooms from '@/components/sidebar/Rooms'
import Spinner from '@/components/Spinner'

const Sidebar = () => {
  return (
    <div className="md:w-[300px] sm:w-[230px] w-screen md:h-screen">
      <Header />
      <Suspense fallback={<Spinner />}>
        <Rooms />
      </Suspense>
    </div>
  )
}

export default Sidebar
