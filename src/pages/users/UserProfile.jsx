
import React from 'react'
import { BaggageClaim, History, LayoutDashboard, LockKeyhole, LogOut, MapPinned, Package, User } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/redux/slices/authSlice.js';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

function UserProfile() {
    const navigeter = useNavigate();
    const dispatch = useDispatch()

    const storedUser = localStorage.getItem("setUser");
    const userData = JSON.parse(storedUser)
    const authUser = userData?.user;
    const isAdmin = userData?.isAdmin;

    // const {  } = useSelector(state => state.auth)

    const handleChange = () => {

    }

    function handleLogout() {
        dispatch(logout())
        navigeter("/sign-in")
    }

    return (
        <>
            <h1 className='text-3xl text-center fixelMedium my-6 ml-10'>Profile</h1>

            <section className=' lg:flex justify-center w-full fixelMedium mx-auto *:rounded-2xl gap-6 p-5 lg:p-10 '>
                {/* left box */}
                <section className='lg:w-[550px] *:mb-5 *:border-2  border-c5/30   gap-6 *:rounded-2xl '>
                    {/* user image */}
                    <div className="flex p-5">
                        <img src={authUser.image ? authUser.image : "https://cdn-icons-png.flaticon.com/256/149/149071.png"} className='w-11 h-11' alt="" />
                        <div className="ml-3">
                            <div className='flex'><p className='uppercase'>{authUser.name}</p>{authUser.roll === 34 ? <p className='ml-3 bg-c3/70 text-white px-3 rounded-full  font-extralight'>Admin</p> : ""}</div>
                            <p className='text-c2/50'>{authUser.email}</p>
                        </div>
                    </div>
                    {/* user more filds */}
                    <div className=" flex flex-col *:mb-0.5 *:py-4 *:px-5 *:bg-slate-300 *:rounded-xl p-1 hover:*:text-c2/70">
                        <NavLink to={""} className={({ isActive }) => `${isActive ? "text-c2/70" : "text-c2"} flex items-center `}> <User className='mr-3' />Personal Data </NavLink>
                        <NavLink to={"/admin/dashbord"} className={({ isActive }) => `${isActive ? "text-c2/70" : "text-c2"} ${isAdmin?"":"hidden"} flex items-center `}>  <LayoutDashboard className="mr-3" />Admin Dashbord</NavLink>
                        <NavLink to={"delivery-addresses"} className={({ isActive }) => `${isActive ? "text-c2/70" : "text-c2"} flex items-center `}> <MapPinned className='mr-3' />Delivery Addresses</NavLink>
                        <NavLink to={"cart"} className={({ isActive }) => `${isActive ? "text-c2/70" : "text-c2"} flex items-center `}> <BaggageClaim className='mr-3' />My Cart</NavLink>
                        <NavLink to={"user-order"} className={({ isActive }) => `${isActive ? "text-c2/70" : "text-c2"} flex items-center `}>  <Package className='mr-3' /> My Orders</NavLink>

                       
                        {/* <NavLink to={"change-password"} className={({ isActive }) => `${isActive ? "text-c2/70" : "text-c2"} flex items-center `}> <LockKeyhole className='mr-3' />Change Password</NavLink> */}
                        <button onClick={handleLogout} className={`flex items-center justify-start text-c2 `}> <LogOut className='mr-3' />Log Out</button>
                    </div>

                </section >

                {/* right */}
                <section className={`w-full border-2 border-c5/20 gap-6  *:rounded-2xl p-4`}>
                    <Outlet />
                </section>
            </section>
        </>
    )
}

export default UserProfile