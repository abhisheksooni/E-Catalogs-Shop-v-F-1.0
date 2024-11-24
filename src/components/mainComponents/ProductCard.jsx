import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

// image 
import demoImg from "@/Images/men.jpg"

function ProductCard({ ProductName, Price, ProductImage, slug }) {
  const [Hover, Sethover] = useState(false)
  const [cataloguesData, setCataloguesData] = useState(null)

  return (
    <>
      <NavLink to={`/catelogues/catelogues-details/${slug}`} className=''>
        {/* image */}
        <div className={` ease-out duration-200 ${Hover ? "scale-[.97]" : "scale-100"}`}>
          <img src={ProductImage ? ProductImage : demoImg} alt="" loading='lazy' className=' w-[160px] h-[213px]  md:h-[345px] md:w-[270px] rounded-xl bg-slate-400' />
        </div>
        {/* detel */}
        <div className=" pl-0.5 md:pl-2">
          <p className='pt-1.5 fixelMedium md:hidden md:text-xl text-c5 uppercase'>{ProductName.substring(0, 14)} {ProductName.length > 14 ? "..." : ""}</p>
          <p className='pt-1.5 fixelMedium hidden md:gird md:text-xl text-c5 uppercase'>{ProductName.substring(0, 20)} {ProductName.length > 20 ? "..." : ""}</p>
          <p className='text-text1'> Rs. {Price}</p>
        </div>
      </NavLink>
    </>
  )
}

export default ProductCard