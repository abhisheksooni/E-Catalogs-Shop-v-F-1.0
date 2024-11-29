import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from "react-router-dom";
import "../App.css"
import { Plus, Minus, ArrowUpRight, Grid } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import demoImg from "@/Images/men.jpg"
import ArrowButton from '@/components/mainComponents/ArrowButton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import axios from 'axios';
import ProductCard from '@/components/mainComponents/ProductCard';
import { ShowUserCarts } from '@/redux/slices/cartsSlice';
import { products } from '@/redux/slices/productSlice';
import Loding from '@/components/mainComponents/Loding/Loding';
import ReviewCard from '@/components/ReviewCard';
import { Helmet } from 'react-helmet';

function Home() {

  const [productData, setproductData] = useState([]);

  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.products)
  // carts total navbat
  useEffect(() => {
    dispatch(ShowUserCarts())

  }, [])
  useEffect(() => {
    dispatch(products("All"))

  }, [])

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setproductData(data.slice(0, 8))
    }
  }, [data])


  const [hoverFemale, SetHoverFemale] = useState(false);
  const [hoverMale, SetHoverMale] = useState(false);
  const [hoverSell, SetHoverSell] = useState(false);
  const [cataloguesData, setCataloguesData] = useState(null)

  let img = "https://image.hm.com/ffc/share/assets/2024/6030/6030-3x2-Panthera-Top-Image-M.png?imwidth=2160"

  // const selector = useSelector((state)=> state.click)
  // const dispatch = useDispatch()
  // const [open, SetOpen] = useState(false);
  // const [TotalItems, SetTotalItems] = useState(Number);


  // useEffect(()=>{  
  //   (()=>SetTotalItems(selector.length))()   
  //   console.log(TotalItems);
  // },[selector,TotalItems])


  const [menCategoryHover, setMenCategoryHover] = useState(false)
  const [womenCategoryHover, setWomenCategoryHover] = useState(false)
  const [kidsCategoryHover, setKidsCategoryHover] = useState(false)


  function CategoryHover() {

  }


  // console.log("loading", loading);



  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <section className='max-w-[1440px] w-full mx-auto mt-4 px-[20px] xl:px-0'>
        {/* section 1 */}
        <section className='Hero-section-1 border rounded-2xl w-full py-16 px-4 lg:py-40 lg:px-12'>
          <h2 className='text-4xl lg:text-[58px] text-textcolor1 font-bold max-w-[550px] mx-auto leading-[35px] lg:leading-[60px]'>The hidden gems in fashion trends</h2>
          <p className=' text-textcolor2 max-w-[550px] mx-auto mt-5 lg:mt-0'>Step into the realm of unparalleled style with our unbeatable t-shirt trendsetter of today.</p>

          <div className=" flex justify-center gap-6 lg:gap-5 *:bg-white *:py-4 *:px-12 *:rounded-xl mt-8">
            <NavLink to={"/catelogues/Male"} className={`hover:bg-c5 hover:text-c1 hover:scale-95`} >Men</NavLink>
            <NavLink to={"/catelogues/Female"} className={`hover:bg-c5 hover:text-c1 hover:scale-95`} >Women</NavLink>
          </div>
        </section>
        {/* section 2 */}
        <section className='mt-6 lg:mt-10 pt-8 lg:pt-0'>
          <div className="">
            <span className=' text-3xl md:text-4xl font-semibold '>Recent products</span>
          </div>

          {/* resent  Products w-[270px] h-[345px] */}
          <div className="flex flex-wrap gap-5 lg:gap-10 justify-center py-5 lg:py-10">

            {loading ? <>
              <Loding />
            </> :
              productData.map(item => (
                <NavLink key={item._id} to={`/catelogues/catelogues-details/${item.slug}`} className="bg-c6/60 rounded-2xl max-w-[330px]  w-[46.2%] lg:w-full  bg:blur-sm hover:bg-c6 transition delay-75 ease-in-out  ">
                  <div className="absolute z-10 bg-c1 px-3 mx-4 my-3.5 py-0.5 rounded-full">{item.gender}</div>
                  <div className={` w-full ease-out duration-200 mx-auto p-1.5`}>
                    <img src={item.images[0]} alt="" loading='lazy' className=' w-full  rounded-xl bg-slate-400 hover:scale-[.97] transition delay-75 ease-in-out' />
                  </div>
                  {/* detel */}
                  <div className="pl-2 lg:pl-4">
                    <p className='pt-1.5 fixelMedium lg:text-xl text-c5 uppercase'>{item.title.substring(0, 20)} {item.title.length > 20 ? "..." : ""}</p>
                    <p className='text-text1 text-sm lg:text-base mb-2'> Rs. {item.price}</p>
                  </div>
                </NavLink>
              ))
            }
          </div>

        </section>
        {/* section 3 */}
        <section className='text-center max-w-[800px] mx-auto'>
          <p className=' lg:text-[24px] text-textcolor2'>Love the quality and style of the clothes I ordered from this website! The shipping was super fast too. Definitely my go-to for trendy fashion finds!</p>
          <p>start add ####</p>
        </section>


        {/* section-4 Customer reviews */}
        <section className="mx-auto  my-7   bg-c7 px-5 pb-10 rounded-2xl">
          {/* <div className=" flex flex-wrap items-center justify-between py-9 gap-5 md:gap-0 lg:px-[10vw]"> */}
          <div className="text-center  py-9 ">
            <span className=" text-3xl  text-c2">Customer reviews</span>
          </div>

          {/* <DarkButton /> */}
          {/* </div> */}

          {/* reviews */}
          <div className="flex snap-x *:snap-always *:snap-start snap-mandatory xl:justify-center gap-5 overflow-x-scroll no-scrollbar">
            <ReviewCard srcImg={'https://img.freepik.com/free-psd/3d-illustration-person-with-long-hair_23-2149436197.jpg?size=626&ext=jpg'} Name={"Rohan"} />
            <ReviewCard srcImg={'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?size=626&ext=jpg'} Name={"Shiv"} />
            <ReviewCard srcImg={'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671140.jpg?size=626&ext=jpg'} Name={"Rina"} />
            <ReviewCard srcImg={'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671124.jpg?size=626&ext=jpg&ga=GA1.1.1970010351.1709309137&semt=sph'} Name={"Shivam"} />

          </div>
        </section>

        {/* section 5 */}
        <section className='flex gap-5 lg:gap-14 my-14 flex-wrap-reverse justify-center  rounded-3xl'>

          <div onMouseEnter={() => setMenCategoryHover(true)} onMouseLeave={() => setMenCategoryHover(false)} className="max-w-[570px] *:rounded-2xl relative">
            <div className="">
              <div className={`${menCategoryHover ? "flex duration-100 " : "hidden"}  justify-center items-center bg-c2/5 w-full h-full absolute rounded-2xl backdrop-blur-[2px] `}>
                <div className="px-4 py-1.5">
                  <div className="   rounded-full text-6xl font-semibold text-c1 ">Men</div>
                  <div className="w-24 h-1.5 duration-100 rounded-full bg-c1 mt-3"></div>
                </div>
              </div>
            </div>
            <img src="https://cdn.prod.website-files.com/6607bf6b9d59d5c6248298a2/6607db64f61d2d8da10d113b_men.jpg" alt="" />
          </div>

          <div className=" pt-5 flex flex-col bottom-0 ">
            <p className=' text-3xl md:text-4xl lg:text-5xl font-semibold' >Shop by category</p>
            <NavLink to={"/catelogues/All"} className='border text-center px-6 py-4 rounded-2xl mt-[30px]' >View All Products</NavLink>
            <div className="flex gap-5 lg:gap-14 *:max-w-[375px]  *:rounded-2xl mt-[40px]">
              <div className="*:rounded-2xl relative">
                <div className={`${womenCategoryHover ? "" : "hidden"}bg-c2/15 w-full h-full absolute rounded-2xl `}>
                  <div className="  px-4 py-1.5 rounded-full text-xl bg-c2 text-c1 absolute z-10  left-[20px] bottom-[20px] ">Woman</div>
                </div>

                <img src="https://cdn.prod.website-files.com/6607bf6b9d59d5c6248298a2/6607db6de825fc2c60ca4ce2_women.jpg" alt="" />
              </div>
              {/* kids */}
              <div className="relative ">
                <div className="">
                  <div className={`${kidsCategoryHover ? "" : "hidden"}bg-c2/15 w-full h-full absolute rounded-2xl `}>
                    <div className="  px-4 py-1.5 rounded-full text-xl bg-c2 text-c1 absolute z-10  left-[20px] bottom-[20px] ">Kids</div>
                  </div>
                  <img src="https://cdn.prod.website-files.com/6607bf6b9d59d5c6248298a2/6607dc963f551ea6b785022f_kid.jpg" className='rounded-2xl' alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default Home


