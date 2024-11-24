import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// local store set up
const storedUser = localStorage.getItem("setUser");
const userData = JSON.parse(storedUser)
const userId = userData?.user._id;


export const signupUser = createAsyncThunk(
  "signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8088/api/v1/user/sign-up", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)


export const loginUser = createAsyncThunk("loginUser", async (userLoginData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`http://localhost:8088/api/v1/user/sign-in`, userLoginData)
    // console.log("res-data: ",response.data);
    return response.data
  } catch (error) {
    return rejectWithValue(error);
  }
})
export const updateUser = createAsyncThunk("updateUser", async (updateUserData, { rejectWithValue }) => {
  try {
    const response = await axios.put(`http://localhost:8088/api/v1/user/update/${userId}`, updateUserData)
   
    
    return response.data
  } catch (error) {
    return rejectWithValue(error);
  }
})




export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [],
    localUser: null,
    loading: false,
    error: null,
    login: false,
    isAdmin: false,
    success:false
  },

  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;

    },
    // loginRequest: (state) => {
    //   state.status = 'loading';
    // },

    // loginSuccess: (state, action) => {
    //   state.user = action.payload.user;
    //   localStorage.setItem('token', action.payload.token);
    // },

    // loginFailure: (state, action) => {
    //   state.error = action.payload;
    // },
    logout: (state) => {
      state.user = null;
      state.login = false
      // if (state.isAdmin = true) {
      //   state.isAdmin = false
      // }
      localStorage.removeItem('setUser');
    }

  },
  extraReducers: (builder) => {

    builder


      // signupUser

      .addCase(signupUser.pending, (state) => {
        state.loading = true
      })

      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload?.user
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.user = "nouser"
        state.error = action.payload?.message || error.message || 'Something went wrong authslice in signup errer';
      })

      //loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        // {"success":false,"message":"user not exgisted"}
        // let data = state.user = action.payload;
        let data = action.payload;
        if (data.success===false) {
          state.success = false
  
        // const storedUser = localStorage.getItem("setUser");
        //   const userData = JSON.parse(storedUser)

        //   if (userData) {
        //     localStorage.removeItem("setUser"),
        //   }

        }else{
          state.success = true
          localStorage.setItem("setUser", JSON.stringify(data))
          const storedUser = localStorage.getItem("setUser");
          const userData = JSON.parse(storedUser)
          state.localUser = userData
        }
        
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
       state.success = false
        
        // state.error = action.payload;
        state.error = 'Something went wrong authslice in login errer';
      })

  }

})


export const { clearState, logout } = authSlice.actions;
export default authSlice.reducer

