import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import CartCard from './CartCard';
import demoImg from "@/Images/men.jpg"


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Products from '../admin/Dashbord/Products';

import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, ShowUserCarts } from '@/redux/slices/cartsSlice';
import toast from 'react-hot-toast';
function Cart() {

  // const [itemsLanth, SetitemsLanth] = useState(Number);
  // test numer 5
  const [itemsLanth, setitemsLanth] = useState(Number);
  const [discount, setDiscunt] = useState(0);
  const [productTotalCost, setProductTotalCost] = useState(0);
  const [shipingCost, SetShipingCost] = useState();
  const [carts, setCarts] = useState(null)
  const [cartProducts, setCartProducts] = useState([])
  const [productId, setProductId] = useState('');



  const dispatch = useDispatch()
  // const cartStateData =  useSelector((state) => state?.cart)
  const cartState = useSelector((state) => state?.cart)

  useEffect(() => {
    dispatch(ShowUserCarts())
  }, [itemsLanth])



  async function findCarts() {
    try {
      const products = await cartState.cart.map((item) => item.productDetails)
      setCartProducts(products)
      setCarts(cartState?.cart)

      setitemsLanth(cartState.TotalCarts)
    } catch (error) {
      console.error("Error retrieving cart items:", error);
    }
  }
  async function deleteProductCart(ProductId) {
    dispatch(deleteCart(ProductId))
    setitemsLanth(itemsLanth - 1)
    toast.success("Item remove to cart")

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



  useEffect(() => {
    calculateTotalCost();
  }, [cartProducts]);
  useEffect(() => {
    if (cartState.cart) {
      findCarts();
    }
  }, [cartState.cart])




  // Debugging outputs
  console.log("cartState", cartState);
  // console.log("product TotalCost Cost:", productTotalCost);
  // console.log("Carts:", carts?.map((t) => t.quantity));
  // console.log("cartProducts", cartProducts);
  // console.log("carts", carts);
  return (
    <>

      <div className=" w-full px-5 md:px-11 max-w-[1440px] mx-auto">
        {cartState?.TotalCarts < 1 ? (
          <div className=" flex flex-col justify-center items-center h-[100vh] ">
            <img
              src="https://cdn.dribbble.com/users/461802/screenshots/4421003/media/e5ec819f7ae4ac0b46aa96643193d5e8.gif"
              className=" w-[25vw] "
              alt=""
            />
            <p className=" text-3xl font-semibold text-text1">
              Your cart is empty
            </p>
          </div>
        ) : (
          <>
            <section className='bg-c7  mx-auto  w-full  rounded-3xl text-center py-14 my-6'>
              <p className='text-c5 text-4xl font-semibold uppercase fixelMedium '>your Basket</p>
            </section>
            {/* <h2 className="text-3xl lg:pl-[4.5rem] fixelMedium">Basket</h2> */}
            <div className=" flex flex-col lg:flex-row md:gap-8">
              {/* cart Basket items */}
              <div className="  w-full lg:w-[70%] no-scrollbar  overflow-y-scroll md:max-h-[65vh] ">
                {cartProducts.map((i) => {
                  const cartItem = carts?.find(cart => cart.productDetails._id === i._id)
                  const quantity = cartItem.quantity
                  return (
                    <div key={i._id}>
                      <CartCard
                        img={i.images[0]}
                        name={i.title}
                        gender={i.gender}
                        price={i.price * quantity}
                        btnf={() => {
                          deleteProductCart(i._id);
                          setProductId(i._id)
                        }}
                        quantity={quantity}
                      />

                    </div>
                  )
                })}

                
              </div>

              {/* Cart Together    */}
              <div className="lg:w-[35%] lg:h-fit bg-c7 rounded-2xl *:rounded-2xl p-2">

                <div className="bg-white py-4 text-center my-3 mb-3">
                  <p className=" text-2xl fixelBold text-c2">Together</p>
                </div>


                <div className=" px-5 bg-white p-4">

                  <div className=" flex justify-between py-1.5">
                    <span>{itemsLanth} Prodect in the cart</span>
                    <span className="fixelBold">Rs. {productTotalCost}</span>
                  </div>

                  <div className=" flex justify-between py-1.5">
                    <span>Discount</span>
                    <span className="fixelBold">- {discount + " %"}</span>
                  </div>

                  <div className=" flex justify-between py-1.5">
                    <span>Shiping cost</span>
                    <span className="fixelBold">+ {shipingCost ? shipingCost : "00"}</span>
                  </div>

                </div>
                <div className=" flex justify-between fixelBold bg-c1 mt-4 px-4 py-4">
                  <span>Total cost</span>
                  <span className="">Rs. {productTotalCost}</span>
                </div>

                {/* Buttons */}
                <div className=" flex flex-col  w-full mt-6 mb-4 ">

                  <NavLink to={"/check-out"}>
                    <Button className={`rounded-full w-full py-6 hover:bg-white hover:text-c5`}>
                      <p>Continue</p>
                    </Button>
                  </NavLink>
                  <NavLink to={"/catelogues"}>
                    <Button className={`rounded-full w-full py-6 hover:bg-white hover:text-c5 mt-3`}>
                      <p>Back to catalogue</p>
                    </Button>
                  </NavLink>

                </div>
              </div>
            </div>
          </>
        )}
        <div className="mx-auto ">! arro </div>
      </div>
    </>
  )
}

export default Cart