import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  activeChatId: null,
};
const chatSlice = createSlice({
  name: "chats",
  initialState,
  messages: [],
  reducers: {
    newChat: (state, action) => {
      const { _id, title } = action.payload;
      state.chats.unshift({ _id, title: title, messages: [] });
      state.activeChatId = _id;
      console.log(title,state.activeChatId);
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },

    selectChat: (state, action) => {
      state.activeChatId = action.payload;
      
    },
    addUserMessage: {
      reducer(state, action) {
        const { chatId, message } = action.payload;
        const chat = state.chats.filter((c) => c.id === chatId);
        if (!chat) return;
        chat.push(message);
      },
      prepare(chatId, message) {
        return {
          payload: {
            chatId,
            message: { id: nanoid(), message, role: "user", ts: Date.now() },
          },
        };
      },
    },
    addAiMessage: {
      reducer(state, action) {
        const { chatId, message } = action.payload;
        const chat = state.chats.map((c) => c.id === chatId);
        if (!chat) return;
        chat.push(message);
      },
      prepare(chatId, message) {
        return {
          payload: {
            chatId,
            message: {
              id: nanoid(),
              message,
              role: "AI",
              ts: Date.now(),
            },
          },
        };
      },
    },
  },
});

export const { addAiMessage, addUserMessage, selectChat, newChat, setChats } =
  chatSlice.actions;
export default chatSlice.reducer;
