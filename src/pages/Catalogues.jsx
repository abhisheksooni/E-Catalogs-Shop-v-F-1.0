import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import ProductCard from '@/components/mainComponents/ProductCard'
import { products } from '@/redux/slices/productSlice'
import { ShowUserCarts } from '@/redux/slices/cartsSlice'
import Loding from '@/components/mainComponents/Loding/Loding'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'

function Catalogues() {

    const [findAllProduct, setFindAllProduct] = useState(true)
    const [findMaleProduct, setFindMaleProduct] = useState(false)
    const [findFemaleProduct, setFindFemaleProduct] = useState(false)
    const [findGender, setFindGender] = useState("All")
    const [FilterMoreMobileaddd, SetFilterMoreMobileaddd] = useState(false)
    const [cataloguesData, setCataloguesData] = useState([])

    let Navigate = useNavigate()
    let params = useParams()

    // console.log("params", params.category);

    const dispatch = useDispatch()
    const productsData = useSelector(state => state.products)

    function applyHandel() {
        window.scroll({ top: 0, behavior: "smooth" })
    }
    function FilterAllProductHandle() {
        // setFindGender("All")
        Navigate("/catelogues/All")
        setFindAllProduct(true)
        setFindFemaleProduct(false)
        setFindMaleProduct(false)
    }
    function FilterFemaleProductHandle() {
        // setFindGender("Female")
        Navigate("/catelogues/Female")
        setFindAllProduct(false)
        setFindFemaleProduct(true)
        setFindMaleProduct(false)
    }
    function FilterMaleProductHandle() {
        // setFindGender("Male")
        Navigate("/catelogues/Male")
        setFindAllProduct(false)
        setFindFemaleProduct(false)
        setFindMaleProduct(true)
    }
    // carts total navbat
    useEffect(() => {
        dispatch(ShowUserCarts())
    }, [])
    useEffect(() => {
        applyHandel()
        dispatch(products(params.category));
    }, [params])

    useEffect(() => {
        if (productsData.data && Array.isArray(productsData.data)) {
            setCataloguesData(productsData?.data)
        } else {
            console.log("productsData.data is not an array:", productsData.data);
        }
    }, [productsData.data])

    // To handle loading and error states
    // if (productsData.loading) {
    //     return <div>Loading...</div>;
    // }
    // if (productsData.error) {
    //     return <div>Error: {productsData.error}</div>;
    // }

    // console.log("cataloguesData",cataloguesData);
    // console.log("gender filtered", findGender);
    console.log("kitcataloguesData", cataloguesData);
    // console.log("kitdata", productsData);
    console.log("FilterAllProductHandle", findAllProduct);
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Catalogues/{params.category}</title>
            </Helmet>
            <section className='  mx-auto px-5 lg:px-0 max-w-[1440px] w-full my-8'>

                {/* section 1 */}
                {productsData?.loading ? <section className='h-[80vh] flex items-center justify-center'><Loding /></section> : <>
                    <section className='bg-c7 w-full rounded-3xl text-center pt-12 pb-8'>
                        <p className='text-c5 text-4xl font-semibold uppercase fixelMedium '>Catalogues</p>

                        <div className="flex gap-5 flex-wrap justify-center mt-10 *:rounded-full  *:px-10  hover:*:text-c1 hover:*:bg-c5 *:py-2 transform *:delay-100 *:ease-in-out ">

                            <button onClick={FilterAllProductHandle} className={`${params.category === "All" ? "bg-c5 text-c1" : "bg-c1 text-c5 "}`}  >ALL</button>
                            <button onClick={FilterMaleProductHandle} className={`${params.category === "Male" ? "bg-c5 text-c1" : "bg-c1 text-c5 "}`} >MENS</button>
                            <button onClick={FilterFemaleProductHandle} className={`${params.category === "Female" ? "bg-c5 text-c1" : "bg-c1 text-c5 "}`} >WOMENS</button>
                            {/* <button onClick={()=>toast("👶 Coming soon")} className={`bg-slate-200 text-white`} >KIDS</button> */}
                           {/* <button onClick={()=>toast("👶 Coming soon")} className={`${params.category === "Female" ? "bg-c5 text-c1" : "bg-c1 text-c5 "}`} >KIDS</button> */}
                        </div>
                    </section>
                    {/* section 2 */}
                    <section className='flex flex-wrap gap-3 md:gap-8 justify-center  my-4 md:my-10'>
                        {

                            cataloguesData?.map((p) => (
                                <ProductCard key={p._id} ProductName={p.title} Price={p.price} ProductImage={p.images[0]} slug={p.slug} />
                            ))
                        }

                    </section>
                    {/* section 3 */}
                    <section className='w-full text-center'>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                    <PaginationLink href="#">2</PaginationLink>
                                    <PaginationLink href="#">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>


                    </section>
                </>}

            </section>
        </>
    )
}

export default Catalogues



// let a = <>
//     <section className='  mx-auto px-10 max-w-[1600px] w-full my-8'>

//         {/*price  filter nav */}
//         <div className="flex items-center justify-between lg:px-10 my-5">
//             <span className='text-2xl font-medium uppercase'>Catalogues</span>
//             <div className="lg:hidden flex gap-3 ">
//                 <button onClick={() => SetFilterMoreMobileaddd(true)} className='bg-c2 rounded-full p-1.5'><Filter color='#fff' /> </button>
//                 <button className='bg-c2 rounded-full p-1.5'><ArrowUpDown color='#fff' />  </button>