//         {/* Home Section 1  max-w-[1200px] w-full my-7*/}
//         <section className="px-5 xl:px-0">
//           <div className="flex gap-3 flex-col md:flex-row justify-center h-full ">
//             {/* Boxs-1 */}
//             <div className=" hidden md:inline-block ">
//               <NavLink to={"catalogue"} >
//                 <div
//                   onMouseEnter={() => SetHoverFemale(true)}
//                   onMouseLeave={() => SetHoverFemale(false)}
//                   className="  relative womenimg  w-[370px] h-[48.5%] rounded-2xl hover:scale-[.97] cursor-pointer ease-out duration-200 m-0 lg:m-0 md:mt-1.5">
//                   <div className={` text-c2 bg-c1/60 rounded-full p-2 absolute right-3 top-3`}>
//                     <div className={`   rounded-full p-[2px] transform ease-linear duration-200
//           ${hoverFemale ? 'rotate-45' : 'rotate-0'} `} >
//                       <ArrowUpRight strokeWidth={2} />
//                     </div>
//                   </div>
//                 </div >
//               </NavLink>

//               <NavLink to={"catalogue"} >

//                 <div
//                   onMouseEnter={() => SetHoverMale(true)}
//                   onMouseLeave={() => SetHoverMale(false)}
//                   className=" relative menimg  w-[370px] h-[48.5%] rounded-2xl hover:scale-[.97] cursor-pointer ease-out duration-200 mt-[4%]">
//                   <div className={` text-c2 bg-c1/60 rounded-full p-2 absolute right-3 top-3`}>
//                     <div className={`   rounded-full p-[2px] transform ease-linear duration-200
//           ${hoverMale ? 'rotate-45' : 'rotate-0'} `} >
//                       <ArrowUpRight strokeWidth={2} />
//                     </div>
//                   </div>
//                 </div>
//               </NavLink>


