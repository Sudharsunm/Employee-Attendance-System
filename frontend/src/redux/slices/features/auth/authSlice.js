// src/redux/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./../../../../api/api";

// POST /auth/login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      // res.data: { msg, token, user }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user?.role || res.data.role || "");
      return res.data;
    } catch (err) {
      const message = err?.response?.data?.msg || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// POST /auth/register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password, role }, thunkAPI) => {
    try {
      const res = await API.post("/auth/register", { name, email, password, role });
      return res.data;
    } catch (err) {
      const message = err?.response?.data?.msg || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET /auth/me
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/auth/me");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to load user");
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("token") || "",
  role: localStorage.getItem("role") || "",
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = "";
      state.role = "";
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.token = a.payload.token;
        s.role = a.payload.user?.role || a.payload.role || "";
        s.error = null;
      })
      .addCase(loginUser.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // register
      .addCase(registerUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(registerUser.fulfilled, (s) => { s.loading = false; })
      .addCase(registerUser.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // load user
      .addCase(loadUser.fulfilled, (s, a) => { s.user = a.payload; })
      .addCase(loadUser.rejected, (s) => { /* ignore */ });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
