import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../../api/axios";


export const updateAppointmentStatus = createAsyncThunk(
  "appointments/updateStatus",
  async ({ id, status }) => {
    const res = await api.put(`/appointments/${id}`, { status });
    return res.data;
  }
);

const updateStatusSlice=createSlice({
    name:"updateAppointmentStatus",
    initialState:{
        loading:false,
        error:null,
        updateAappoitmentDoc:null

    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(updateAppointmentStatus.pending, (state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(updateAppointmentStatus.fulfilled, (state,action)=>{
            state.loading=false,
            state.error=null
            state.updateAappoitmentDoc=action.payload
        })
        .addCase(updateAppointmentStatus.rejected, (state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
    }
})

export default updateStatusSlice.reducer