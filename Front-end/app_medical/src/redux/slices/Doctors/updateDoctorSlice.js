import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const updateDoctor = createAsyncThunk(
  "doctors/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/doctors/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.doctor;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

const updateDoctorSlice = createSlice({
  name: "updateDoctor",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetUpdateDoctor: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDoctor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpdateDoctor } = updateDoctorSlice.actions;
export default updateDoctorSlice.reducer;
