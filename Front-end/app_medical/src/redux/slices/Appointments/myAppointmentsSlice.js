import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const fetchMyAppointments = createAsyncThunk(
  "appointments/my",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/appointments/my");
      return res.data;
    } catch (err) {
      if (err.response?.status === 403) {
        return rejectWithValue("Accès interdit");
      }
      return rejectWithValue(
        err.response?.data?.message || "Erreur lors du chargement des rendez-vous"
      );
    }}
);

export const cancelAppointment = createAsyncThunk(
  "appointments/cancel",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.put(`/appointments/${id}`, { status: "cancelled" });
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Cannot cancel appointment: " + err.message);
    }
  }
);

const myAppointmentsSlice = createSlice({
  name: "myAppointments",
  initialState: { loading: false, error: null, appointments: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchMyAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        // Mettre à jour localement le statut du rendez-vous annulé
        const index = state.appointments.findIndex(appt => appt.id === action.payload.id);
        if (index !== -1) {
          state.appointments[index].status = "cancelled";
        }
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default myAppointmentsSlice.reducer;
