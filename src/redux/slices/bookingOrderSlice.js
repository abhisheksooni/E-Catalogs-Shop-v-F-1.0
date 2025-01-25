import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



// local store set up
const storedUser = localStorage.getItem("setUser");
const userData = JSON.parse(storedUser)
const userId = userData?.user._id;

// user find All orders
export const findUserOrder = createAsyncThunk("order/findOrder",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8088/api/v1/order/${userId}`)

            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

// admin get All order
export const findAllOrders = createAsyncThunk("order/userFindAllOrder",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:8088/api/v1/order/admin/all`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

// admin ------------
export const updateOrder = createAsyncThunk("order/updateOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:8088/api/v1/order/admin/all`, orderData)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)




// user Create Order --------

export const createOrder = createAsyncThunk("order/createOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:8088/api/v1/order/`, orderData)
            // console.log("createOrder",response);
            // console.log("orderData",orderData);
            
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

// export const deleteOrder = createAsyncThunk("order/deleteOrder",
//     async (orderData, { rejectWithValue }) => {
//         try {

//         } catch (error) {
//             return rejectWithValue(error)
//         }
//     }
// )


const orderSlice = createSlice({
    name: "orders",
    initialState: {
        TotalOrders: 0,
        loading: true,
        error: null,
        orderStatus: [],
        order: [],
        allOrders: [],
        createOrderData:[]
    },
    extraReducers: (builder) => {
        builder
            .addCase(findUserOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(findUserOrder.fulfilled, (state, action) => {
                state.loading = false,
                    state.order = action.payload.orderWithDetails;
                state.TotalOrders = action.payload.orderWithDetails.length;
            })


            // get All orders
            .addCase(findAllOrders.fulfilled, (state, action) => {
                state.loading = false,
                    state.allOrders = action.payload.adminAllOrders
                state.TotalOrders = action.payload.adminAllOrders.length;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.orderStatus = action.payload.order
            })

            // create Order
            .addCase(createOrder.pending,(state)=>{
                state.loading = true
            })
            .addCase(createOrder.fulfilled,(state,action)=>{
                state.loading = false
                state.createOrderData = action.payload.data
            })
            .addCase(createOrder.rejected,()=>{})



    }
}
)

export default orderSlice.reducer


