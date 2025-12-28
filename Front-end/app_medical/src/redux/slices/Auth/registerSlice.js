import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

/**
 * Thunk : Register user
 */
export const registerUser = createAsyncThunk(
  "register/user",
  async (formData, { rejectWithValue }) => {
    try {
      await api.post("/register", formData);
      return true;
    } catch (err) {
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue("Registration failed");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetRegister: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER PENDING
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // REGISTER SUCCESS
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })

      // REGISTER ERROR
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
