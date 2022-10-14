import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./registration/registrationSlice";

export const store = configureStore({
  reducer: {
    registration: loginReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;