import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom";
import "../App.css"
import { ShowUserCarts } from '@/redux/slices/cartsSlice';
import { products } from '@/redux/slices/productSlice';
import Loding from '@/components/mainComponents/Loding/Loding';
import ReviewCard from '@/components/ReviewCard';
import { Helmet } from 'react-helmet';
// import { useHistory } from 'react-router-dom';

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


  // const selector = useSelector((state)=> state.click)
  // const dispatch = useDispatch()
  // const [open, SetOpen] = useState(false);
  // const [TotalItems, SetTotalItems] = useState(Number);


  // useEffect(()=>{  
  //   (()=>SetTotalItems(selector.length))()   
  //   console.log(TotalItems);
  // },[selector,TotalItems])

  useEffect(()=>{
  },[])

  const [menCategoryHover, setMenCategoryHover] = useState(false)
  const [womenCategoryHover, setWomenCategoryHover] = useState(false)
  const [kidsCategoryHover, setKidsCategoryHover] = useState(false)

  

const urlParams = new URLSearchParams(window.location.search)
const token = urlParams.get("token") 

if (token) {
  localStorage.setItem("authToken",token)
  // history.push("/")
}
  console.log("token", token);
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
                    <p className='text-text1 text-sm lg:text-base mb-2'> Rs. {item.price} <s className='text-sm ml-1'>{item.price + 199}</s></p>
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

<NavLink to={"/catelogues/Male"}>

          <div onMouseEnter={() => setMenCategoryHover(true)} onMouseLeave={() => setMenCategoryHover(false)} className="max-w-[570px] *:rounded-2xl relative">
            <div className="">
              <div  className={`${menCategoryHover ? "flex duration-100 " : "hidden"} cursor-pointer  justify-center items-center bg-c2/5 w-full h-full absolute rounded-2xl backdrop-blur-[2px] `}>
                <div className="px-4 py-1.5">
                  <div className="   rounded-full text-6xl font-semibold text-c1 ">Men</div>
                  <div className="w-24 h-1.5 duration-100 rounded-full bg-c1 mt-3"></div>
                </div>
              </div>
            </div>
            <img src="https://cdn.prod.website-files.com/6607bf6b9d59d5c6248298a2/6607db64f61d2d8da10d113b_men.jpg" alt="" />
          </div>
</NavLink>

          <div className=" pt-5 flex flex-col bottom-0 ">
            <p className=' text-3xl md:text-4xl lg:text-5xl font-semibold' >Shop by category</p>
            <NavLink to={"/catelogues/All"} className='border  text-center px-6 py-4 rounded-2xl mt-[30px]' >View All Products</NavLink>

            <div className="flex gap-5  lg:gap-14 *:max-w-[375px]  *:rounded-2xl mt-[40px]">
              <NavLink to={"/catelogues/Female"}>
              <div className="*:rounded-2xl relative cursor-pointer">
                <div className={`${womenCategoryHover ? "" : "hidden"}bg-c2/15 w-full h-full absolute rounded-2xl `}>
                  <div className="  px-4 py-1.5 rounded-full text-xl bg-c2 text-c1 absolute z-10  left-[20px] bottom-[20px] ">Woman</div>
                </div>

                <img src="https://cdn.prod.website-files.com/6607bf6b9d59d5c6248298a2/6607db6de825fc2c60ca4ce2_women.jpg" alt="" />
              </div>
              </NavLink>

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
