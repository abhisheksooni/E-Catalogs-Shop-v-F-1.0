import React, { useState } from 'react'
import { X, Plus, Minus } from "lucide-react";




// import img from '../Images/img14.jpg'
function CartCard({ name, price, img, btnf, quantity, gender }) {

  const [setQuntity, setProductQuntity] = useState(quantity)


  return (
    <>
      <div className=" bg-c7 rounded-2xl p-1 md:p-3 mb-3">
        {/* h-[110px] lg:h-[250px]  lg:w-[80%]*/}
        <div className="flex items-center md:items-start gap-2 md:gap-8 ">

          {/* img */}
          <div className="max-w-[100px] w-full rounded-lg lg:rounded-xl  ">
            <img src={img} className=' w-full max-w-[100px] max-h-[125px] object-cover rounded-lg lg:rounded-xl' alt="" />
          </div>

          {/* right info */}
          <div className=" flex flex-col w-full">

            <div className="  flex fixelMedium text-c2 justify-between items-start  ">
              <div className="mb-2  mt-1">
                <p className="  md:text-2xl mb-2">{name.substring(0, 30)} {name.length > 30 ? "..." : ""}</p>
                <p className='text-sm bg-white rounded-full p-0.5 px-3 w-fit'>{gender}</p>
              </div>


              <div className="md:grid hidden">
                <button className="text-c5 bg-white rounded-full hover:bg-c5/50 hover:text-white p-1.5  " onClick={btnf}>
                  <X size={32} />
                </button>
              </div>
              <div className="md:hidden grid absolute z-50 left-auto right-2.5 top-auto ">
                <div className=" ">
                  <button className="text-c5 bg-white rounded-full hover:bg-c5/50 hover:text-white p-1 border border-c5 " onClick={btnf}>
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>


            <div className=" flex justify-between gap-5 md:gap-0  flex-wrap lg:w-[100%]">

              <div className="">
                <div className=" flex  max-w-[130px] justify-center w-full gap-4 md:gap-7 border-2 rounded-full md:px-3 py-1 ">
                  <button onClick={() => setProductQuntity(setQuntity - 1)}><Minus /></button>
                  <span className=" fixelMedium">{setQuntity}</span>
                  <button onClick={() => setProductQuntity(setQuntity + 1)} ><Plus /></button>
                </div>
              </div>
              <div className=" flex justify-end">
                <span className="fixelMedium bg-white  px-3 py-1 md:px-5 rounded-full md:text-xl">Rs. {price}</span>
              </div>
            </div>


          </div>
        </div>

      </div>
    </>
  )
}

export default CartCard