import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./features/apiSlice";
import authSlice from "./features/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authSlice: authSlice.reducer,
  },

  middleware: (prevMiddleware) => prevMiddleware().concat(apiSlice.middleware),
});

export default store;
