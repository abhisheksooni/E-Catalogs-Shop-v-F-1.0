import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { NavLink, Outlet } from 'react-router-dom'

import { MoveLeft, Pencil, Trash2 } from 'lucide-react';
import imgsempla from "@/Images/men.jpg"
import axios from 'axios';
import CreateProduct from './CreateProduct';
import { deleteProduct, products } from '@/redux/slices/productSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';



function GetProducts() {


  const [data, setdata] = useState([])
  const [deleteId, setDeleteId] = useState("")

  const dispatch = useDispatch()
  const productsSlice = useSelector(state => state.products)

  let ShowcreareProdectHandle = () => {

  }



  //  Delete product
  const DeleteProductHandle = async (id) => {
    setDeleteId(id)
    // dispatch(deleteProduct(id))
    toast.success(`${id} Delete succesfully`)

  }

  const EditProductSubmitHandle = () => {

  }


  useEffect(() => {
    dispatch(products("All"))
  }, [])

  // find All Product
  useEffect(() => {
    if (productsSlice.data && Array.isArray(productsSlice.data)) {
      setdata(productsSlice.data)
    }
  }, [deleteId, productsSlice.data])
  useEffect(() => {

  }, [])


  console.log("productsSlice", productsSlice);


  return (
    // className={` ${ShowGetAllProduct ? "hidden" : ""}`}
    <section >
      {/* Products */}
      <section className='flex w-full items-center'>
        <span className="text-2xl font-semibold">Products</span>
        <section className={` flex w-full gap-3 *:p-1 *:px-3 *:py-2 *:rounded-full justify-end *:border`}>
          <button>
            Filter1
          </button>
          <button>
            Filter2
          </button>

          <button
            className={"bg-c3 border-c3 hover:bg-c1 hover:text-c3 text-white"}
            onClick={ShowcreareProdectHandle}
          >
            Add Product
          </button>
        </section>
      </section>
      <div className=" flex justify-between px-10 py-2.5 my-3 border rounded-lg">
        <span>Product</span>
        <span>Stocks</span>
        <span>Create Date</span>
        <span>Action</span>
      </div>

      <section className=''>
        {/* Products card */}
        {
          data.map((i) => (
            <section key={i._id} className={`w-full flex items-center justify-between px-5 bg-c3/10 mb-1 rounded-xl py-1.5`}>
              <div className="flex items-center gap-3 max-w-[300px] w-full">
                <img className='max-w-[45px] rounded-md' src={i.images[0]} alt={i.images[0]} />
                <span className=' w-full'>{i.title.substring(0, 20)} {i.title.length > 20 ? "..." : ""}</span>
              </div>
              <span className='max-w-[40px] w-full'>{i.stock}</span>
              <span>{i.createdAt.substring(0, 10)}</span>
              <div className="flex gap-3 *:rounded-full">
                {/* Edit button */}
                <NavLink to={`/admin/dashbord/products/update/${i.slug}`} >
                <button className='bg-c3 text-white p-1.5 rounded-full' > <Pencil /> </button>
                </NavLink>
                {/* delete button */}
                <AlertDialog>
                  <AlertDialogTrigger className='bg-red-500/90 text-white p-1.5' > <Trash2 /></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Product</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => DeleteProductHandle(i._id)} className='bg-red-500/90 text-white p-1.5'> Delete </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </section>
          ))

        }

      </section>
    </section>
  )
}

export default GetProducts