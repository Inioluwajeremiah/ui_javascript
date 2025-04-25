import { createSlice } from "@reduxjs/toolkit";

// interface AuthState {
//   userInfo: string;
// }

const initialState = {
  userInfo: localStorage.getItem("userInfo") ?? "",
  menuInfo: "",
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", action.payload);
    },
    logout: (state) => {
      state.userInfo = "";
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
