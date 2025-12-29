import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const fetchMyDoctorPatients = createAsyncThunk(
  "doctor/patients",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/doctor/patients");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const myPatientsSlice = createSlice({
  name: "myPatients",
  initialState: {
    patients: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMyDoctorPatients.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMyDoctorPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(fetchMyDoctorPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default myPatientsSlice.reducer;