//             </div>

//             {/* procefliter */}
//             {/* <div className="hidden lg:inline-block">
//         <PriceFilter />
//     </div> */}
//         </div>

//         <section className='flex gap-5'>
//             {/* filter nav */}
//             <nav className='max-w-[370px] border-2 border-c6 p-5 rounded-2xl '>
//                 {/* Filter Male Femail */}
//                 <div className="">

//                     {/* Filter male and Female */}
//                     <div className=" w-fit flex justify-center border-2 border-c6 p-0.5 rounded-full my-3 mx-auto">
//                         <NavLink className={` ${findAllProduct ? "bg-c5 text-c1" : " bg-white text-c5"} hover:bg-c5 hover:text-c1 py-2 px-5 rounded-full`} onClick={FilterAllProductHandle}>
//                             All
//                         </NavLink>
//                         <NavLink className={`${findMaleProduct ? "bg-c3 text-c1" : " bg-white text-c5"} hover:bg-c3 hover:text-c1 py-2 px-10 rounded-full`} onClick={FilterMaleProductHandle} >
//                             Male
//                         </NavLink>
//                         <NavLink className={` ${findFemaleProduct ? "bg-c4 text-c1" : " bg-white text-c5"} hover:bg-c4 hover:text-c1 py-2 px-10 rounded-full`} onClick={FilterFemaleProductHandle} >
//                             Female
//                         </NavLink>


//                     </div>

//                     {/* Origin  */}
//                     {/* <p className='my-3 mt-6 fixelMedium'>Origin</p>
//             <div className=" w-full flex flex-wrap *:mx-2 *:border-2 *:rounded-full *:px-7 *:py-1 *:m-0.5 border-c6 mx-auto">
//                 <button className=' border-c3 text-c3'>Sale</button>
//                 <button>New</button>
//                 <button>A Hit Sale</button>
//             </div> */}

//                     {/* Categories */}
//                     {/* <p className='my-3 mt-6 fixelMedium'>Categories</p>
//             <div className="">
//                 <RadioGroup defaultValue="option-one" className="*:mb-2.5">
//                     <div className="flex items-center justify-between mr-3">
//                         <div className="flex items-center space-x-2">
//                             <RadioGroupItem value="option-one" id="option-one" />
//                             <Label htmlFor="option-one">Shorts</Label>
//                         </div>
//                         <span>0</span>
//                     </div>
//                     <div className="flex items-center justify-between mr-3">
//                         <div className="flex items-center space-x-2">
//                             <RadioGroupItem value="option-two" id="option-two" />
//                             <Label htmlFor="option-two">Shorts2</Label>
//                         </div>
//                         <span>0</span>
//                     </div>
//                     <div className="flex items-center justify-between mr-3">
//                         <div className="flex items-center space-x-2">
//                             <RadioGroupItem value="option-tree" id="option-tree" />
//                             <Label htmlFor="option-tree">Shorts3</Label>
//                         </div>
//                         <span>0</span>
//                     </div>

//                 </RadioGroup>

//             </div> */}

//                     {/* size filter */}
//                     <p className='my-3 mt-6 fixelMedium'>Size</p>
//                     <div className=" flex flex-wrap *:p-2 *:border *:rounded-lg gap-3 *:w-12 hover:*:border-c2">
//                         <button>S</button>
//                         <button>M</button>
//                         <button>L</button>
//                         <button>XL</button>
//                         <button>XXL</button>

//                     </div>


//                     {/* size filter */}
//                     <p className='my-3 mt-6 fixelMedium'>Price</p>
//                     <div className="">
//                         add karna hai
//                     </div>


//                     {/* <Button onClick={applyHandel} className={`w-full rounded-full fixelMedium mt-6 py-6`}> <p>APPLY</p></Button> */}
//                 </div>

//             </nav>
//             {/* End filter nav  */}
//             {/* Products */}
//             <section className='mx-auto'>
//                 <section className='flex flex-wrap gap-6 '>
//                     {
//                         cataloguesData.map((p) => (<div key={p._id}  >
//                             <ProductCard ProductName={p.title} Price={p.price} ProductImage={p.thumbnail} slug={p.slug} />
//                         </div>))
//                     }

//                 </section>


//                 {/* page -- pageinason */}
//                 <section className='my-8'>
//                     <Pagination>
//                         <PaginationContent>
//                             <PaginationItem>
//                                 <PaginationPrevious href="#" />
//                             </PaginationItem>
//                             <PaginationItem>
//                                 <PaginationLink href="#">1</PaginationLink>
//                             </PaginationItem>
//                             <PaginationItem>
//                                 <PaginationLink href="#">2</PaginationLink>
//                             </PaginationItem>
//                             <PaginationItem>
//                                 <PaginationLink href="#">3</PaginationLink>
//                             </PaginationItem>
//                             <PaginationItem>
//                                 <PaginationEllipsis />
//                             </PaginationItem>
//                             <PaginationItem>
//                                 <PaginationNext href="#" />
//                             </PaginationItem>
//                         </PaginationContent>
//                     </Pagination>
//                 </section>

//             </section>
//         </section>
//     </section>
// </>