import { configureStore } from "@reduxjs/toolkit";
import chatreducer from "./Reducers";

const store = configureStore({
  reducer: {
    chats: chatreducer,
  },
});

export default store;
