import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { NavLink } from 'react-router-dom'
function ForgotPassword() {
  return (
    <section className='flex flex-col justify-center items-center md:h-[80vh]'>
  <div className="text-2xl mb-6">
    <h2>Forgot Password to your account</h2>
  </div>
    <form className="grid w-full max-w-sm items-center gap-1.5 *:mb-3">

       <Label htmlFor="email">Email</Label>
       <Input type="email" id="email" placeholder="Email" />

       <Label htmlFor="password">Password</Label>
       <Input type="password" id="password" placeholder="Password" />
       <Button type="submit">Forgot Password</Button>
     </form>
     <div className=" flex flex-col justify-start">
 <NavLink to={"/sign-in"} className={"text-c3"}>
 <span>Sign in</span>
     </NavLink>
 
 
 </div>
 
 </section>
  )
}

export default ForgotPassword