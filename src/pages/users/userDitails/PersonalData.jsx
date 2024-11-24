import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

function PersonalData() {

  const storedUser = localStorage.getItem("setUser");
  const user = JSON.parse(storedUser).user

console.log(user);

  const handleChange = () => {

  }


  return (
    <>
      <section>
        <p>update soon</p>
        <form className=' *:rounded-xl *:p-3 *:text-lg *:mb-4'>
          <Label htmlFor="name">Your name and surmane</Label>
          <Input type="text" id="name" placeholder="name" value={user.name} onChange={handleChange} />
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" id="email" placeholder="Email" value={user.email} onChange={handleChange} />

          <Label htmlFor="number">Phone Number</Label>
          <Input type="number" id="number" placeholder="+91 " value={user.phone} onChange={handleChange} />

          <Button type="submit" className="my-1 fixel text-lg py-2 px-6"><p>SAVE</p></Button>
        </form>
      </section>
    </>
  )
}

export default PersonalData