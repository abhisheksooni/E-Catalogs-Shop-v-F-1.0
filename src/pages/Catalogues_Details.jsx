import React, { useEffect, useState } from 'react'
import imgdemo from "@/Images/men.jpg"
import { BaggageClaim, Heart, Minus, Plus } from 'lucide-react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createCart, ShowUserCarts } from '@/redux/slices/cartsSlice.js'
import toast, { Toaster } from 'react-hot-toast';
import { findProductOne } from '@/redux/slices/productSlice'
function Catalogues_Details() {
    const dispatch = useDispatch();
    const { userId, data, loading, error, } = useSelector((state) => state.products)
    // oneProductData
    let slug = useParams()

    let rating = "5"
    // carts total navbat
    useEffect(() => {
        dispatch(ShowUserCarts())
    }, [])
    // local store set up
    const storedUser = localStorage.getItem("setUser");
    const userData = JSON.parse(storedUser)
    const userid = userData?.user._id;

    const [cataloguesData, setCataloguesData] = useState(null)
    const [productQuntity, setProductQuntity] = useState(1)



    const productData = {
        userId: userid,
        productId: cataloguesData?._id,
        quantity: productQuntity
    }


    // async function catalogueSlug() {
    //     console.log(slug);
    //     const { data } = await axios.get(`http://localhost:8088/api/v1/products/product/${slug.id}`)
    //     setCataloguesData(data?.product)
    //     setFullProducts(data)
    // }

    function addToCart(id) {
        if (!userid) {
            toast.error('User not Login')
        }
        if (userid) {
            toast.success('Item added to cart')
            dispatch(createCart(productData))
            dispatch(ShowUserCarts())
        }
    }

    useEffect(() => {
        dispatch(findProductOne(slug.id))
    }, [])

    useEffect(() => {
        if (data.product) {
            setCataloguesData(data.product)
        }
    }, [data])



    const [image, setImage] = useState(0)
    const [ImageZoom, setImageZoom] = useState(0)
    // console.log("cataloguesData", cataloguesData);
    // console.log("Data", data);
    // console.log("Product Quntity", productQuntity);
    // console.log("oneProductData", cataloguesData);
    console.log("ImageZoom", ImageZoom);

    return (
        <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Catalogues/Details</title>
      </Helmet>
            {/* <section className='absolute bg-c5/20 w-full backdrop-blur-md'>
                <img src={ImageZoom} className='max-w-[600px]' alt="" />
            </section> */}
            <section className='max-w-[1800px] flex justify-center w-full  p-5  flex-col lg:flex-row sm:gap-12 md:min-h-[80vh]'>

                <div className="flex gap-4 flex-wrap-reverse md:flex-row">
                    <ul className=' flex md:flex-col gap-2 *:rounded-lg'>
                        {
                            cataloguesData?.images.map((img, index) => (
                                <li key={index} onClick={() => setImage(index)} onMouseEnter={() => setImage(index)} className=' hover:scale-105 duration-150 cursor-pointer max-w-[100px] *:rounded-lg '><img src={img} alt={img} /> </li>
                            ))


                        }
                    </ul>


                    {/* Image showing */}
                    <div className="my-5 lg:max-w-[25rem] mx-auto lg:mx-0" onClick={() => setImageZoom(cataloguesData?.images[image])}>
                        <img src={cataloguesData?.images[image]} className=' lg:max-h-[500px] rounded-xl  duration-150' alt={cataloguesData?.title} />

                        {/* <div className="">
                    <img src={ImageZoom} className='max-w-[600px]' alt="" />
                    </div> */}
                    </div>
                </div>




                {/* Product detail */}


                <div className="flex flex-col w-full my-5 px-2 max-h-[500px] max-w-[600px]">
                    <div className="  w-full mb-5">
                        <p className='text-3xl fixelMedium py-1.5 uppercase'>{cataloguesData?.title} </p>
                        <p className=' text-text1'>{cataloguesData?.gender}</p>

                    </div>

                    <p className=' py-1.5 text-3xl fixelMedium mb-4'>{"Rs. " + cataloguesData?.price}</p>
                    <div className=" flex gap-2 my-3">
                        <div className=" *:border *:border-c2 *:rounded-sm cursor-pointer *:px-1.5 *:m-1">
                            {cataloguesData?.sizes.map((size) => <span key={size} className='p-3'>{size}</span>)}
                        </div>
                    </div>

                    <p className='mb-2 mt-5'>Quantity</p>
                    <div className=" flex  max-w-[130px] justify-center w-full gap-7 border-2 rounded-full px-3 py-1 mb-5">
                        <button onClick={() => setProductQuntity(productQuntity - 1)}><Minus /></button>
                        <span className=" fixelMedium">{productQuntity}</span>
                        <button onClick={() => setProductQuntity(productQuntity + 1)} ><Plus /></button>
                    </div>

                    <div className="">
                        <p>Details</p>
                        <p>{cataloguesData?.description}</p>
                    </div>

                    <div className="flex items-center gap-2 mb-3 mt-5">
                        <p className='text-sm'>rating: {cataloguesData?.rating}</p>
                        {/* <ReactStars value={singalData.rating} count={5} size={24} color2={"#ffd700"} /> */}
                    </div>
                    {/* Add to cart and Like btn */}
                    <div className=" flex gap-4 items-center max-w-[450px] mt-auto w-full lg:mb-5">

                        <button onClick={() => {
                            addToCart(cataloguesData?._id)
                        }}
                            className="rounded-full w-[160px] p-1.5  bg-c2 hover:bg-c5 flex items-center">
                            <div className=" bg-c1 pl-0.5 p-1 flex justify-center items-center rounded-full h-[35px] w-[35px]">
                                <BaggageClaim />
                            </div>
                            <p className='text-c1 pl-2.5'>Add to cart</p>
                        </button>

                        {/* <Link to={"/order"}>
                    <button className='rounded-full w-[160px] h-[47px]   bg-c2 hover:bg-c5 flex items-center text-c1 justify-center'> <p className='text-c1  '>Buy</p></button>
                    </Link> */}


                    </div>

                </div>

            </section>
        </>
    )
}

export default Catalogues_Details