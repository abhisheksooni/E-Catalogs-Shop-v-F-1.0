import React from 'react'
import { Clock, Phone, Instagram, MapPin, ArrowUpFromDot } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import LogoIcon from "../Images/logo/LogoIcon.png"
function Footer() {
  return (
    <>
      <section className=' bg-c7 p-3  rounded-t-2xl '>
        <div className="flex justify-evenly gap-5 flex-col md:flex-row pl-6 md:pl-3">
          <ul className=' text-text1 hover:*:text-c2 *:flex *:items-center *:gap-2 *:my-3 cursor-pointer'>
            <p className='text-c2 text-xl'>Contacts</p>
            <li ><Clock />08:02 AM - 8:02 PM</li>
            <li> <Phone /> +91 88888-8888</li>
            <li><Instagram />Abhisheksooni</li>
            <li><MapPin />india</li>
          </ul>
          <ul className=' text-text1 hover:*:text-c2 *:flex *:items-center *:gap-2 *:my-3 cursor-pointer'>
            <p className='text-c2 text-xl'>About the store</p>
            <li >About us</li>
            <li> Coustomer reviews</li>
            <li>Contects</li>
            <li></li>
          </ul>
          <ul className=' text-text1 hover:*:text-c2 *:flex *:items-center *:gap-2 *:my-3 cursor-pointer'>
            <p className='text-c2 text-xl'>To buyers</p>
            <li >Delivery and payment</li>
            <li>Dimensional grid</li>
            <li>Exchange and return</li>
            <li>Public offer</li>
          </ul>

          <div className="">
            <p className='text-c2 text-xl pb-4 my-3'>Catalogue</p>
            <ul className='flex flex-wrap *:px-4 *: *:py-1 *:my-2 *:border-2 *:border-text1 hover:*:border-c2 *:rounded-full text-text1 hover:*:text-c2  *:cursor-pointer justify-evenly gap-2'>
              <li>Kits</li>
              <li>Clumsy</li>
              <li>Pants</li>
              <li>Suits</li>

            </ul>
          </div>
        </div>

        <div className=" flex justify-between p-6">
          {/* Logo */}
          <NavLink to={"/"} className=" flex items-end gap-1 cursor-pointe">
            {/* <span className="text-3xl fixelBold text-c2">FORCE</span>
        <span className="fixelMedium text-text1">Brand</span> */}
            <img src={LogoIcon} className="max-w-[50px]" alt="" />
            <div className="">
              <p className="text-xl leading-none">Fashion </p>
              <p className="text-xl fixelBold leading-none">Shop</p>
            </div>
          </NavLink>

          <button onClick={() => window.scroll({ top: 0, behavior: 'smooth' })} className={` text-c2 bg-c1 rounded-full p-4 `}>
            < ArrowUpFromDot strokeWidth={2} />
          </button>
        </div>
      </section>
    </>
  )
}

export default Footer