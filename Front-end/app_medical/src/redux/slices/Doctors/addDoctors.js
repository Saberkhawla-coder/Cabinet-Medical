import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const createDoctor = createAsyncThunk(
  "doctor/createDoctor",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/doctors", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const createDoctorSlice = createSlice({
  name: "createDoctor",
  initialState: {
    loading: false,
    success: false,
    error: null,
    doctor: null,
  },
  reducers: {
    resetCreateDoctor: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.doctor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctor = action.payload.doctor;
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateDoctor } = createDoctorSlice.actions;
export default createDoctorSlice.reducer;
