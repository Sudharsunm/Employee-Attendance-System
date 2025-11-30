import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/auth";

// Load token from storage
const token = localStorage.getItem("token");

// ------------------- LOGIN -------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/login`, { email, password });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

// ------------------- REGISTER -------------------
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/register`, {
        name,
        email,
        password,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

// ------------------- LOAD USER -------------------
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to load user");
    }
  }
);

// ------------------- SLICE -------------------
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: token || "",
    role: "",
    loading: false,
    error: "",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = "";
      state.role = "";
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.error = "";
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // REGISTER
      .addCase(registerUser.fulfilled, (state) => {
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // LOAD USER
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
