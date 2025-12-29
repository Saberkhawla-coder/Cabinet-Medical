import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const fetchMyDoctorAppointments = createAsyncThunk(
  "doctor/appointments",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/doctor/appointments");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const myAppointmentsSlice = createSlice({
  name: "myAppointments",
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMyDoctorAppointments.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMyDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchMyDoctorAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default myAppointmentsSlice.reducer;
