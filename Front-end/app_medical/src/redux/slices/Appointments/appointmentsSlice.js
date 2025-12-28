import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../api/axios";


export const fetchappointments=createAsyncThunk(
    'appointments/all',
    async(_,{rejectWithValue})=>{
        try{
            const res=await api.get('/appointments')
            return res.data
        }catch(err){
            return rejectWithValue('Error is:'+err)
        }
    }
)
const appointmentsSlice = createSlice({
    name: "appointments",
    initialState: {
        loading: false,
        error: null,
        appointments: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchappointments.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchappointments.fulfilled, (state, action) => {
            state.loading = false;
            state.appointments = action.payload;
        })
        .addCase(fetchappointments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default appointmentsSlice.reducer

