import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { NavLink, useNavigate } from 'react-router-dom'

import { loginUser, } from '@/redux/slices/authSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'




function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    username: '',
    password: ''
  })
  // const [FormData,setFormData] = useState({
  //   email:'',
  //   password:''
  // })

  const { success, message } = useSelector((state) => state.auth);


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(FormData));

    // setTimeout(() => {
    //   if (success === false) {
    //     toast.error("user not login")
    //     navigate("/sign-in")
    //   }
    // }, 800)


  }

  useEffect(() => {
    if (success === true) {
      // If login is successful, show a success toast and navigate to the homepage
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 800);
    }

    if (success === false) {
      // If login fails, show an error toast and navigate to the sign-in page
      toast.error(message);
      setTimeout(() => {
        navigate("/sign-in");
      }, 800);
    }
  }, [success, message]); // Re-run the effect when success changes


  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.id]: e.target.value })
  }

  const googleAuth = async () => {
    toast(
      "🫸 Google Login coming Soon 🫷",
      {
        duration: 4000
      }
    )
    //  window.open("http://localhost:8088/auth/google","_self")

  }




  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign-in</title>
      </Helmet>

      <section className='flex flex-col justify-center items-center h-[85vh] max-w-[1980px]  md:h-[80vh]'>
        <div className="text-4xl mb-6 fixelBlack ">
          <h2>Sign in account</h2>
        </div>

        {/* <button className=' w-[400px] mb-6 flex  justify-center gap-3 items-center py-3 px-10 border rounded-xl'>
          <img src={googleIcon} className='w-[18px]' alt="" /> <p>Sign in with Google</p>
        </button> */}

        <div className="w-[400px] bg-c5/20 mb-6 h-[1px]"></div>

        <section className="border w-[400px] rounded-2xl p-6 mb-4 flex gap-3 justify-evenly">
         <div className="">
         <p>Admin Demo Email</p>
         <div className="w-auto bg-c5/20 mb-3 h-[1px] "></div>
          <p className=''>Email -</p>
          <span>abhi@gmail.com</span>
          <p>Password - </p>
          <span>1111</span>
         </div>
         <div className="">
         <p>User Demo Email</p>
         <div className="w-auto bg-c5/20 mb-3 h-[1px] "></div>
          <p className=''>Email -</p>
          <span>abhishek@gmail.com</span>
          <p>Password - </p>
          <span>1111</span>
         </div>
         
       
        </section>

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



          <button onClick={googleAuth} className="bg-c1 text-5 w-full">
            <div className=" flex border-2 rounded-md p-1.5 justify-between ">
              <div className="w-5 my-auto">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" /><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /><path fill="none" d="M0 0h48v48H0z" /></g></svg>
              </div>
              <span className="mr-16">Continue with Google</span>
              {/* <span className="L6cTce" id="button-label">Continue with Google</span> */}
            </div>
          </button>

          <div className=" flex flex-col justify-start mt-4">
            {/* <div className=" flex items-center gap-2 justify-center">
              <NavLink to={"/forgot-password"} className={"text-c3 underline"}>
                <span>Forgot Password?</span>
              </NavLink>
            </div> */}

            <div className=" flex items-center gap-2 justify-center ">
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