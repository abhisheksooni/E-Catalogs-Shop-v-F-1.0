import React, { useEffect, useState } from 'react'
import { BaggageClaim, Heart, Minus, Plus } from 'lucide-react'
import axios from 'axios'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createCart, ShowUserCarts } from '@/redux/slices/cartsSlice.js'
import toast, { Toaster } from 'react-hot-toast';
import { findProductOne, products } from '@/redux/slices/productSlice'
import { Helmet } from 'react-helmet'
import star1 from "@/Images/star.png"
import star2 from "@/Images/starblank.png"

function Catalogues_Details() {

    const productsdata = useSelector(state => state.products)

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
    const [productsDatas, setproductsData] = useState([])



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


    useEffect(() => {
        if (productsdata.data && Array.isArray(productsdata.data)) {
            setproductsData(productsdata.data.slice(0, 4))
        }
    }, [productsdata.data])

    useEffect(() => {
        dispatch(products("All"))
    }, [])

    const [image, setImage] = useState(0)
    const [ImageZoom, setImageZoom] = useState(0)
    // console.log("cataloguesData", cataloguesData);
    // console.log("Data", data);
    // console.log("Product Quntity", productQuntity);
    // console.log("oneProductData", cataloguesData);
    // console.log("cataloguesData", productsDatas);
    // console.log("ImageZoom", ImageZoom);

    let reviews = [
        {
            userName: "Frances Guerrero",
            titel: "A must-have product",
            massage: "But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always."
        },
        {
            userName: "Larry Lawson",
            titel: "Amazing...loved it",
            massage: "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
        },
        {
            userName: "Lori Stevens",
            titel: "Highly recommended!",
            massage: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form."
        },

    ]



    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Catalogue Details</title>
            </Helmet>

            <section className='max-w-[1440px] flex justify-center md:mt-8 w-full  p-5  flex-col lg:flex-row sm:gap-12 md:min-h-[80vh] mx-auto'>

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
                    </div>
                </div>




                {/* Product detail */}


                <div className="flex flex-col w-full my-5 px-2  max-w-[660px]">
                    <div className="  w-full mb-3">
                        <div className=" bg-c2 w-fit py-1 px-5 rounded-xl mb-6">
                            <p className=' text-c1 text-xl'>{cataloguesData?.gender}</p>
                        </div>
                        <p className='text-3xl md:text-6xl fixelMedium py-1.5 uppercase'>{cataloguesData?.title} </p>

                    </div>

                    <div className="mb-3">
                        <span className=' py-1.5 text-3xl md:text-4xl fixelMedium '>{"Rs. " + cataloguesData?.price} </span>
                        <span className=' text-c5/50 py-1.5 text-xl md:text-2xl fixelMedium ' > <s>{cataloguesData?.price}</s></span>
                    </div>

                    <div className=" flex gap-2 my-3 mb-8">
                        <div className=" *:border *:border-c3 font-semibold *:p-3 *:rounded-lg cursor-pointer   *:m-1">
                            {cataloguesData?.sizes.map((size) => <span key={size} className='p-3 text-c3 '>{size}</span>)}
                        </div>
                    </div>

                    <div className=" flex max-w-[130px]  md:max-w-[280px] justify-center w-full gap-7 border-2 rounded-full px-3 py-1 mb-5">
                        <span className='hidden md:grid'>Quantity</span>
                        <button className='bg-c2 text-c1 rounded-full ' onClick={() => setProductQuntity(productQuntity - 1)}><Minus /></button>
                        <span className=" fixelMedium">{productQuntity}</span>
                        <button className='bg-c2 text-c1 rounded-full ' onClick={() => setProductQuntity(productQuntity + 1)} ><Plus /></button>
                    </div>

                    <div className="mb-5">
                        <p className='text-2xl'>Details</p>
                        <div className=" bg-c6 w-20 h-[2px] mb-4"></div>
                        <p>{cataloguesData?.description}</p>
                    </div>

                    {/* <div className="flex items-center gap-2 mb-3 mt-5">
                        <p className='text-sm'>rating: {cataloguesData?.rating}</p>
                        <ReactStars value={singalData.rating} count={5} size={24} color2={"#ffd700"} />
                    </div> */}
                    {/* Add to cart and Like btn */}
                    <div className=" flex gap-4 items-center max-w-[450px] mt-auto w-full mb-7">

                        <button onClick={() => {
                            addToCart(cataloguesData?._id)
                        }}
                            className="rounded-full w-[160px] p-1.5  bg-c2 hover:bg-c5 flex items-center">
                            <div className=" bg-c1 pl-0.5 p-1 flex justify-center items-center rounded-full h-[35px] w-[35px]">
                                <BaggageClaim />
                            </div>
                            <p className='text-c1 pl-2.5'>Add to cart</p>
                        </button>

                    </div>

                    {/* product Details */}
                    <div className="">
                        <p className='text-3xl mb-4 md:text-start text-center'>Product Details</p>
                        <div className=" w-full flex justify-between px-4 text-xl md:text-2xl ">
                            <p>Material</p>
                            <p>Cotton</p>
                        </div>
                        <div className="w-full h-[2px] bg-c2/60 mb-7"></div>
                        <div className=" w-full flex justify-between px-4 text-xl md:text-2xl ">
                            <p>Shipping Time</p>
                            <p>4-6 Workdays</p>
                        </div>
                        <div className="w-full h-[2px] bg-c2/60 mb-7"></div>
                        <div className=" w-full flex justify-between px-4 text-xl md:text-2xl ">
                            <p>Made in</p>
                            <p>India</p>
                        </div>
                        <div className="w-full h-[2px] bg-c2/60 mb-7"></div>
                    </div>
                </div>
            </section>

            {/* section 2 */}
            <section className='flex flex-col justify-center max-w-[1440px] md:mx-auto mb-10 mx-5'>
                <div className=" flex flex-col justify-center mx-auto">
                    <p className='mx-auto text-4xl mb-1 font-semibold'>Reviews</p>
                    <p className='mb-6 text-c2/60 md:text-start text-center'>Read Reviews from our satisfied customers. Share your experience with Us by clicking the below button!</p>
                </div>
                {reviews.map(review => (
                    <div className="bg-c7 md:p-10 p-5  rounded-2xl max-w-[85rem] mx-auto mb-4">
                        <p className='mb-2 text-xl font-medium'>{review.userName}</p>
                        <div className=" flex justify-between pr-5 mb-4 items-center">
                            <p className='text-xl '>{review.titel}</p>
                            <div className="*:max-w-[22px] gap-[2px] flex">
                                <img src={star1} alt="" />
                                <img src={star1} alt="" />
                                <img src={star1} alt="" />
                                <img src={star2} alt="" />
                                <img src={star2} alt="" />

                            </div>
                        </div>
                        <p className='text-xl'>{review.massage}</p>
                    </div>
                ))}

            </section>
            {/* section 3 */}
            <section className='max-w-[1440px] md:mx-auto mx-5 '>
                <p className='text-5xl md:text-start text-center'>Related products</p>
                <div className="flex flex-wrap gap-5 lg:gap-10 justify-center py-5 lg:py-10">

                    {
                        productsDatas.map(item => (
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
        </>
    )
}

export default Catalogues_Details