import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const addAappoitment = createAsyncThunk(
  'appointments/add',
  async (form, { rejectWithValue }) => {
    try {
      const res = await api.post('/appointments', form);
      return res.data;
    } catch (err) {
      return rejectWithValue(`Error ${err}`);
    }
  }
);

export const deleteAappoitment = createAsyncThunk(
  'appointments/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/appointments/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(`Error ${err}`);
    }
  }
);
export const updateAappoitment = createAsyncThunk(
  'appointments/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/appointments/${id}`, data);
      return res.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    loading: false,
    error: null,
    appointments: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(addAappoitment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAappoitment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(addAappoitment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(deleteAappoitment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAappoitment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(a => a.id !== action.payload);
      })
      .addCase(deleteAappoitment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateAappoitment.pending, (state)=>{
        state.loading=true,
        state.error=null
      })
      .addCase(updateAappoitment.fulfilled, (state,action)=>{
        state.loading=false;
        const index=state.appointments.findIndex(i=>i.id===action.payload.id)
        if(index !==-1 ){
              state.appointments[index] = action.payload;
        }
      })
      .addCase(updateAappoitment.rejected, (state, action)=>{
        state.loading=false,
        state.error=action.payload
      })

  }
});

export default appointmentsSlice.reducer;
