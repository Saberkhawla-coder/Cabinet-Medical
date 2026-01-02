import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../api/axios";

// ------------------ FETCH ALL PATIENTS ------------------
export const fetchAllPatients = createAsyncThunk(
  "patients/all",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/patients");
      return res.data.patients;
    } catch (err) {
      return rejectWithValue("Error " + err);
    }
  }
);

// ------------------ ADD PATIENT ------------------
export const addPatient = createAsyncThunk(
  "patients/add",
  async (patientData, { rejectWithValue }) => {
    try {
      const res = await api.post("/patients", patientData);
      return res.data.patient;
    } catch (err) {
      return rejectWithValue("Error " + err);
    }
  }
);

// ------------------ UPDATE PATIENT ------------------
export const updatePatient = createAsyncThunk(
  "patients/update",
  async ({ id, patientData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/patients/${id}`, patientData);
      return res.data.patient;
    } catch (err) {
      return rejectWithValue("Error " + err);
    }
  }
);

// ------------------ PATIENT SLICE ------------------
const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    patients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // --- fetchAllPatients ---
    builder
      .addCase(fetchAllPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(fetchAllPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // --- addPatient ---
    builder
      .addCase(addPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patients.push(action.payload);
      })
      .addCase(addPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // --- updatePatient ---
    builder
      .addCase(updatePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.patients.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.patients[index] = action.payload;
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default patientsSlice.reducer;