//             </div>



//             {/* Box-2 */}
//             <div className=" w-full lg:max-w-[60%]">
//               {/* <NavLink to={"catalogue"}>
//                 <div className="flex items-center justify-between  bg-c2 pl-4 p-2 py-3.5 text-c1 rounded-full hover:scale-[.97] cursor-pointer ease-out duration-200 mb-3">
//                   <p className="text-xl">Catalogue</p>
//                   <div className={`   rounded-full p-[2px] transform ease-linear mr-3 duration-200
//           ${hoverSell ? 'rotate-45' : 'rotate-0'} `} >
//                     <ArrowUpRight strokeWidth={2} />
//                   </div>
//                 </div>
//               </NavLink> */}

//               {/* Scroll items lg:h-[85.5%]*/}
//               {/* <div className="m-0.5 flex snap-x overflow-x-auto no-scrollbar snap-mandatory *:snap-center *:object-cover gap-3 rounded-2xl *:rounded-2xl hover:scale-[.98] cursor-pointer ease-out duration-200 h-[60vh]  lg:h-[53.5vh]a  bg-black"> */}
//               {/*
//                 <img src={img} className=" snap-always  " alt="" />
//                 <img src={img} className=" snap-always " alt="" />
//                 <img src={img} className=" snap-always " alt="" />
//                 <img src={img} className=" snap-always " alt="" />
//                 <img src={img} className=" snap-always " alt="" /> */}

//               {/* </div> */}


//               <Carousel
//                 plugins={[plugin.current]}
//                 className="w-full "
//                 onMouseEnter={plugin.current.stop}
//                 onMouseLeave={plugin.current.reset}

//               >
//                 <CarouselContent>
//                   {Array.from({ length: 1 }).map((_, p) => (
//                     <CarouselItem key={p}>
//                       <img src={img} className=" w-full rounded-2xl" alt="" />

//                     </CarouselItem>
//                   ))}
//                   {/* {
//              cataloguesData?.map((p)=>(<div key={p._id}  >
//               <ProductCard ProductName={p.name} Price={p.price} ProductImage={p.image} slug={p.slug} />
//         </div>))
//         } */}
//                 </CarouselContent>
//                 {/* <CarouselPrevious /> */}
//                 {/* <CarouselNext /> */}
//               </Carousel>

//             </div>
//             {/* box 4 only < 768 wigth */}
//             <div className=" flex md:hidden w-full gap-3 my-3">
//               {/* <NavLink to={"catalogue"}> */}
//               <NavLink to={"catalogue"} className=" relative bg-c3 text-c1 w-full rounded-2xl ">
//                 {/* <ArrowBtn addClass={"absolute right-3 top-3"} /> */}
//                 <p className="pl-5 py-7 ">
//                   Men's <br /> Clothes
//                 </p>
//               </NavLink>
//               {/* </NavLink> */}

//               <NavLink to={"catalogue"} className=" relative bg-c4 text-c1 w-full rounded-2xl">
//                 {/* <ArrowBtn addClass={"absolute right-3 top-3"} /> */}
//                 <p className="pl-5 py-7 ">
//                   women's <br /> Clothes
//                 </p>
//               </NavLink>

//             </div>
//           </div>
//         </section>

//         <div className=" flex items-center justify-center gap-12 bg-c2 *:text-white *:p-10 *:flex-col  my-5">

// <div className=" flex items-center justify-center">
// <svg class="ugb-custom-icon " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" xml:space="preserve" aria-hidden="true" width="50" height="50" fill='#ffffff'>
//   <path d="M22.8 33.9H6c-1.4 0-2.5-1.2-2.5-2.6V14h43.3v7.6c0 .9.8 1.7 1.7 1.7 1 0 1.8-.7 1.8-1.7v-12c0-3.3-2.7-6.1-6-6.1H6c-3.3 0-6 2.8-6 6.1v21.7c0 3.3 2.7 6.1 6 6.1H22.9c1 0 1.7-.8 1.7-1.8s-.8-1.7-1.8-1.7zM6 7h38.3c1.4 0 2.5 1.2 2.5 2.6v.9H3.5v-.9C3.5 8.2 4.6 7 6 7zm.6 16c0-1 .8-1.8 1.8-1.8h4.7c1 0 1.8.7 1.8 1.7s-.7 1.8-1.7 1.8H8.4c-1 .1-1.8-.7-1.8-1.7zm0 5.9c0-1 .8-1.8 1.8-1.8h9.4c1 0 1.7.8 1.7 1.8 0 .9-.8 1.7-1.7 1.7H8.4c-1 0-1.8-.8-1.8-1.7zm34.9-4.3c-7.4 0-13.5 6-13.5 13.5 0 7.4 6 13.5 13.5 13.5C49 51.5 55 45.5 55 38c0-7.4-6-13.4-13.5-13.4zm0 24C35.7 48.6 31 43.8 31 38s4.7-10.5 10.5-10.5S52.1 32.2 52.1 38s-4.8 10.6-10.6 10.6zm5.2-14c.6.6.6 1.5 0 2.1l-5.5 5.5c-.3.3-.7.4-1 .4-.4 0-.8-.1-1-.4l-2.8-2.8c-.6-.6-.6-1.5 0-2.1.6-.6 1.5-.6 2.1 0l1.8 1.8 4.4-4.4c.5-.7 1.4-.7 2-.1z"></path>
// </svg>

