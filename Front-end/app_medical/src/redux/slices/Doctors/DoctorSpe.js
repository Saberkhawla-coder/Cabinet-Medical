import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const fetchDoctorConnected=createAsyncThunk(
    'Doctor/me',
    async(_, {rejectWithValue})=>{
        try{
            const res=await api.get('/doctors/my')
        return res.data
        }catch(err){
        return rejectWithValue('Error is '+err)
    }
        
    }
)
const DoctorSlice = createSlice({
  name: "doctorConnected",
  initialState: {
    doctor:JSON.parse(localStorage.getItem("doctor")) || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorConnected.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorConnected.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && Object.keys(action.payload).length > 0) {
        state.doctor = action.payload;
        localStorage.setItem("doctor", JSON.stringify(action.payload));
        } else {
            state.doctor = null;
        }
        localStorage.setItem("doctor", JSON.stringify(action.payload));
      })
      .addCase(fetchDoctorConnected.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default DoctorSlice.reducer;
