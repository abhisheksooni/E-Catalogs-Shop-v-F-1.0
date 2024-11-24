import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Costomers() {

const [users,setUsers] = useState([])



  const a = async () => {
    const {data} = await axios.get(`http://localhost:8088/api/v1/user/users`)
    // console.log(data);
    setUsers(data.users)
    // console.log(data.products);

  }

  useEffect(()=>{
    a()
  },[])

  console.log(users);
  
  return (
    <>
    <section>
     {
      users?.map((user)=>(
        <div key={user._id} className=" border p-1 mb-1">
        <p>{user.name}</p>
        
      </div>
      ))
     }
    </section>
    </>
  )
}

export default Costomers