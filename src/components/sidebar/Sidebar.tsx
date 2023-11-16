import React from 'react'

import Header from '@/components/sidebar/Header'
import Rooms from '@/components/sidebar/Rooms'

const Sidebar = () => {
  return (
    <div className="md:w-[300px] sm:w-[230px] w-screen md:h-screen">
      <Header />
      <Rooms />
    </div>
  )
}

export default Sidebar
