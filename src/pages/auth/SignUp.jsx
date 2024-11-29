import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearState, signupUser } from '@/redux/slices/authSlice.js'
import bgimg from "../../Images/login/3318335.jpg"
import googleIcon from "../../Images/login/google_icon.png"
import { Helmet } from 'react-helmet';



function signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(FormData))
    setTimeout(() => {
      dispatch(clearState());
      navigate("/sign-in");

    }, 1000)
  }




  useEffect(() => {
    if (success) {
      dispatch(clearState());
      navigate("/sign-in");
    }
    // { success, dispatch, navigate }
  }, [])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign-Up</title>
      </Helmet>
      <section className='flex justify-center items-center h-[85vh] gap-20 max-w-[1980px] w-full'>

        <section className='flex flex-col justify-center items-center  '>

          <div className="text-4xl mb-6 fixelBlack ">
            <h2>Create account</h2>
          </div>


          <button className=' mb-6 flex w-[400px] justify-center gap-3 items-center py-3 px-10 border rounded-xl'>
            <img src={googleIcon} className='w-[18px]' alt="" /> <p>Sign up with Google</p>
          </button>

          <div className="w-full bg-c5/20 mb-6 h-[1px]"></div>


          <div className="border rounded-2xl p-6 w-full">
            <form onSubmit={handleSubmit} className="grid *:w-full  max-w-sm items-center gap-1.5 *:mb-3 ">
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" placeholder="name" value={FormData.name} onChange={handleChange} />
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" value={FormData.email} onChange={handleChange} />
              {/* <Label htmlFor="number">Number</Label>
      <Input type="number" id="number" placeholder="Number" /> */}
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Password" value={FormData.password} onChange={handleChange} />
              <p>Must be at least 8 characters.</p>
              <Button type="submit" className="my-1 fixel text-lg p-2"><p>Create account</p></Button>
            </form>
            <div className=" flex items-center gap-2 justify-center">
              <p>Already have an account? </p>
              <NavLink to={"/sign-in"} className={"text-c3 underline"}>
                <p>Sign in</p>
              </NavLink>
            </div>
          </div>


        </section>


        {/* <img src={bgimg} className='w-[56rem]' /> */}



      </section>
    </>
  )
}

export default signup