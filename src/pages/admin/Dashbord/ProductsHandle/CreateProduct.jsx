
import React, { useState } from 'react'

import { MoveLeft } from 'lucide-react';
import axios from 'axios';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';

function CreateProduct() {
  {/* thumbnail, price, description, title, gender, images, stock, sizes, discount */ }
  const [ProductSize, setProductSize] = useState([])

  let FormData = {
    thumbnail: "",
    title: "",
    price: Number,
    gender: "",
    stock: Number,
    sizes: [],
    discount: 0,
    description: "",
  }

  // create product
  const [thumbnallFile, setThumbnallFile] = useState(null)
  const [ProductForm, setProductForm] = useState(FormData)

  // size btns
  const [ShowS, setShowS] = useState(false);
  const [ShowM, setShowM] = useState(false);
  const [ShowL, setShowL] = useState(false);
  const [ShowXL, setShowXL] = useState(false);
  const [ShowXXL, setShowXXL] = useState(false);

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
 
    setProductSize((prevSizes) => {
      const updatedSizes = checked ? [...prevSizes, value] : prevSizes.filter((size) => size !== value);

      // Update the ProductForm sizes as well
      setProductForm((prevForm) => ({
        ...prevForm,
        sizes: updatedSizes, // Keep sizes in sync with selected sizes
        // thumbnail:thumbnallFile
      }));

      return updatedSizes;
    });
  }

  const ThumbnallHandla = (e) => {
    e.preventDefault();
    // setThumbnallFile(e.target.files[0]);

    const filee = e.target.files
    const ArryFile = Array.from(filee)
    setThumbnallFile(ArryFile);
  }

  const createProductHandle = (e) => {
    setProductForm({ ...ProductForm, [e.target.id]: e.target.value })
  }

  //  create product
  const createProductSubmitHandle = async (e) => {
    // e.preventDefault();
    const formData = new window.FormData();
    // Append product data to FormData
    for (const key in ProductForm) {
      if (key === 'sizes') {
        ProductForm.sizes.forEach(size => {
          formData.append('sizes[]', size);
        });
      } else {
        formData.append(key, ProductForm[key]);
      }
    }
    // Append the thumbnail file
    // sengal file
    // if (thumbnallFile) {
    //   formData.append('thumbnail', thumbnallFile);
    // }
    // arry files
    if (thumbnallFile.length > 0) {
      Array.from(thumbnallFile).forEach((file) => {
          formData.append('imagesArrey', file);
      });
  }
    console.log("uploadding");
    try {
      toast.success("Product upload successfully")
      const request = await axios.post('http://localhost:8088/api/v1/products/create', formData);
      console.log("request",request);
      
      // Provide success feedback to the user
    } catch (error) {
      console.error("Error sending data", error);
      // Provide error feedback to the user
    } finally {
      console.log("uploadding Done");

    }
  }



  console.log("ProductForm", ProductForm);
  console.log("thumbnallFile", thumbnallFile);
  console.log("checked", ProductSize);

  return (
    <>
      {/* create Product className={` ${ShowCreateProduct ? "" : "hidden"}`} */}
      <section >
        <nav className='flex w-full items-center justify-between py-3'>
          <span className="text-2xl font-semibold ml-2">Create Product</span>

          <button className={` bg-c3 w-[100px] flex rounded-full py-1.5 justify-center border-c3 hover:bg-c1 hover:text-c3 text-white`}><MoveLeft size={26} /></button>
        </nav>

        {/* thumbnail, price, description, title, gender, images, stock, sizes, discount */}
        <form onSubmit={createProductSubmitHandle} className='flex gap-2 bg-c3/10 rounded-xl w-full h-full p-5'>

          {/* <label htmlFor="thumbnail" >Thumbnail
            <input type="file" onChange={(e) => setThumbnallFile(e.target.value)} className="max-w-[230px] h-[170px]" />
          </label> */}

          <div className="max-w-[300px] w-full">
            <p className='text-xl mb-2 ml-2'>Thumbnail</p>
            <div class="flex  justify-center w-full mb-5">

              <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG </p>
                </div>
                {/* (e) => setThumbnallFile(e.target.value) */}
                <input id="dropzone-file" type="file" class="hidden" onChange={ThumbnallHandla} multiple />
              </label>
            </div>

            <label className="ml-2">
              Title ( Name )
              <input id="title" value={ProductForm.title} onChange={createProductHandle} type="text" placeholder='Product Title ' />
            </label>
          </div>
          
          <div className="flex ml-6 p-2.5 w-full *:mb-3 *:p-2 flex-col">
            {/* Gender and Sizes */}
            <div className=" flex items-center gap-4">

              <label>
                <p className='text-xl ml-2 mb-1'>Gender *</p>
                <select className='p-2 rounded-md px-4' name='Gender' id='gender' value={ProductForm.gender} onChange={createProductHandle}>
                  <option value={""} >Select Gender</option>
                  <option value={"Male"} >Male</option>
                  <option value={"Female"}>Female</option>
                </select>
              </label>

              {/* <div className=" *:ml-4  hover:*:cursor-pointer">


                <label className={`   font-medium rounded-lg text-xl`}> <span>sizes:</span> &nbsp; </label>
                <label className={`${ShowS ? "border-c3 text-c3" : "border-c2/40 text-c2/40"} p-1.5  border-2 font-semibold rounded-lg`}>
                  <span className='ml-2.5 text-xl'>S</span> &nbsp;
                  <input className='hidden' type="checkbox" name="size" id="size" value={"S"} onClick={createProductSizeHandle} />
                </label>
                <label className={`${ShowM ? "border-c3 text-c3" : "border-c2/40 text-c2/40"} p-1.5  border-2 font-semibold rounded-lg`}>
                  <span className='ml-2.5 text-xl'>M</span> &nbsp;
                  <input className='hidden' type="checkbox" name="size" id="size" value={"M"} onClick={createProductSizeHandle} />
                </label>
                <label className={`${ShowL ? "border-c3 text-c3" : "border-c2/40 text-c2/40"} p-1.5  border-2 font-semibold rounded-lg`}>
                  <span className='ml-2.5 text-xl'>L</span> &nbsp;
                  <input className='hidden' type="checkbox" name="size" id="size" value={"L"} onClick={createProductSizeHandle} />
                </label>
                <label className={`${ShowXL ? "border-c3 text-c3" : "border-c2/40 text-c2/40"} p-1.5  border-2 font-semibold rounded-lg`}>
                  <span className='ml-2.5 text-xl'>XL</span> &nbsp;
                  <input className='hidden' type="checkbox" name="size" id="size" value={"XL"} onClick={createProductSizeHandle} />
                </label>
                <label className={`${ShowXXL ? "border-c3 text-c3" : "border-c2/40 text-c2/40"} p-1.5 border-2 font-semibold rounded-lg`}>
                  <span className='ml-2.5 text-xl'>XXL</span> &nbsp;
                  <input className='hidden' type="checkbox" name="size" id="size" value={"XXL"} onClick={createProductSizeHandle} />
                </label>
              </div> */}

              {/* <label className="font-medium rounded-lg text-xl">Sizes :
                
              </label> */}
              <p>Sizes : </p>
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <Label key={size} className={`p-1 border-2 font-semibold rounded-lg ${ProductSize.includes(size) ? "border-c3 text-c3" : "border-c2/40 text-c2/40"}`}>
                  <span className='mx-3 text-xl'>{size}</span>
                  <input className='hidden' type="checkbox" value={size} onChange={createProductSizeHandle} />
                </Label>
              ))}

            </div>

            <div className=" flex items-center gap-20">

              <label  >
                <span className="ml-2 mb-5">Stock *</span>
                <input className="w-40" id="stock" value={ProductForm.stock} onChange={createProductHandle} type="number" placeholder="0" />
              </label>

              <label className="ml-2 mb-2" >
                Product discount Persent %
                <input className="w-40" type="number" id="discount" value={ProductForm.discount} onChange={createProductHandle} placeholder="0" />
              </label>

            </div>

            <label className="ml-2 mb-2">
              Price *
              <input className="w-40" type="number" id="price" value={ProductForm.price} onChange={createProductHandle} placeholder="00" />
            </label>

            <label className="ml-2 mb-2">
              Description *
              <input type="test" className="w-[80%] h-[100px]" id="description" value={ProductForm.description} onChange={createProductHandle} placeholder=" Product Description ... " />
            </label>

            <button type='submit' className={`  bg-c3 max-w-28 flex rounded-full py-1.5 justify-center border-c3 hover:bg-c1 hover:text-c3 text-white`}>Done</button>
          </div>
        </form>
      </section>

    </>
  )
}

export default CreateProduct