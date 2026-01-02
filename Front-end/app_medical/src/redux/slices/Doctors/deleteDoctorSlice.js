import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios"; // ton axios

export const deleteDoctor = createAsyncThunk(
  "doctors/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/doctors/${id}`);
      return id; // renvoyer l'id pour retirer du store
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const deleteDoctorSlice = createSlice({
  name: "deleteDoctor",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetDeleteDoctor: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDoctor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDeleteDoctor } = deleteDoctorSlice.actions;
export default deleteDoctorSlice.reducer;
