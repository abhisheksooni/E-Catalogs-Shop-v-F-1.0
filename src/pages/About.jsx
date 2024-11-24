import React from 'react'

function About() {
  return (<>
    <section className='max-w-[1440px] mx-auto *:mb-8 lg:*:mb-12 px-5 xl:px-0'>

      {/* section 1 */}
      <section className='bg-c7  w-full rounded-3xl text-center py-14 my-6 '>
        <p className='text-c5 text-4xl font-semibold uppercase'>About Us</p>
      </section>

      {/* section 2 */}
      <section className=' w-full flex flex-col xl:flex-row justify-between gap-8 xl:gap-14 '>
        <div className=" *:rounded-2xl">
          <img src="https://cdn.prod.website-files.com/6607ad03b43fbbc8045dfbf0/660ce40da03240bf84ca8643_about-image-01..jpg" alt="" />
        </div>

        <div className=" ">
          <p className='lg:leading-[75px] text-[36px] md:text-[46px] lg:text-[53px] font-semibold mb-[38px]'>Our Journey of tee creation from concept to cotton</p>
          <img className='rounded-2xl ' src="https://cdn.prod.website-files.com/6607ad03b43fbbc8045dfbf0/660ce418a03240bf84ca8ea1_about-image-02.jpg" alt="" />

        </div>
      </section>
      {/* section 3 */}
      <section className=''>
        <p className=' text-center text-xl text-c5/40'>Pleasure and so read the was hope entire first decided the so must have as on was want up of I will rival in came this touched got a physics to traveling so all especially refinement monstrous desk they was arrange the overall helplessly out of particularly ill are purer</p>
      </section>

      {/* section 4 */}
      <section className=' flex justify-center lg:justify-between my-20 flex-wrap gap-10'>
        <div className=" px-10 py-5 bg-c7 rounded-2xl max-w-[290px] flex flex-col justify-center text-center gap-2">
          <img className='w-[50px] mx-auto' src="https://cdn.prod.website-files.com/6607ad03b43fbbc8045dfbf0/66337d6e2c821df5df7a7777_icon-01.svg" alt="" />
          <p className='font-semibold text-xl'>Free Shipping</p>
          <p className='text-c5/40'>Enjoy the freedom of hassle-free deliveries with our Free Shipping service</p>
        </div>
        <div className=" px-10 py-5 bg-c7 rounded-2xl max-w-[290px] flex flex-col justify-center text-center gap-2">
          <img className='w-[50px] mx-auto' src="https://cdn.prod.website-files.com/6607ad03b43fbbc8045dfbf0/66337d6ea535cb60640edc89_icon-02.svg" alt="" />
          <p className='font-semibold text-xl'>Fast Delivery</p>
          <p className='text-c5/40'>With our Fast Delivery service, your order will be expedited to reach you in no time.</p>
        </div>
        <div className=" px-10 py-5 bg-c7 rounded-2xl max-w-[290px] flex flex-col justify-center text-center gap-2">
          <img className='w-[50px] mx-auto' src="https://cdn.prod.website-files.com/6607ad03b43fbbc8045dfbf0/66337d6e846825e2042039e2_icon-03.svg" alt="" />
          <p className='font-semibold text-xl'>100% Quality Guarantee</p>
          <p className='text-c5/40'>Rest easy knowing your satisfaction is our top priority!</p>
        </div>
        <div className=" px-10 py-5 bg-c7 rounded-2xl max-w-[290px] flex flex-col justify-center text-center gap-2">
          <img className='w-[50px] mx-auto' src="https://cdn.prod.website-files.com/6607ad03b43fbbc8045dfbf0/66337d6f802dc81ccabaea29_icon-04.svg" alt="" />
          <p className='font-semibold text-xl'>Ecowave efficiency</p>
          <p className='text-c5/40'>Experience the pinnacle of sustainability with Ecowave Efficiency!</p>
        </div>
      </section>
      {/* section 5 */}
      <section className=' flex justify-center lg:justify-between my-20 flex-wrap gap-10'>
        <div className=" max-w-[280px]">
          <p className='text-7xl font-semibold'>15K +</p>
          <p>Each number in this milestone represents a satisfied customer.</p>
        </div>
        <div className=" max-w-[280px]">
          <p className='text-7xl font-semibold'>8 +</p>
          <p>Each experience is a chapter in the grand story of Trendzy.</p>
        </div>
        <div className=" max-w-[280px]">
          <p className='text-7xl font-semibold'>15</p>
          <p>Fashionable, comfy, and quality shirts loved by many.</p>
        </div>
        <div className=" max-w-[280px]">
          <p className='text-7xl font-semibold'>92%</p>
          <p>Mostly natural ingredients for a purer, cleaner choice.</p>
        </div>
      </section>


    </section>

  </>
  )
}

export default About