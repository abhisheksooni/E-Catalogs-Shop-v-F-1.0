import { SelectContent, SelectItem, Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { findAllOrders, updateOrder } from '@/redux/slices/bookingOrderSlice';
import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Orders() {

  let naviget = useNavigate()


  // local store set up
  const storedUser = localStorage.getItem("setUser");
  const userData = JSON.parse(storedUser)
  const userId = userData?.user._id;

  const [orders, setOrders] = useState([])
  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const [orderStatusId, setOrderStatusId] = useState("")
  const [orderStatus, setOrderStatus] = useState("")
  // const [orders,setOrders] = useState(null)



  const dispatch = useDispatch()
  const showAllOrders = useSelector(start => start.order)

  const updateOrderStatus = async (updateStatusProductId, value, userId) => {
    setLoadingOrderId(updateStatusProductId)
    setOrderStatusId(updateStatusProductId)
    setOrders(showAllOrders.allOrders)

    // // Optimistically update local state
    // setOrders((prevOrders) =>
    //   prevOrders.map((order) =>
    //     order._id === updateStatusProductId ? { ...order, status: value } : order
    //   )
    // );

    try {
      // Dispatch the update action
      await dispatch(updateOrder({ updateStatusProductId, newStatus: value }));
    } catch (error) {
      console.error("Failed to update order:", error);
    } finally {
      setLoadingOrderId(null); // Reset loading state
      dispatch(findAllOrders()); // Refetch orders if necessary
    }
  }

  // }

  useEffect(() => {
    dispatch(findAllOrders())
  }, {dispatch})

  // all show orders admin only
  useEffect(() => {
    if (showAllOrders.allOrders && Array.isArray(showAllOrders.allOrders)) {
      setOrders(showAllOrders.allOrders)
    }

    // orderStatusId
  }, [showAllOrders.allOrders,])





  console.log("all order :", showAllOrders);
  // console.log("order :", orders);

  return (
    <>
      <section className=''>
        <h1>All Customers Orders</h1>
        <section>


          <div>
            <div className="flex flex-col">
              <div className=" overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                  <div className="relative  text-gray-500 focus-within:text-gray-900 mb-4">
                    <input type="text" id="default-search" className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none" placeholder="Search for company" />
                  </div>
                  <div className="overflow-hidden ">
                    <table className=" min-w-full rounded-xl">
                      <thead>
                        <tr className="bg-gray-50">
                          <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Product Name </th>
                          <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> User ID </th>
                          <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Quantity </th>
                          <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Book
                            Time </th>
                          <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Status </th>
                        </tr>
                      </thead>
                      {

                        orders?.map((items) => {

                          const product = items?.orderDetails


                          return (

                            <tbody key={Math.random()} className="divide-y divide-gray-300 cursor-pointer" onClick={() => naviget(`/catelogues/catelogues-details/${product?.slug}`)} >
                              <tr key={items._id} className={`bg-white transition duration-500 ${loadingOrderId === items._id ? 'opacity-10' : ''}`}>
                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 "> {product?.title}</td>
                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {items.userId} </td>
                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {items.quantity}</td>
                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {items.createdAt}</td>
                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 flex items-center gap-1"> <div className=" w-[7px]  h-[7px] rounded-full bg-c2 "></div>


                                  <Select onValueChange={(value) => updateOrderStatus(product._id, value, items.userId)} >
                                    <SelectTrigger className="w-[150px]">
                                      <SelectValue value={items.status} placeholder={items.status} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Pending">Pending</SelectItem>
                                      <SelectItem value="Shipped">Shipped</SelectItem>
                                      <SelectItem value="Delivered">Delivered</SelectItem>
                                      <SelectItem value="Cancel">Cancel</SelectItem>
                                    </SelectContent>
                                  </Select>


                                </td>

                              </tr>

                            </tbody>
                          )

                        })

                      }

                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </section>
    </>
  )
}

export default Orders







{/* <div className={` ${items.status==="pending"?"bg-[#FFC40D]":"bg-black/40"} ${items.status==="shipped"?"bg-[#FFC40D]":"bg-black/40"} ${items.status==="delivered"?"bg-[#5EB06F]":"bg-black/40"}  ${items.status==="cancelled"?"bg-[#EB3B4C]":"bg-black/40"}   text-white rounded-full px-[8px]  py-[2px] text-xs`}>
<span>{items.status}</span>
</div> */}