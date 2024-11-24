import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/Footer'

function Root() {
  return (
    <>
      <Navbar />
      <div className="bg-color1 max-w-[1800px] mx-auto ">
        <Outlet />
      </div>
      <Footer/>
    </>
  )
}

export default Root