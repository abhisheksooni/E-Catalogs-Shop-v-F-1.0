import authSlice from "@/redux/slices/authSlice.js";
import  cartSlice  from "@/redux/slices/cartsSlice.js";
import  orderSlice  from "@/redux/slices/bookingOrderSlice.js";
import productSlice from "@/redux/slices/productSlice.js"
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
    reducer:{
        auth:authSlice,
        cart:cartSlice,
        order:orderSlice,
        products:productSlice
    }
})


export default store;