//   <p className='text-2xl font-medium mt-3'>Secure Payment</p>
//   <p className='text-c1/70 text-sm'>100% secure payment</p>
// </div>
// <div className="flex items-center justify-center">
// <svg class="ugb-custom-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" xml:space="preserve" aria-hidden="true" width="50" height="50" fill='#ffffff'>
//   <path d="M54.8 24.5c-.1-.9-.9-1.5-1.8-1.4-.9.1-1.5.9-1.4 1.8 1.5 13.3-8.2 25.3-21.5 26.8-.9.1-1.8.1-2.7.1-7.5 0-14.6-3.4-19.3-9.3h3.2c.8-.1 1.4-.8 1.4-1.7 0-.8-.6-1.5-1.4-1.6H4.5c-.4 0-.9.1-1.2.4-.3.4-.5.8-.5 1.3v7.3s0 1.2 1.6 1.2c.7.2 1.4-.4 1.6-1.1v-3.4c7.3 8.9 19.3 12.3 30.3 8.7 12.2-4.1 19.9-16.2 18.5-29.1zm-54.6 6c.1.9.9 1.5 1.8 1.4.9-.1 1.5-.9 1.4-1.8C1.9 16.8 11.5 4.8 24.8 3.4c.9-.1 1.8-.1 2.7-.1 7.5 0 14.6 3.4 19.3 9.3h-3.2c-.8.1-1.4.8-1.4 1.7 0 .8.6 1.5 1.4 1.6h6.9c.4 0 .9-.1 1.2-.4.3-.4.5-.8.5-1.3V6.7s0-1.2-1.6-1.2c-.7-.1-1.4.5-1.6 1.2v3.4C41.7 1.3 29.7-2.2 18.8 1.4 6.5 5.5-1.2 17.6.2 30.5zm25.1-3 3.8 2.8c.2.2.3.5.1.8-.1.1-.3.2-.4.2h-1.2c-.3 0-.6-.2-.6-.6 0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6 0 1.7 1.1 3.2 2.8 3.6v.1c0 .9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6v-.1c1.6-.5 2.8-2 2.8-3.7 0-1.2-.6-2.3-1.5-3l-3.8-2.8c-.2-.2-.3-.5-.1-.8.1-.1.3-.2.4-.2h1.2c.3 0 .6.2.6.6 0 .9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6 0-1.7-1.1-3.2-2.8-3.6v-.1c0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6v.1c-2 .6-3.2 2.6-2.6 4.6.2.9.6 1.6 1.3 2.1zm2.9 13.8c7.5 0 13.6-6.1 13.6-13.6s-6.1-13.6-13.6-13.6-13.6 6.1-13.6 13.6 6.1 13.5 13.6 13.6zm0-24c5.7 0 10.4 4.7 10.4 10.4S33.9 38 28.2 38s-10.4-4.7-10.4-10.4 4.6-10.3 10.4-10.3z"></path>
// </svg>
//   <p className='text-2xl font-medium mt-3'>30 Days Return</p>
//   <p className='text-c1/70 text-sm'>If goods have problems</p>
// </div>
// <div className="flex items-center justify-center">
// <svg class="ugb-custom-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" xml:space="preserve" aria-hidden="true" width="50" height="50" fill='#ffffff'>
//   <path d="M27.5 0C14.2 0 3.3 10.8 3.3 24.2v13.1c0 2.7 2.2 4.8 4.8 4.8H10c.9 2.5 3.6 3.8 6.2 2.9 1.9-.7 3.2-2.5 3.2-4.6v-13c0-2.7-2.2-4.8-4.8-4.8-2 0-3.9 1.3-4.6 3.2H8.1c-.5 0-1.1.1-1.6.3v-1.9c-.2-11.6 9-21.1 20.6-21.3 11.6-.2 21.1 9 21.3 20.6V26.1c-.5-.2-1.1-.3-1.6-.3h-1.9c-.9-2.5-3.6-3.8-6.2-2.9-1.9.7-3.2 2.5-3.2 4.6v13.1c0 2.7 2.2 4.8 4.8 4.8.5 0 .9-.1 1.4-.2-.6 2-2.5 3.4-4.6 3.4H32c-.9-2.5-3.7-3.8-6.2-2.9-2.5.9-3.8 3.7-2.9 6.2.9 2.5 3.7 3.8 6.2 2.9 1.4-.5 2.5-1.6 2.9-2.9h5.1c4.4 0 8.1-3.6 8.1-8.1v-1.6h1.6c2.7 0 4.8-2.2 4.8-4.8V24.2C51.7 10.8 40.8 0 27.5 0zM13 27.4c0-.9.8-1.6 1.7-1.6.9 0 1.5.7 1.6 1.6v13.1c0 .9-.8 1.6-1.7 1.6-.9 0-1.5-.7-1.6-1.6V27.4zM8.2 29h1.6v9.9H8.2c-.9 0-1.6-.7-1.6-1.6v-6.7c0-.9.7-1.6 1.6-1.6zm19.3 22.8c-.9 0-1.6-.7-1.6-1.6 0-.9.7-1.6 1.6-1.6.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6zM42 40.5c0 .9-.8 1.6-1.7 1.6-.9 0-1.5-.7-1.6-1.6V27.4c0-.9.8-1.6 1.7-1.6.9 0 1.5.7 1.6 1.6v13.1zm6.4-3.2c0 .9-.7 1.6-1.6 1.6h-1.6V29h1.6c.9 0 1.6.7 1.6 1.6v6.7z"></path>
// </svg>
//   <p className='text-2xl font-medium mt-3'>24/7 Support</p>
//   <p className='text-c1/70 text-sm'>Dedicated support</p>
// </div>
// <div className="flex items-center justify-center flex-col">
// <svg class="ugb-custom-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" xml:space="preserve" aria-hidden="true" width="50" height="50" fill='#ffffff'>
//   <path d="m32.8 13.5 3.8 2.8c.2.2.3.5.1.8-.1.1-.3.2-.4.2h-1.2c-.3 0-.6-.2-.6-.6 0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6 0 1.7 1.1 3.2 2.8 3.6v.1c0 .9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6v-.1c1.6-.5 2.8-2 2.8-3.7 0-1.2-.6-2.3-1.5-3l-3.8-2.8c-.2-.2-.3-.5-.1-.8.1-.1.3-.2.4-.2h1.2c.3 0 .6.2.6.6 0 .9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6 0-1.7-1.1-3.2-2.8-3.6 0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6v.1c-2 .6-3.2 2.6-2.6 4.6.1.8.6 1.5 1.3 2zm2.9 13.7c7.5 0 13.6-6.1 13.6-13.6S43.2 0 35.6 0C28.1 0 22 6.1 22 13.6c.1 7.5 6.1 13.6 13.7 13.6zm0-24C41.4 3.2 46 7.9 46 13.6S41.4 24 35.6 24c-5.7 0-10.4-4.7-10.4-10.4.1-5.7 4.7-10.4 10.5-10.4zm18.2 27.7c-1.7-2.2-4.9-2.7-7.2-1.1l-6.1 4.1c-.9-1.6-2.6-2.7-4.5-2.7h-4.4c-4.8-4.5-12.4-4.3-16.9.5-.7.8-1.3 1.6-1.8 2.5l-.8.5-.2-.6c-.3-.8-1.2-1.3-2-1l-8.9 3c-.8.3-1.3 1.2-1 2l5.4 15.7c.3.8 1.2 1.3 2 1l8.9-3c.8-.3 1.3-1.2 1-2v-.1l14.1-.4c3.8 0 7.5-1.2 10.7-3.4l10.6-7.6c2.4-1.7 2.9-5 1.2-7.3l-.1-.1zM8 51.3 3.7 38.7l5.8-2 4.3 12.7L8 51.3zm42.9-15.6-10.6 7.6c-2.6 1.8-5.7 2.8-8.8 2.8l-15.1.5-3-8.7 1.8-1.1c.3-.2.5-.4.6-.7 2.1-4.3 7.4-6.1 11.7-4 .9.5 1.8 1.1 2.5 1.8.3.3.7.5 1.2.5h5c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8h-9.1c-.9 0-1.6.7-1.6 1.6 0 .9.7 1.6 1.6 1.6h9.1c2.3 0 4.4-1.6 4.9-3.9l7.5-5c.9-.6 2.2-.4 2.8.5.6 1 .4 2.3-.5 2.9z"></path>
// </svg>
//   <p className='text-2xl font-medium mt-3'>Free Delivery</p>
//   <p className='text-c1/70 text-sm'>1For all order over 8,000</p>
// </div>
//         {/* Home Section 1  max-w-[1200px] w-full my-7*/}
//         <section className="px-5 xl:px-0">
//           <div className="flex gap-3 flex-col md:flex-row justify-center h-full ">
//             {/* Boxs-1 */}
//             <div className=" hidden md:inline-block ">
//               <NavLink to={"catalogue"} >
//                 <div
//                   onMouseEnter={() => SetHoverFemale(true)}
//                   onMouseLeave={() => SetHoverFemale(false)}
//                   className="  relative womenimg  w-[370px] h-[48.5%] rounded-2xl hover:scale-[.97] cursor-pointer ease-out duration-200 m-0 lg:m-0 md:mt-1.5">
//                   <div className={` text-c2 bg-c1/60 rounded-full p-2 absolute right-3 top-3`}>
//                     <div className={`   rounded-full p-[2px] transform ease-linear duration-200
//           ${hoverFemale ? 'rotate-45' : 'rotate-0'} `} >
//                       <ArrowUpRight strokeWidth={2} />
//                     </div>
//                   </div>
//                 </div >
//               </NavLink>

