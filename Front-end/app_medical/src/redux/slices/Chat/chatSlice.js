import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

// Récupérer tous les messages pour un utilisateur spécifique
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (otherUserId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/chat/messages/${otherUserId}`);
      return { otherUserId, messages: data };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Envoyer un message (texte, image ou fichier)
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (msg, { getState, rejectWithValue }) => {
    try {
      let response;
      if (msg instanceof FormData) {
        response = await api.post("/chat/send", msg, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await api.post("/chat/send", msg);
      }

      // Récupérer l'ID de l'utilisateur connecté depuis Redux
      const currentUserId = getState().auth.user.id;

      return { message: response.data, currentUserId };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: { messagesByUser: {}, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchMessages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        const { otherUserId, messages } = action.payload;
        console.log("Messages reçus pour l'utilisateur", otherUserId, ":", messages);
        state.messagesByUser[otherUserId] = messages;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.loading = false;
      })

      // sendMessage
      .addCase(sendMessage.fulfilled, (state, action) => {
            const { message: msg, currentUserId } = action.payload;
            const chatId = msg.sender_id === currentUserId ? msg.receiver_id : msg.sender_id;

            if (!state.messagesByUser[chatId]) state.messagesByUser[chatId] = [];
            state.messagesByUser[chatId].push(msg);

            console.log("Message ajouté dans le chat correct :", chatId, msg);
            });

  },
});

export default messagesSlice.reducer;
