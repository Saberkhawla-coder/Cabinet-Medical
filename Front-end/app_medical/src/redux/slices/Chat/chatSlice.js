import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (doctorId) => {
    const { data } = await api.get(`/messages/${doctorId}`);
    return { doctorId, messages: data };
  }
);


export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (msg) => {
    let response;
    if (msg instanceof FormData) {
      response = await api.post("/messages", msg, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      response = await api.post("/messages", msg);
    }
    return response.data; 
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: { messagesByDoctor: {}, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        const { doctorId, messages } = action.payload;
        state.messagesByDoctor[doctorId] = messages;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.loading = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const msg = action.payload;
        const doctorId = msg.doctor_id;
        if (!state.messagesByDoctor[doctorId]) state.messagesByDoctor[doctorId] = [];
        state.messagesByDoctor[doctorId].push(msg);
      });
  },
});

export default messagesSlice.reducer;
