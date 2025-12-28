import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const fetchAllContact = createAsyncThunk(
  "contact/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/contacts");
      return res.data.contacts;
    } catch (err) {
      return rejectWithValue("Erreur lors du chargement"+err);
    }
  }
);
export const readAllNotifications = createAsyncThunk(
  'contacts/readAll',
  async (_, { dispatch }) => {
    await api.post('/contacts/read-all');
    dispatch(markAllAsRead());
  }
);
const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setContacts(state, action) {
      state.contacts = action.payload;
    },

    markAllAsRead(state) {
      state.contacts = state.contacts.map(msg => ({ ...msg, read: true }))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchAllContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setContacts, markAllAsRead } = contactsSlice.actions
export default contactsSlice.reducer;
