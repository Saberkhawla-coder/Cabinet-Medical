import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const fetchMyDoctor = createAsyncThunk("doctor/my", async (_,thunkAPI) => {
    try {
        const response = await api.get("/doctor/my");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const myDoctorSlice = createSlice({
    name: "myDoctor",
    initialState: {
        doctor: null,
        loading: false,
        error: null,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMyDoctor.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchMyDoctor.fulfilled,(state,action)=>{
            state.loading = false;
            state.doctor = action.payload;
        })
        .addCase(fetchMyDoctor.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default myDoctorSlice.reducer;
