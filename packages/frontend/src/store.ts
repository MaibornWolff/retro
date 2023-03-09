import { configureStore } from "@reduxjs/toolkit";
import { pokerSlice } from "./poker/pokerSlice";

export const store = configureStore({
  reducer: {
    poker: pokerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
