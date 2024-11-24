import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { NavLink, useNavigate } from 'react-router-dom'

import googleIcon from "../../Images/login/google_icon.png"

import { loginUser, } from '@/redux/slices/authSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'




function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [FormData,setFormData] = useState({
    email:'',
    password:''
  })
  
  const {user,loading,error,login,success} = useSelector((state) => state.auth);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(FormData));

     setTimeout(()=>{
      if (success === false) {
        toast.error("user not login")
        navigate("/sign-in")
        }
    },800)

      
}
 
 
  // if (login != false) {
  //   // toast.success("login user")
  //   setTimeout(()=>{
  //     navigate("/")
  //   },800)
  // } 
  if (login === true) {
    toast.success("login user")
    setTimeout(()=>{
      navigate("/")
    },800)
  } 

const handleChange= (e)=>{
setFormData({...FormData,[e.target.id]:e.target.value})
}

useEffect(()=>{
  
},[])
  
console.log("success",success);


  return (
    <>
      <section className='flex flex-col justify-center items-center h-[85vh] max-w-[1980px]  md:h-[80vh]'>
        <div className="text-4xl mb-6 fixelBlack ">
          <h2>Sign in account</h2>
        </div>

        {/* <button className=' w-[400px] mb-6 flex  justify-center gap-3 items-center py-3 px-10 border rounded-xl'>
          <img src={googleIcon} className='w-[18px]' alt="" /> <p>Sign in with Google</p>
        </button> */}

        <div className="w-[400px] bg-c5/20 mb-6 h-[1px]"></div>

        <section className="border w-[400px] rounded-2xl p-6">
          <form onSubmit={handleSubmit} className='grid *:w-full  w-full  max-w-sm items-center gap-1.5 *:mb-3'>
            <Label htmlFor="email"  >Email</Label>
            <Input type="email" id="email" placeholder="" className="w-64 "
              value={FormData.email}
              onChange={handleChange} />

            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="" className=""
              value={FormData.password}
              onChange={handleChange} />

            <Button type="submit" className={`my-1 fixel text-lg p-2`}>
              <span>Login</span>
            </Button>
          </form>

          <div className=" flex flex-col justify-start">
            {/* <div className=" flex items-center gap-2 justify-center">
              <NavLink to={"/forgot-password"} className={"text-c3 underline"}>
                <span>Forgot Password?</span>
              </NavLink>
            </div> */}

            <div className=" flex items-center gap-2 justify-center">
              <NavLink to={"/sign-up"} className={"text-c3 underline"}>
                <p>Create a Account</p>
              </NavLink>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default SignIn