import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import { NavLink } from 'react-router-dom'
import imgdemo from "@/Images/men.jpg"
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import axios from 'axios'
import OrderConfirm from './OrderConfirm'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, findUserOrder } from '@/redux/slices/bookingOrderSlice.js'
import { X } from 'lucide-react'
import { load } from '@cashfreepayments/cashfree-js'
import { deleteCart, ShowUserCarts } from '@/redux/slices/cartsSlice'
import { Helmet } from 'react-helmet'

function CheckOut() {


    // let address = [
    //     {
    //         name: "name1",
    //         number: "9999999999",
    //         city: "CITY",
    //         pinCode: "473665",
    //         address: "loadmei enfo ieknfo eornf kerf "
    //     },
    //     {
    //         name: "name2",
    //         number: "9999999999",
    //         city: "CITY",
    //         pinCode: "473665",
    //         address: "loadmei enfo ieknfo eornf kerf "
    //     }
    // ]



    const dispatch = useDispatch()
    const { cart, TotalCarts, loading } = useSelector(state => state.cart)
    const { TotalOrders, createOrderData } = useSelector(state => state.order)

    // const 
    const [itemsLanth, setitemsLanth] = useState(Number);
    const [discount, setDiscunt] = useState([]);
    const [productTotalCost, setProductTotalCost] = useState(0);
    const [shipingCost, SetShipingCost] = useState();
    const [carts, setCarts] = useState(null)
    const [cartProducts, setCartProducts] = useState(null)

    // userAddress
    const [productId, setProductId] = useState('');

    const [userAddress, setUserAddress] = useState({
        city: "",
        pincode: "",
        address: ""
    });


    const [OrderConfirmHendle, setOrderConfirmHendle] = useState(true);

    //  payment
    const [orderId, setOrderId] = useState("");
    const [cf_payment_id, setcf_payment_id] = useState("");


    // local store set up
    const storedUser = localStorage.getItem("setUser");
    const userData = JSON.parse(storedUser)
    const userId = userData?.user._id;


    useEffect(() => {
        dispatch(ShowUserCarts())
    }, [])

    useEffect(() => {
        if (cart || Array.isArray(cart)) {
            setCartProducts(cart.map((p) => p.productDetails))
            setCarts(cart)
        }
    }, [productId, cart])


    async function deleteProductCart(ProductId) {
        // {productId="asdasdasddasdas"}
        console.log("delete done Id", ProductId);
        // console.log("delete done", userId);

        dispatch(deleteCart(ProductId))

        // const ress = await axios.delete(`http://localhost:8088/api/v1/cart/delete/${userId}/${ProductId}`)
        // console.log(ress);


    }

    const calculateTotalCost = () => {
        if (!cartProducts || cartProducts.length === 0) return; // Check if cartProducts is undefined or empty

        const totals = cartProducts.map(item => item.price || 0); // Default to 0 if price is undefined
        const quntity = carts?.map((t) => t.quantity || 1)
        // const totalCostValue  = totals.reduce((acc, price) => acc + price, 0);
        const totalCostValue = carts.reduce((acc, item) => {
            const price = item.productDetails.price || 0;
            const qunntity = item.quantity || 1;
            // console.log("qunntity",qunntity);

            return acc + price * qunntity;

        }, 0);
        setProductTotalCost(totalCostValue);
    };

    const verifiedPayment = async (id) => {

        try {
            let response = await axios.post("http://localhost:8088/api/v1/payment/verify", {
                orderId: orderId,
                cf_payment_id
            })

            let resData = response.data.data

            console.log("resData", resData);

            if (resData) {
                console.log("verified Payment");

            }


        } catch (error) {
            console.log("verifiedPayment", error);

        }

    }

    // handleClick
    const confirmOrderHandle = async (e) => {

        e.preventDefault()

        try {
            let sessionId = await getsectionId()
            let checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: "_modal"
            };

            const cashfree = await load({ mode: "sandbox" })

            cashfree.checkout(checkoutOptions).then(() => {
                console.log("payment initialized");
                verifiedPayment(orderId)
            })
            let orderForm = {
                userId,
                productId: carts.map(i => i.productId),
                quantity: carts?.map(i => i.quantity)
                // quantity:carts.userId
            }

            dispatch(createOrder(orderForm))
            carts.map((id) => deleteProductCart(id.productId))

        } catch (error) {
            console.log("Error during checkout", error);

        }


    }






    const getsectionId = async () => {


        try {



            const response = await axios.post(`http://localhost:8088/api/v1/payment/pay`, {
                "orderId": "arsdfafafaf",
                "userId": "asd24aerfwe",
                "orderAmount": productTotalCost,
                "userName": "abhishek",
                "userNumber": "8120948236",
                "userEmail": "abhishek@apple.com"
            })

            let datad = response.data.data

            if (datad && datad.payment_session_id) {
                setOrderId(datad.order_id)
                setcf_payment_id(datad.cf_payment_id)
                console.log("respos", response.data.data);
                return datad.payment_session_id
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        calculateTotalCost();
        // totalQuntity()
        setitemsLanth(cartProducts?.length)
    }, [cartProducts]); // Ensure cartProducts is in the dependency array



    const formHandle = (e) => {
        setUserAddress({ ...userAddress, [e.target.id]: e.target.value })
    }




    // console.log("cartProducts", cartProducts);
    // console.log("cartsslice", cart);
    // console.log("createOrderData", createOrderData);
    // console.log("orderId", orderId);
    // console.log("orderForm", discount);


    return (
        <>
             <Helmet>
        <meta charSet="utf-8" />
        <title>Check Out</title>
      </Helmet>
            <section className='max-w-[1440px] mx-auto px-5'>
                {/* section 1 */}
                <section className='bg-c7  w-full rounded-3xl text-center py-14 my-6 '>
                    <p className='text-c5 text-4xl font-semibold fixelMedium uppercase'>Check out</p>
                </section>

                {/* section 2 */}
                <section className='flex flex-wrap gap-5'>

                    <section className="bg-c7 rounded-2xl p-5 h-fit py-7 px-5 mb-8 w-full xl:max-w-[700px]">
                        <form className='*:mb-4'>


                            {/* pins */}
                            <div className="flex gap-4">

                                <div className="grid w-full max-w-[130px] items-center gap-1.5 ">
                                    <Label htmlFor="text"   >City</Label>
                                    <Input type="text" id="city" placeholder="" className="w-full " onChange={formHandle} />
                                </div>
                                <div className="grid w-full max-w-[130px] items-center gap-1.5 ">
                                    <Label htmlFor="text"   >Pin Code</Label>
                                    <Input type="text" id="pincode" placeholder="" className="w-full " onChange={formHandle} />
                                </div>

                            </div>
                            {/* <div className="grid w-full max-w-sm items-center gap-1.5 ">
                                <Label htmlFor="text"  >state</Label>
                                <Input type="text" id="state" placeholder="" className="w-64 " onChange={formHandle} />
                            </div> */}
                            <div className="grid w-full max-w-sm items-center gap-1.5 ">
                                <Label htmlFor="text" >Address</Label>
                                <Input type="text" id="address" placeholder="" className="w-64 " onChange={formHandle} />
                            </div>


                            {/* <Button> Add Address </Button> */}

                        </form>

                        {/* <div>
                            {
                                address.map((address) => (
                                    <div className=" border mb-4 p-3 rounded-xl">
                                        <Checkbox id="address" />
                                        <label htmlFor="address" >
                                            <p>{address.name}</p>
                                            <p>{address.city}</p>
                                            <p>{address.number}</p>
                                            <p>{address.address}</p>
                                        </label>
                                    </div>))
                            }
                        </div> */}

                    </section>


                    <section className=' lg:max-w-[650px] w-full mb-8  *:rounded-2xl'>
                        <div className=" p-2 py-4 text-center bg-c7 ">
                            <h2 className='text-xl fixelMedium'>Products in the basket</h2>
                        </div>

                        <div className="*:bg-c7  *:rounded-2xl *:mb-4 mt-4">
                            {
                                cartProducts?.map((i) => (
                                    <div key={i.id} className=" p-1.5">
                                        <div className='flex'>
                                            <div className="bg-red max-w-[70px] min-w-[40px] max-h-[100px] mr-4">
                                                <img src={i.images[0]} className=' rounded-xl' alt="" />
                                            </div>
                                            <div className=" w-full px-3">
                                                <div className="  flex fixelMedium text-c2 justify-between items-start  ">
                                                    <div className="mb-2 mt-1">
                                                        <p className=" text-xl mb-1">{i.title.substring(0, 30)} {i.title.length > 30 ? "..." : ""}</p>
                                                        <p className='text-sm bg-white rounded-full p-0.5 px-3 w-fit'>{"Rs. " + i.price}</p>

                                                    </div>


                                                    <div className="">
                                                        <button className="text-c5 bg-white rounded-full hover:bg-c5/50 hover:text-white p-2 w-[35px] h-[35px] flex items-center justify-center " onClick={() => remove(i.id)}>
                                                            <X />
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                ))


                            }


                        </div>

                        <div className="bg-c7 px-4 py-3">
                            <p className=' text-xl my-2.5 mx-2 rounded-2xl text-center py-1 uppercase fixelMedium'>Order amount</p>
                            {/* <div className=" flex justify-between">
                            <p>{"itemsLanth"} Products in the cart</p>
                            <p>Price Rs. {productTotalCost}</p>
                        </div> */}
                            <div className="dotdot"></div>
                            <div className=" flex justify-between mt-4 px-4">
                                <p>Total</p>
                                <p>Rs. {productTotalCost}</p>
                            </div>

                            {/* <NavLink to={"#"} className={""}> */}

                            <Button onClick={confirmOrderHandle} className=' bg-c5 text-white uppercase rounded-full w-full my-6'> Pay </Button>
                            {/* </NavLink> */}
                        </div>
                    </section>
                </section>


            </section>

            <OrderConfirm classAdd={`${OrderConfirmHendle ? "hidden" : ""}`} />
        </>
    )
}

export default CheckOut











// async function findCarts() {
//     // dispatch(findUserOrder())
//     try {
//         const { data } = await axios.post(`http://localhost:8088/api/v1/cart/carts/${userId}`)

//         let cartItems = data.cart
//         setCartProducts(cartItems.map((p) => p.productDetails))
//         setCarts(cartItems)

//     } catch (error) {
//         console.error("Error fetching carts:", error);
//     }


// }
// useEffect(() => {
//     // findCarts();
// }, [productId, userId])