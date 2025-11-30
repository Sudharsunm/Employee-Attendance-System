// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/features/auth/authSlice";
import attendanceReducer from "./slices/features/attendance/attendanceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
  },
});
