import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// local store set up
const storedUser = localStorage.getItem("setUser");
const userData = JSON.parse(storedUser)
const userId = userData?.user._id;

export const createCart = createAsyncThunk(
    "cart/createCart",
    async (cartData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:8088/api/v1/cart/create`, cartData)

            return response.data

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (cartData, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:8088/api/v1/cart/delete/${userId}/${cartData}`)
 return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const ShowUserCarts = createAsyncThunk(
    "cart/showUserCart", 
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:8088/api/v1/cart/carts/${userId}`)
            return response.data.cart
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)



const cartSlice = createSlice({
    name: "cart",
    initialState: {
        loading: true,
        TotalCarts: 0,
        cart: [],
        error: null,
    },
    reducers: {
        clearState: (state) => {
            state.loading = false;
            state.error = null;

        },

    },
    extraReducers: (builder) => {

        // create
        builder.addCase(createCart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createCart.fulfilled, (state, action) => {
            state.loading = false
            state.cart = action.payload?.message || "Add to card your bugcet"
        })
        builder.addCase(createCart.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || "Error Add to card your"
        })

        // get & show user cart
        .addCase(ShowUserCarts.pending, (state) => {
            state.loading = true;
        })
        .addCase(ShowUserCarts.fulfilled, (state, action) => {
            state.loading = false
            state.TotalCarts = action.payload.length; 
            state.cart = action.payload
            // localStorage.setItem("cartItems",JSON.stringify(action.payload))
        })
        .addCase(ShowUserCarts.rejected,async (state, action) => {
            state.loading = false;
            state.error =  action.payload || "Error fetching carts";
        });

        // Delete


    }

})


export const { clearState } = cartSlice.actions;
export default cartSlice.reducer