import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios"

export const FetchBlogs = createAsyncThunk("blogs/fetchBlogs",async()=>{
       const response =  await axios.get("http://localhost:8000/blog/read-blog",{withCredentials:true});
       return response.data
})
const blogSlice = createSlice({
    name:"blog",
    initialState:{
        list:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(FetchBlogs.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(FetchBlogs.fulfilled,(state,action)=>{
            state.loading=false;
            state.list=action.payload
        })
        .addCase(FetchBlogs.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        });
    }
})
export default blogSlice.reducer