//               <NavLink to={"catalogue"} >

//                 <div
//                   onMouseEnter={() => SetHoverMale(true)}
//                   onMouseLeave={() => SetHoverMale(false)}
//                   className=" relative menimg  w-[370px] h-[48.5%] rounded-2xl hover:scale-[.97] cursor-pointer ease-out duration-200 mt-[4%]">
//                   <div className={` text-c2 bg-c1/60 rounded-full p-2 absolute right-3 top-3`}>
//                     <div className={`   rounded-full p-[2px] transform ease-linear duration-200
//           ${hoverMale ? 'rotate-45' : 'rotate-0'} `} >
//                       <ArrowUpRight strokeWidth={2} />
//                     </div>
//                   </div>
//                 </div>
//               </NavLink>


//             </div>



//             {/* Box-2 */}
//             <div className=" w-full lg:max-w-[60%]">
//               {/* <NavLink to={"catalogue"}>
//                 <div className="flex items-center justify-between  bg-c2 pl-4 p-2 py-3.5 text-c1 rounded-full hover:scale-[.97] cursor-pointer ease-out duration-200 mb-3">
//                   <p className="text-xl">Catalogue</p>
//                   <div className={`   rounded-full p-[2px] transform ease-linear mr-3 duration-200
//           ${hoverSell ? 'rotate-45' : 'rotate-0'} `} >
//                     <ArrowUpRight strokeWidth={2} />
//                   </div>
//                 </div>
//               </NavLink> */}

