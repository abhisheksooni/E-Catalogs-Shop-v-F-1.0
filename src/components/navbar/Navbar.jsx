import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { X, Briefcase, User, Menu } from "lucide-react";
import LogoIcon from "../../Images/logo/LogoIcon.png"
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from "@/redux/slices/authSlice.js";



function Navbar() {

    const navigeter = useNavigate();
    const dispatch = useDispatch()

    const cartSlice = useSelector(state=>state.cart)
    const { user, loding, login, localUser } = useSelector(state => state.auth)

    const [openMenu, SetOpenMenu] = useState(false);
    const [TotalCartItem, SetTotalCartItem] = useState(0);

    // local store set up
    const storedUser = localStorage.getItem("setUser");
    const userData = JSON.parse(storedUser)
    const authUser = userData?.user;

    const isAdmin = userData?.isAdmin;

    function scrollTop() {
        SetOpenMenu(false)
        window.scroll({ top: 0, behavior: "smooth" })
    }

    
    function handleLogout() {
        dispatch(logout())
        navigeter("/sign-in")
    }
// useEffect(()=>{
// dispatch(ShowUserCarts())
// },[])
useEffect(()=>{
    if (cartSlice.TotalCarts) {
        SetTotalCartItem(cartSlice.TotalCarts)
    }
},[cartSlice.TotalCarts])
        
        // console.log("cartSlice", cartSlice);
        // console.log("localStore 1 = ", userData);
    return (

        <>
            {/* pc only */}
            <nav className={` ${openMenu ? "hidden" : "inline-block"}  flex items-center py-3 justify-between px-[5vw] lg:flex-row flex-row sticky top-[0px] z-40 bg-c1/70 backdrop-blur-md`}>

                {/* Logo and menu button */}
                <div className=" flex items-center gap-4 ">
                    <button onClick={() => SetOpenMenu(true)} className={`lg:hidden  inline-block`}>
                        <Menu size={36} />
                    </button>
                    <NavLink to={"/"} className=" flex items-end  gap-1 leading-none cursor-pointe">
                       <img src={LogoIcon} className="max-w-[50px]" alt="" />
                       <div className="">
                        <p className="text-xl leading-none">Fashion </p>
                        <p className="text-xl fixelBold leading-none">Shop</p>
                       </div>
                        {/* <p className="fixelMedium">lvvvv</p> */}
                    </NavLink>

                </div>

                {/* End Logo  */}

                {/* Naviget */}
                <div className="hidden lg:flex  items-center justify-evenly w-full ">
                    <ul className=" flex gap-8 fixelMedium *:cursor-pointer hover:*:bg-c7 *:rounded-full *:px-5 *:py-1.5 *:transition *:duration-300 
                    *:ease-in-out">
                        <NavLink to={"/"} className={({ isActive }) => `${isActive ? "bg-c7" : ""}`}>  HOME </NavLink>
                        <NavLink to={"about-us"} className={({ isActive }) => `${isActive ? "bg-c7" : ""}`}>  About Us </NavLink>
                        <NavLink to={"contect-us"} className={({ isActive }) => `${isActive ? "bg-c7" : ""}`}>  Contect </NavLink>
                        <NavLink to={"catelogues/All"} className={({ isActive }) => `${isActive ? "bg-c7" : ""}`}>  Catalogues </NavLink>

                    </ul>
                </div>
                {/* End Naviget  */}

                {/* user icon and data , login , cart ---  pc and mobile both */}
                <div className=" flex gap-3 lg:gap-4 items-center *:bg-slate-500j flex-row ">

                    {/* cart */}
                    <div className="hover:bg-c7 rounded-full cursor-pointer">


                        <NavLink to={"shoping-cart"} className={({ isActive }) => `${isActive ? "bg-c7" : "text-c2"} flex items-center p-2 rounded-full`}>
                            <div className={`  ${TotalCartItem < 1 ? "hidden" : "inline-block"} absolute`}>
                                {/* total item cart */}
                                <div className={` relative -right-4 -top-3 max-w-[18px] min-w-[14px] h-[14px] z-50  rounded-full  text-[8px] font-thin w-full flex items-center justify-center bg-c5 text-c1`}>
                                    <span className="m-auto ">{TotalCartItem}</span>
                                </div>
                            </ div>

                            {/* cart Icon shoping-cart */}
                            <Briefcase />

                        </NavLink>
                    </div>

                    {
                        authUser ? <>
                        <NavLink to={"/user/user-profile"} className={({ isActive }) => `${isActive ? "bg-c7" : "text-c2"} h-10 w-10 border-[2px] border-transparent rounded-full flex items-center justify-center   hover:bg-c6`}>
A
                        </NavLink>
                        </>:<><NavLink to={"sign-in"} className={ ({ isActive }) => `${isActive ? "bg-c7" : ""} p-2 rounded-full hover:bg-c7`}>
                            <User color="#1A1B21" />
                        </NavLink></>
                    }

                    {/* {
                        authUser ? <DropdownMenu >
                            <DropdownMenuTrigger>
                                <NavLink to={"/user/user-profile"} className="border-[2px] border-transparent rounded-full hover:border-c2 p-[2px]">

                                    <Avatar >
                                        <AvatarImage src={authUser.img} />
                                        <AvatarFallback className="uppercase">{authUser.name[0]}</AvatarFallback>
                                    </Avatar>
                                </NavLink>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>

                                <DropdownMenuLabel>My Account</DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <NavLink to={"/user/user-profile"}  >
                                    <DropdownMenuItem className={"flex items-center cursor-pointer"}>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                </NavLink>
                                <NavLink to={isAdmin ? "/user/orders" : "/user/orders"}  >
                                    <DropdownMenuItem className={"flex items-center cursor-pointer"}>
                                        <Package  className="mr-2 h-4 w-4" />
                                        <span>My Orders</span>
                                    </DropdownMenuItem>
                                </NavLink>

                                <NavLink to={isAdmin ? "/admin/dashbord" : "/user/dashbord"}  >
                                    <DropdownMenuItem className={"flex items-center cursor-pointer"}>
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        <span>Dashboard</span>
                                    </DropdownMenuItem>
                                </NavLink>

                               
                                <DropdownMenuItem onClick={handleLogout} className={"flex items-center cursor-pointer"}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                           

                            </DropdownMenuContent>
                        </DropdownMenu> : <NavLink to={"sign-in"} className={ ({ isActive }) => `${isActive ? "bg-c7" : ""} p-2 rounded-full hover:bg-c7`}>
                            <User color="#1A1B21" />
                        </NavLink>
                    } */}


                </div>
                {/* End user icon and data , login , cart ---  pc and mobile both  */}


            </nav>


            {/* on click menu in mobile only  */}
            <div className={`${openMenu ? "inline-block " : "hidden"}   bg-c5/80 backdrop-blur-md  text-c1  h-[100vh]  w-full  max-w-[784px] py-6 sticky top-0 z-50 transition-all duration-300  `}>
                <div className=" flex items-center px-8 pt-5">
                    <span className="text-3xl">LOGO</span>
                    <button onClick={() => SetOpenMenu(false)} className=" absolute right-8 border-2 rounded-full p-2"> <X size={25} /></button>
                </div>

                <div className=" flex flex-col fixelMedium w-full pt-12 h-[90%] justify-center *:my-4 items-center text-4xl uppercase  ">
                    <NavLink to={"/"} onClick={scrollTop} className={({ isActive }) => `${isActive ? "text-c5" : "text-c1"}`}>  HOME </NavLink>
                    <NavLink to={"about-us"} onClick={scrollTop} className={({ isActive }) => `${isActive ? "text-c5" : "text-c1"}`}>  About Us </NavLink>
                    <NavLink to={"contect-us"} onClick={scrollTop} className={({ isActive }) => `${isActive ? "text-c5" : "text-c1"}`}>  Contect </NavLink>
                    <NavLink to={"catelogues/All"} onClick={scrollTop} className={({ isActive }) => `${isActive ? "text-c2" : "text-c1"} `}>  Catalogues </NavLink>
                </div>
            </div>

        </>
    )
}

export default Navbar




