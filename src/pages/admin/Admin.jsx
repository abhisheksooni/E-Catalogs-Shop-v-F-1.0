import React from 'react'
import { BaggageClaim, LayoutDashboard, LogOut, Package, Users } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet';
function Admin() {

  const storedUser = localStorage.getItem("setUser");
  const userData = JSON.parse(storedUser)
  const authUser = userData?.user;
  const isAdmin = userData?.isAdmin;


  return (
    <>
             <Helmet>
    <meta charSet="utf-8" />
    <title>Admin</title>
  </Helmet>
      {/* <h1 className='text-3xl text-center fixelMedium my-4'>Admin </h1> */}
      <section className='flex my-5 gap-3 mx-5'>
        {/* left box */}
        <nav className='lg:w-[300px] *:mb-2.5 *:border-2  border-c5/30  *:rounded-2xl '>
          {/* user image */}
          <div className="flex p-5">
            <img src={authUser.image ? authUser.image : "https://cdn-icons-png.flaticon.com/256/149/149071.png"} className='w-11 h-11' alt="" />
            <div className="ml-3">
              <p className='uppercase'>{authUser.name}</p>
              <p className='text-c2/50'>{authUser.email}</p>
            </div>
          </div>
          {/* user more filds */}
          <div className=" flex flex-col *:mb-1 *:py-3.5 *:px-5 *:bg-slate-300 *:rounded-xl p-1 hover:*:text-c2/70">
            <NavLink to={""} className={({ isActive }) => `${isActive ? "text-c2/70" : "text-c2"} flex items-center `}> <LayoutDashboard className='mr-3' />Dashbord</NavLink>
            <NavLink to={"users"} className={({ isActive }) => `${isActive ? "text-c2/70" : "text-c2"} flex items-center `}> <Users className='mr-3' />Customers</NavLink>

            <NavLink to={"orders"} className={({ isActive }) => `${isActive ? "text-c2/70" : "text-c2"} flex items-center `}> <BaggageClaim className='mr-3' />Orders

            </NavLink>

            <NavLink to={"products"} className={({ isActive }) => `${isActive ? "text-c2/70" : "text-c2"} flex items-center `}> <Package className='mr-3' /><p>Products</p>
            </NavLink>
            <NavLink to={'products/create'} className={({ isActive }) => `${isActive ? "text-c2/70" : "text-c2"} flex items-center `}> <Package className='mr-3' /><p>Create Products</p>
            </NavLink>
            {/* <NavLink to={"products/update"} className={({ isActive }) => `${isActive ? "text-c2/70" : "text-c2"} flex items-center `}> <Package className='mr-3' /><p>Update Products</p>
            </NavLink> */}

            {/* <NavLink to={"categories"} className={({ isActive }) => `${isActive ? "text-c2/70" : "text-c2"} flex items-center `}> <LockKeyhole className='mr-3' />Categories</NavLink> */}
            <button className={`flex items-center justify-start text-c2 `}> <LogOut className='mr-3' />Log Out</button>
          </div>

        </nav >
        {/* right */}
        <section className={`w-full border-2 border-c5/15 rounded-2xl p-5`}>
          <Outlet />
        </section>
      </section>
    </>
  )
}

export default Admin