//               {/* Scroll items lg:h-[85.5%]*/}
//               {/* <div className="m-0.5 flex snap-x overflow-x-auto no-scrollbar snap-mandatory *:snap-center *:object-cover gap-3 rounded-2xl *:rounded-2xl hover:scale-[.98] cursor-pointer ease-out duration-200 h-[60vh]  lg:h-[53.5vh]a  bg-black"> */}
//               {/*
//                 <img src={img} className=" snap-always  " alt="" />
//                 <img src={img} className=" snap-always " alt="" />
//                 <img src={img} className=" snap-always " alt="" />
//                 <img src={img} className=" snap-always " alt="" />
//                 <img src={img} className=" snap-always " alt="" /> */}

//               {/* </div> */}


//               <Carousel
//                 plugins={[plugin.current]}
//                 className="w-full "
//                 onMouseEnter={plugin.current.stop}
//                 onMouseLeave={plugin.current.reset}

//               >
//                 <CarouselContent>
//                   {Array.from({ length: 1 }).map((_, p) => (
//                     <CarouselItem key={p}>
//                       <img src={img} className=" w-full rounded-2xl" alt="" />

//                     </CarouselItem>
//                   ))}
//                   {/* {
//              cataloguesData?.map((p)=>(<div key={p._id}  >
//               <ProductCard ProductName={p.name} Price={p.price} ProductImage={p.image} slug={p.slug} />
//         </div>))
//         } */}
//                 </CarouselContent>
//                 {/* <CarouselPrevious /> */}
//                 {/* <CarouselNext /> */}
//               </Carousel>

//             </div>
//             {/* box 4 only < 768 wigth */}
//             <div className=" flex md:hidden w-full gap-3 my-3">
//               {/* <NavLink to={"catalogue"}> */}
//               <NavLink to={"catalogue"} className=" relative bg-c3 text-c1 w-full rounded-2xl ">
//                 {/* <ArrowBtn addClass={"absolute right-3 top-3"} /> */}
//                 <p className="pl-5 py-7 ">
//                   Men's <br /> Clothes
//                 </p>
//               </NavLink>
//               {/* </NavLink> */}

//               <NavLink to={"catalogue"} className=" relative bg-c4 text-c1 w-full rounded-2xl">
//                 {/* <ArrowBtn addClass={"absolute right-3 top-3"} /> */}
//                 <p className="pl-5 py-7 ">
//                   women's <br /> Clothes
//                 </p>
//               </NavLink>

//             </div>
//           </div>
//         </section>

//         <div className=" flex items-center justify-center gap-12 bg-c2 *:text-white *:p-10 *:flex-col  my-5">

