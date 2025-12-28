import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const createAppointment = createAsyncThunk(
    "appointment/create",
    async (data,{rejectWithValue})=>{
        try{
            const res = await api.post("/appointments",data);
            return res.data.message;
        }catch(err){
            return rejectWithValue(err.response?.data?.message || "Error");
        }
    }
);

const appointmentSlice = createSlice({
    name:"appointment",
    initialState:{loading:false,error:null,success:null},
    reducers:{
        reset:(state)=>{
            state.success=null;
            state.error=null;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createAppointment.pending,(state)=>{state.loading=true})
        .addCase(createAppointment.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=action.payload;
        })
        .addCase(createAppointment.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
});

export const {reset} = appointmentSlice.actions;
export default appointmentSlice.reducer;
