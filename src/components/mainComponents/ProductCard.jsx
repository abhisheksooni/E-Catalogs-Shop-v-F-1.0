import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

// image 
import demoImg from "@/Images/men.jpg"

function ProductCard({ ProductName, Price, ProductImage, slug,key }) {
  const [Hover, Sethover] = useState(false)
  const [cataloguesData, setCataloguesData] = useState(null)

  return (
    <>
      <NavLink key={key} to={`/catelogues/catelogues-details/${slug}`} className='w-[46%] md:w-full  max-w-[335px] ' >
        {/* image md:w-[270px]  md:h-[345px]  w-[160px]  h-[213px] */}
        <div className={` ease-out duration-200 ${Hover ? "scale-[.97]" : "scale-100"}`}>
          <img src={ProductImage ? ProductImage : demoImg} alt="" loading='lazy' className=' rounded-xl bg-slate-400' />
        </div>
        {/* detel */}
        <div className=" pl-0.5 md:pl-2">
          <p className='pt-1.5 fixelMedium  md:text-xl text-c5 uppercase'>{ProductName.substring(0, 14)} {ProductName.length > 14 ? "..." : ""}</p>
          <p className='pt-1.5 fixelMedium hidden md:gird md:text-xl text-c5 uppercase'>{ProductName.substring(0, 20)} {ProductName.length > 20 ? "..." : ""}</p>
          <p className='text-text1'> Rs. {Price} <s className='text-sm ml-1'>{Price + 199}</s></p>

        </div>
      </NavLink>
    </>
  )
}

export default ProductCard