// <div className=" flex items-center justify-center">
// <svg class="ugb-custom-icon " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" xml:space="preserve" aria-hidden="true" width="50" height="50" fill='#ffffff'>
//   <path d="M22.8 33.9H6c-1.4 0-2.5-1.2-2.5-2.6V14h43.3v7.6c0 .9.8 1.7 1.7 1.7 1 0 1.8-.7 1.8-1.7v-12c0-3.3-2.7-6.1-6-6.1H6c-3.3 0-6 2.8-6 6.1v21.7c0 3.3 2.7 6.1 6 6.1H22.9c1 0 1.7-.8 1.7-1.8s-.8-1.7-1.8-1.7zM6 7h38.3c1.4 0 2.5 1.2 2.5 2.6v.9H3.5v-.9C3.5 8.2 4.6 7 6 7zm.6 16c0-1 .8-1.8 1.8-1.8h4.7c1 0 1.8.7 1.8 1.7s-.7 1.8-1.7 1.8H8.4c-1 .1-1.8-.7-1.8-1.7zm0 5.9c0-1 .8-1.8 1.8-1.8h9.4c1 0 1.7.8 1.7 1.8 0 .9-.8 1.7-1.7 1.7H8.4c-1 0-1.8-.8-1.8-1.7zm34.9-4.3c-7.4 0-13.5 6-13.5 13.5 0 7.4 6 13.5 13.5 13.5C49 51.5 55 45.5 55 38c0-7.4-6-13.4-13.5-13.4zm0 24C35.7 48.6 31 43.8 31 38s4.7-10.5 10.5-10.5S52.1 32.2 52.1 38s-4.8 10.6-10.6 10.6zm5.2-14c.6.6.6 1.5 0 2.1l-5.5 5.5c-.3.3-.7.4-1 .4-.4 0-.8-.1-1-.4l-2.8-2.8c-.6-.6-.6-1.5 0-2.1.6-.6 1.5-.6 2.1 0l1.8 1.8 4.4-4.4c.5-.7 1.4-.7 2-.1z"></path>
// </svg>

