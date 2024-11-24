
import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Package } from "lucide-react";
import sempalImg from "@/Images/main.jpg";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { findUserOrder } from "@/redux/slices/bookingOrderSlice.js";

function UserOrders() {


    
  const [hoverArrow, setHoverArrow] = useState(false);


  const dispatch =  useDispatch()

  const findorder = useSelector((state) => state.order); // Assuming the orders are under `state.order`

  const { order, loading, error } = findorder; // Destructure for easier access

  useEffect(() => {
    dispatch(findUserOrder())
  }, []);



  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-[#FFC40D]";
      case "Shipped":
        return "bg-[#FFC40D]";
      case "Delivered":
        return "bg-[#5EB06F]";
      case "Cancel":
        return "bg-[#EB3B4C]";
      default:
        return "bg-black/40";
    }
  };
  

 
  console.log("order", order);


  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;




  return (
    <>
    <section className=" w-full flex flex-col">
      <div className="flex gap-4 text-3xl mx-auto mb-4">
        <Package size={35} />
        <p className="font-semibold">My Orders 11</p>
      </div>

      <section className=" rounded-2xl *:w-full flex  justify-start items-center flex-wrap *:m-2 hover:*:border-c2 *:border *:rounded-2xl *:max-w-[600px]">
        {order.map(({ orderProducts }) => {
          return orderProducts.map(({ productId, quantity, status, productDetails }) => (
           < NavLink to={`/catelogues/catelogues-details/${productDetails.slug}`} key={productDetails._id} className="flex p-2 ">
              <img
                src={productDetails.images[0]}
                alt={productDetails.slug}
                className="w-[100px] rounded-xl p-1"
              />
              <div className="w-full py-2 px-4">
                <div className="flex gap-3 mb-3">
                  <div
                  
                    className={`text-white rounded-full px-[8px]  py-[2px] text-xs ${getStatusClass(status)}`}
                  >
                    <span>{status}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="pl-2">
                    <p>{productDetails.title}</p>
                    <p className="text-c2/40 text-sm">
                      Product Id : {productId}
                    </p>
                    <p className="text-c2/90 text-sm">
                      Qun : {quantity}
                    </p>
                  </div>

                  <div
                    className={`rounded-full p-[2px] transform ease-linear duration-200
        ${hoverArrow ? "rotate-45" : "rotate-0"} `}
                  >
                    <ArrowUpRight strokeWidth={2} />
                  </div>
                </div>
              </div>
            </NavLink>
          ));
        })}
      </section>
    </section>
  </>
  )
}

export default UserOrders