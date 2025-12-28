import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const fetchAllPatients=createAsyncThunk(
    'patients/all',
   async(_,{rejectWithValue})=>{
    try{
        const res=await api.get('/patients')
        return res.data.patients; 
    }catch(err){
        return rejectWithValue('Error '+err)
    }
   }
)
const patientsSlice=createSlice({
    name:"patients",
    initialState:{
        patients:[],
        loading:false,
        error:null  
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllPatients.pending, (state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(fetchAllPatients.fulfilled, (state, action)=>{
            state.loading=false,
            state.patients=action.payload
        })
        .addCase(fetchAllPatients.rejected, (state, action)=>{
            state.loading=false,
            state.patients=action.payload
        })
    }
})


export default patientsSlice.reducer
