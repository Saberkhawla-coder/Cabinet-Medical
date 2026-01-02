import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const deletePatient = createAsyncThunk(
  "patient/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/patients/${id}`);
      return res.data; // ici res.data.id sera utilisé
    } catch (err) {
      return rejectWithValue("not deleted");
    }
  }
);


const deleteSlice = createSlice({
  name: "deletePatient",
  initialState: {
    loading: false,
    error: null,
    success: false,
    patients: [], // ajouté
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // seulement si tu gères localement la liste
        if(state.patients.length) {
          state.patients = state.patients.filter(
            (p) => p.id !== action.payload.id
          );
        }
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default deleteSlice.reducer;
