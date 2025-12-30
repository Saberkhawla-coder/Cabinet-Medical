import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const fetchDoctorPatients = createAsyncThunk(
  "doctor/fetchPatients",
  async () => {
    const res = await api.get("/doctor/patients");
    return res.data;
  }
);

const doctorPatientsSlice = createSlice({
  name: "doctorPatients",
  initialState: { patients: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorPatients.pending, (state) => { state.loading = true })
      .addCase(fetchDoctorPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(fetchDoctorPatients.rejected, (state) => { state.loading = false })
  },
});

export default doctorPatientsSlice.reducer;
