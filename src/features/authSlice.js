import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isAuthenticated: !!localStorage.getItem("workAsanaToken"),
  },

  reducers: {
    loginReducer: (state, action) => {
      localStorage.setItem("workAsanaToken", action.payload.jwtToken);
      state.isAuthenticated = true;
    },

    logoutReducer: (state, action) => {
      localStorage.removeItem("workAsanaToken");
      state.isAuthenticated = false;
    },
  },
});

export const { loginReducer, logoutReducer } = authSlice.actions;
export default authSlice;