//   <p className='text-2xl font-medium mt-3'>Secure Payment</p>
//   <p className='text-c1/70 text-sm'>100% secure payment</p>
// </div>
// <div className="flex items-center justify-center">
// <svg class="ugb-custom-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" xml:space="preserve" aria-hidden="true" width="50" height="50" fill='#ffffff'>
//   <path d="M54.8 24.5c-.1-.9-.9-1.5-1.8-1.4-.9.1-1.5.9-1.4 1.8 1.5 13.3-8.2 25.3-21.5 26.8-.9.1-1.8.1-2.7.1-7.5 0-14.6-3.4-19.3-9.3h3.2c.8-.1 1.4-.8 1.4-1.7 0-.8-.6-1.5-1.4-1.6H4.5c-.4 0-.9.1-1.2.4-.3.4-.5.8-.5 1.3v7.3s0 1.2 1.6 1.2c.7.2 1.4-.4 1.6-1.1v-3.4c7.3 8.9 19.3 12.3 30.3 8.7 12.2-4.1 19.9-16.2 18.5-29.1zm-54.6 6c.1.9.9 1.5 1.8 1.4.9-.1 1.5-.9 1.4-1.8C1.9 16.8 11.5 4.8 24.8 3.4c.9-.1 1.8-.1 2.7-.1 7.5 0 14.6 3.4 19.3 9.3h-3.2c-.8.1-1.4.8-1.4 1.7 0 .8.6 1.5 1.4 1.6h6.9c.4 0 .9-.1 1.2-.4.3-.4.5-.8.5-1.3V6.7s0-1.2-1.6-1.2c-.7-.1-1.4.5-1.6 1.2v3.4C41.7 1.3 29.7-2.2 18.8 1.4 6.5 5.5-1.2 17.6.2 30.5zm25.1-3 3.8 2.8c.2.2.3.5.1.8-.1.1-.3.2-.4.2h-1.2c-.3 0-.6-.2-.6-.6 0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6 0 1.7 1.1 3.2 2.8 3.6v.1c0 .9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6v-.1c1.6-.5 2.8-2 2.8-3.7 0-1.2-.6-2.3-1.5-3l-3.8-2.8c-.2-.2-.3-.5-.1-.8.1-.1.3-.2.4-.2h1.2c.3 0 .6.2.6.6 0 .9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6 0-1.7-1.1-3.2-2.8-3.6v-.1c0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6v.1c-2 .6-3.2 2.6-2.6 4.6.2.9.6 1.6 1.3 2.1zm2.9 13.8c7.5 0 13.6-6.1 13.6-13.6s-6.1-13.6-13.6-13.6-13.6 6.1-13.6 13.6 6.1 13.5 13.6 13.6zm0-24c5.7 0 10.4 4.7 10.4 10.4S33.9 38 28.2 38s-10.4-4.7-10.4-10.4 4.6-10.3 10.4-10.3z"></path>
// </svg>
//   <p className='text-2xl font-medium mt-3'>30 Days Return</p>
//   <p className='text-c1/70 text-sm'>If goods have problems</p>
// </div>
// <div className="flex items-center justify-center">
// <svg class="ugb-custom-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" xml:space="preserve" aria-hidden="true" width="50" height="50" fill='#ffffff'>
//   <path d="M27.5 0C14.2 0 3.3 10.8 3.3 24.2v13.1c0 2.7 2.2 4.8 4.8 4.8H10c.9 2.5 3.6 3.8 6.2 2.9 1.9-.7 3.2-2.5 3.2-4.6v-13c0-2.7-2.2-4.8-4.8-4.8-2 0-3.9 1.3-4.6 3.2H8.1c-.5 0-1.1.1-1.6.3v-1.9c-.2-11.6 9-21.1 20.6-21.3 11.6-.2 21.1 9 21.3 20.6V26.1c-.5-.2-1.1-.3-1.6-.3h-1.9c-.9-2.5-3.6-3.8-6.2-2.9-1.9.7-3.2 2.5-3.2 4.6v13.1c0 2.7 2.2 4.8 4.8 4.8.5 0 .9-.1 1.4-.2-.6 2-2.5 3.4-4.6 3.4H32c-.9-2.5-3.7-3.8-6.2-2.9-2.5.9-3.8 3.7-2.9 6.2.9 2.5 3.7 3.8 6.2 2.9 1.4-.5 2.5-1.6 2.9-2.9h5.1c4.4 0 8.1-3.6 8.1-8.1v-1.6h1.6c2.7 0 4.8-2.2 4.8-4.8V24.2C51.7 10.8 40.8 0 27.5 0zM13 27.4c0-.9.8-1.6 1.7-1.6.9 0 1.5.7 1.6 1.6v13.1c0 .9-.8 1.6-1.7 1.6-.9 0-1.5-.7-1.6-1.6V27.4zM8.2 29h1.6v9.9H8.2c-.9 0-1.6-.7-1.6-1.6v-6.7c0-.9.7-1.6 1.6-1.6zm19.3 22.8c-.9 0-1.6-.7-1.6-1.6 0-.9.7-1.6 1.6-1.6.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6zM42 40.5c0 .9-.8 1.6-1.7 1.6-.9 0-1.5-.7-1.6-1.6V27.4c0-.9.8-1.6 1.7-1.6.9 0 1.5.7 1.6 1.6v13.1zm6.4-3.2c0 .9-.7 1.6-1.6 1.6h-1.6V29h1.6c.9 0 1.6.7 1.6 1.6v6.7z"></path>
// </svg>
//   <p className='text-2xl font-medium mt-3'>24/7 Support</p>
//   <p className='text-c1/70 text-sm'>Dedicated support</p>
// </div>
// <div className="flex items-center justify-center flex-col">
// <svg class="ugb-custom-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" xml:space="preserve" aria-hidden="true" width="50" height="50" fill='#ffffff'>
//   <path d="m32.8 13.5 3.8 2.8c.2.2.3.5.1.8-.1.1-.3.2-.4.2h-1.2c-.3 0-.6-.2-.6-.6 0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6 0 1.7 1.1 3.2 2.8 3.6v.1c0 .9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6v-.1c1.6-.5 2.8-2 2.8-3.7 0-1.2-.6-2.3-1.5-3l-3.8-2.8c-.2-.2-.3-.5-.1-.8.1-.1.3-.2.4-.2h1.2c.3 0 .6.2.6.6 0 .9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6 0-1.7-1.1-3.2-2.8-3.6 0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6v.1c-2 .6-3.2 2.6-2.6 4.6.1.8.6 1.5 1.3 2zm2.9 13.7c7.5 0 13.6-6.1 13.6-13.6S43.2 0 35.6 0C28.1 0 22 6.1 22 13.6c.1 7.5 6.1 13.6 13.7 13.6zm0-24C41.4 3.2 46 7.9 46 13.6S41.4 24 35.6 24c-5.7 0-10.4-4.7-10.4-10.4.1-5.7 4.7-10.4 10.5-10.4zm18.2 27.7c-1.7-2.2-4.9-2.7-7.2-1.1l-6.1 4.1c-.9-1.6-2.6-2.7-4.5-2.7h-4.4c-4.8-4.5-12.4-4.3-16.9.5-.7.8-1.3 1.6-1.8 2.5l-.8.5-.2-.6c-.3-.8-1.2-1.3-2-1l-8.9 3c-.8.3-1.3 1.2-1 2l5.4 15.7c.3.8 1.2 1.3 2 1l8.9-3c.8-.3 1.3-1.2 1-2v-.1l14.1-.4c3.8 0 7.5-1.2 10.7-3.4l10.6-7.6c2.4-1.7 2.9-5 1.2-7.3l-.1-.1zM8 51.3 3.7 38.7l5.8-2 4.3 12.7L8 51.3zm42.9-15.6-10.6 7.6c-2.6 1.8-5.7 2.8-8.8 2.8l-15.1.5-3-8.7 1.8-1.1c.3-.2.5-.4.6-.7 2.1-4.3 7.4-6.1 11.7-4 .9.5 1.8 1.1 2.5 1.8.3.3.7.5 1.2.5h5c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8h-9.1c-.9 0-1.6.7-1.6 1.6 0 .9.7 1.6 1.6 1.6h9.1c2.3 0 4.4-1.6 4.9-3.9l7.5-5c.9-.6 2.2-.4 2.8.5.6 1 .4 2.3-.5 2.9z"></path>
// </svg>
//   <p className='text-2xl font-medium mt-3'>Free Delivery</p>
//   <p className='text-c1/70 text-sm'>1For all order over 8,000</p>
// </div>

//         </div>

