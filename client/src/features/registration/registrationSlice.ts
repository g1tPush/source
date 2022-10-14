import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "../storage";

interface loginState {
  id: number | null;
  username: string;
  email: string;
  image: string | null;
  token: string;
  isLoggedIn: boolean;
  header: string;
}

const initialState: loginState = storage.getItem("auth") || {
  id: null,
  username: "",
  email: "",
  image: null,
  token: "",
  header: "",
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state, action) {
      storage.setItem("auth", { ...action.payload, isLoggedIn: true });
      return { ...action.payload, isLoggedIn: true };
    },
    updateUser(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    logout(state) {
      state.id = null;
      state.username = "";
      state.email = "";
      state.image = null;
      state.token = "";
      state.header = "";
      state.isLoggedIn = false;
      storage.clear();
    },
  },
});

export const { login, updateUser, logout } = loginSlice.actions;
export default loginSlice.reducer;
