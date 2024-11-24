import { Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import imgsempla from "@/Images/men.jpg"
function AdminProductCard() {
  // {img,stocks,createDate,ProductName,Id}
  let img = imgsempla;
  let stocks = 36;
  let ProductName = "namedsxgfsdasd";
  let createDate = "12/05/2024";


  return (
    <>
      <section className='w-full flex items-center justify-between px-5 bg-c3/10 mb-1 rounded-xl py-1.5'>
        <div className="flex items-center gap-3">
        <img className='max-w-[45px] rounded-md' src={img} alt={img} />
        <span className=' w-full'>{ProductName}</span>
        </div>
        <span>{stocks}</span>
        <span>{createDate}</span>
        <div className="flex gap-3 *:rounded-full">
          <button className='bg-c3 text-white p-1.5'><Pencil /></button>
          <button className='bg-red-500/90 text-white p-1.5'><Trash2 /></button>
        </div>
      </section>
    </>
  )
}

export default AdminProductCard