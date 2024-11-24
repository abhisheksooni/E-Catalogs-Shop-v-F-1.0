
import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import AdminProductCard from './utils/AdminProductCard'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MoveLeft, Pencil, Trash2 } from 'lucide-react';
import imgsempla from "@/Images/men.jpg"
import axios from 'axios';
import { Select } from '@/components/ui/select'
import CreateProduct from './ProductsHandle/CreateProduct'

function Products() {

  {/* thumbnail, price, description, title, gender, images, stock, sizes, discount */ }
  const [ProductSize, setProductSize] = useState([])

  let FormData = {
    thumbnail:"",
    title: "",
    price: Number,
    gender: "",
    stock: Number,
    sizes: [],
    discount: Number,
    description: "",
  }

  // create product
  const [thumbnallFile, setThumbnallFile] = useState(null)
  const [ProductForm, setProductForm] = useState(FormData)
  const [EditProductForm, setEditProductForm] = useState(FormData)



  // show in hinddin buttons set ;
  const [ShowCreateProduct, setShowCreateProduct] = useState(false);
  const [ShowGetAllProduct, setShowGetAllProduct] = useState(false);
  const [ShowEditProduct, setShowEditProduct] = useState(false);

  // size btns
  const [ShowS, setShowS] = useState(false);
  const [ShowM, setShowM] = useState(false);
  const [ShowL, setShowL] = useState(false);
  const [ShowXL, setShowXL] = useState(false);
  const [ShowXXL, setShowXXL] = useState(false);


  const [ddd, setddd] = useState([])

  // get all products
  const a = async () => {
    const { data } = await axios.get(`http://localhost:8088/api/v1/products/products`)
    setddd(data.products)
    // console.log(data.products);

  }



  const createProductSizeHandle = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    if (value === "S") {
      setShowS(!ShowS)
    }
    else if (value === "M") {
      setShowM(!ShowM)
    }
    else if (value === "L") {
      setShowL(!ShowL)
    }
    else if (value === "XL") {
      setShowXL(!ShowXL)
    }
    else if (value === "XXL") {
      setShowXXL(!ShowXXL)
    }
    // if (checked) {
    //   setProductSize([...ProductSize , value])

    // }else{
    // const updatedSizes = setProductSize(ProductSize.filter((e)=>(e !== value)))
    //   // Update the ProductForm sizes as well
    //   setProductForm((prevForm) => ({
    //     ...prevForm,
    //     sizes: updatedSizes, // Keep sizes in sync with selected sizes
    //   }));
    // }
    setProductSize((prevSizes) => {
      const updatedSizes = checked ? [...prevSizes, value] : prevSizes.filter((size) => size !== value);

      // Update the ProductForm sizes as well
      setProductForm((prevForm) => ({
        ...prevForm,
        sizes: updatedSizes, // Keep sizes in sync with selected sizes
        thumbnail:thumbnallFile
      }));

      return updatedSizes;
    });
  }

  const ThumbnallHandla = (e)=>{
    setThumbnallFile(e.target.files[0]);
  }

  const createProductHandle = (e) => {
    // e.preventDefault();
    setProductForm({ ...ProductForm, [e.target.id]: e.target.value })

  }

  const EditProductHandle = (e) => {
    // e.preventDefault();
    setEditProductForm({ ...ProductForm, [e.target.id]: e.target.value })
  }

  //  create product
  const createProductSubmitHandle = async () => {
    try {
      // const requset = await axios.post(`http://localhost:8088/api/v1/products/create`, ProductForm)
      console.log("send data");
    } catch (error) {
console.log("create ",error);
console.log("not send data");
    }
  }
  //  Update product
  const EditProductSubmitHandle = async (id) => {
    console.log(id);
    // try {
    //   const requset = await axios.put(`http://localhost:8088/api/v1/products/update/${id}`, EditProductForm)
    //   console.log("send data");


    // } catch (error) {

    // }
  }
  //  Delete product
  const DeleteProductHandle = async (id) => {
    console.log(id);
    try {
      const requset = await axios.delete(`http://localhost:8088/api/v1/products/Delete/${id}`)
      console.log("send data");


    } catch (error) {

    }
  }


  useEffect(() => {
    // a()

  }, [])


  const ShowGetAllProdectHandle = () => {
    setShowGetAllProduct(true)
  }
  const ShowcreareProdectHandle = () => {
    setShowGetAllProduct(!ShowGetAllProduct)
    setShowCreateProduct(!ShowCreateProduct)
  }
  const ShowEditProdectHandle = () => {
    setShowGetAllProduct(true)
    setShowCreateProduct(false)
    setShowEditProduct(true)
  }
  const HideEditProdectHandle = () => {
    setShowGetAllProduct(false)
    setShowCreateProduct(false)
    setShowEditProduct(false)
  }

  console.log("EditProductForm", EditProductForm);
  console.log("ProductForm", ProductForm);
  console.log("thumbnallFile", thumbnallFile);
  console.log("checked", ProductSize);




  return (
    <>
<div className="">
  <Outlet/>
</div>
    </>
  )
}

export default Products