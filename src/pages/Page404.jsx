import React from 'react'
import { Helmet } from 'react-helmet';
function Page404() {
  return (
  <>
               <Helmet>
        <meta charSet="utf-8" />
        <title>Contect</title>
      </Helmet>
  <div className=" flex flex-col justify-center items-center text-center h-[90vh]">
    <p className='text-9xl font-semibold'>404</p>
    <p className='text-5xl'>Page Not Forund</p>
    <p className='text-xl mt-3'>The page you are looking for doesn't exist or has been moved</p>
  </div>
  </>
  )
}

export default Page404