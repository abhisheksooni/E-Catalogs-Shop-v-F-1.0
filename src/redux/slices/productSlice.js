import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const storedUser = localStorage.getItem("setUser");
const userData = JSON.parse(storedUser)
const userId = userData?.user._id;



//Admin- create product
export const createProduct = createAsyncThunk("createProduct", async (productFormData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:8088/api/v1/product/create`, productFormData)
        return response.data
    } catch (error) {
        return rejectWithValue(error);
    }

})


// get All products
export const products = createAsyncThunk("products", async (findData, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:8088/api/v1/products/products/${findData}`)
        return response.data.products
    } catch (error) {
        return rejectWithValue(error);
    }
})

// find one product
export const findProductOne = createAsyncThunk("findOneProduct", async (findProductOneData, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:8088/api/v1/products/product/${findProductOneData}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

//admin update product
export const updateProduct = createAsyncThunk("updateProduct", async (updateProductId, { rejectWithValue }) => {
    try {
        const response = axios.put(`http://localhost:8088/api/v1/products/update/${updateProductId}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


//admin Delete product
export const deleteProduct = createAsyncThunk("deleteProduct", async (deleteProductId, { rejectWithValue }) => {
    try {
        const response = axios.delete(`http://localhost:8088/api/v1/products/update/${deleteProductId}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


const productSlice = createSlice({
    name: "products",
    initialState: {
        loading: true,
        error: null,
        userId:userId?userId:"",
        data: [],
    },
    reducers: {
        // crearState:(state)=>{}
    },
    extraReducers: (builder) => {
        builder
            // get Products 
            .addCase(products.pending, (state) => {
                state.loading = true
            })
            .addCase(products.fulfilled, (state, action) => {
                if (action.payload) {
                    state.data = action.payload
                    state.loading = false
                }else{
                    state.loading = false

                }
                // state.data = action.payload
            })
            .addCase(products.rejected, (state, acrion) => {
                state.loading = false
                state.error = "errer get products"
            })


            // one product
            .addCase(findProductOne.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })

            // update product
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
    }

})

export default productSlice.reducer