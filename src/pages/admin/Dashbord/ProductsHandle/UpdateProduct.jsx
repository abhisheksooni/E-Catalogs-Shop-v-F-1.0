import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveLeft } from 'lucide-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { findProductOne } from '@/redux/slices/productSlice';

function UpdateProduct() {
  const updateProductSlug = useParams();
  const dispatch = useDispatch();
  const productSlice = useSelector(state => state.products);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [thumbnallFile, setThumbnallFile] = useState(null);
  const [productForm, setProductForm] = useState({
    thumbnail: "",
    title: "",
    price: 0,
    gender: "",
    stock: 0,
    sizes: [],
    discount: 0,
    description: "",
  });

  useEffect(() => {
    dispatch(findProductOne(updateProductSlug.slug));
  }, [dispatch, updateProductSlug.slug]);

  useEffect(() => {
    if (productSlice.data) {
      setProductForm(prev => ({
        ...prev,
        ...productSlice.data.product,
      }));
    }
  }, [productSlice.data]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductForm(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    setThumbnallFile(e.target.files[0]);
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setProductForm(prev => {
      const sizes = checked 
        ? [...prev.sizes, value] 
        : prev.sizes.filter(size => size !== value);
      return { ...prev, sizes };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      Object.keys(productForm).forEach(key => {
        formData.append(key, productForm[key]);
      });
      if (thumbnallFile) {
        formData.append("thumbnail", thumbnallFile);
      }

      await axios.put(`http://localhost:8088/api/v1/products/update/${productSlice.data.product._id}`, formData);
      // Optionally handle success here, e.g. redirect or show message
    } catch (error) {
      setError("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <nav className='flex w-full items-center justify-between py-3'>
        <span className="text-2xl font-semibold ml-2">Edit Product</span>
        <button className={`bg-c3 w-[100px] flex rounded-full py-1.5 justify-center border-c3 hover:bg-c1 hover:text-c3 text-white`}>
          <MoveLeft size={26} />
        </button>
      </nav>

      <form onSubmit={handleSubmit} className='flex gap-2 bg-c3/10 rounded-xl w-full h-full p-5'>
        <div className="max-w-[300px] w-full">
          <p className='text-xl mb-2 ml-2'>Thumbnail</p>
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
          </label>

          <label className="ml-2">
            Title (Name)
            <Input id="title" value={productForm.title} onChange={handleChange} type="text" placeholder='Product Title' />
          </label>
        </div>

        <div className="flex ml-6 p-2.5 w-full flex-col">
          <div className="flex items-center gap-4">
            <label>
              <p className='text-xl ml-2 mb-1'>Gender *</p>
              <select className='p-2 rounded-md px-4' id='gender' value={productForm.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>

            <p>Sizes:</p>
            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
              <Label key={size} className={`p-1 border-2 font-semibold rounded-lg ${productForm.sizes.includes(size) ? "border-c3 text-c3" : "border-c2/40 text-c2/40"}`}>
                <span className='mx-3 text-xl'>{size}</span>
                <input className='hidden' type="checkbox" value={size} onChange={handleSizeChange} checked={productForm.sizes.includes(size)} />
              </Label>
            ))}
          </div>

          <div className="flex items-center gap-20">
            <label>
              <span className="ml-2 mb-5">Stock *</span>
              <Input className="w-40" id="stock" value={productForm.stock} onChange={handleChange} type="number" placeholder="0" />
            </label>

            <label>
              Product discount Percent %
              <Input className="w-40" type="number" id="discount" value={productForm.discount} onChange={handleChange} placeholder="0" />
            </label>
          </div>

          <label className="ml-2 mb-2">
            Price *
            <Input className="w-40" type="number" id="price" value={productForm.price} onChange={handleChange} placeholder="00" />
          </label>

          <label className="ml-2 mb-2">
            Description *
            <Input type="text" className="w-[80%] h-[100px]" id="description" value={productForm.description} onChange={handleChange} placeholder="Product Description ..." />
          </label>

          <button type='submit' disabled={loading} className={`bg-c3 max-w-28 flex rounded-full py-1.5 justify-center border-c3 hover:bg-c1 hover:text-c3 text-white`}>
            {loading ? 'Updating...' : 'Done'}
          </button>

          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </section>
  );
}

export default UpdateProduct;
