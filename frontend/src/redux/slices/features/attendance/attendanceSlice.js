// src/redux/features/attendance/attendanceSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../../api/api";

// Employee actions
export const checkIn = createAsyncThunk("attendance/checkIn", async (_, thunkAPI) => {
  try {
    const res = await API.post("/attendance/checkin");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.msg || err.message);
  }
});
export const checkOut = createAsyncThunk("attendance/checkOut", async (_, thunkAPI) => {
  try {
    const res = await API.post("/attendance/checkout");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.msg || err.message);
  }
});
export const fetchMyHistory = createAsyncThunk("attendance/fetchMyHistory", async (_, thunkAPI) => {
  try {
    const res = await API.get("/attendance/my-history");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.msg || err.message);
  }
});
export const fetchTodayStatus = createAsyncThunk("attendance/fetchTodayStatus", async (_, thunkAPI) => {
  try {
    const res = await API.get("/attendance/today");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.msg || err.message);
  }
});

// Manager actions
export const fetchAllAttendance = createAsyncThunk("attendance/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await API.get("/attendance/all");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.msg || err.message);
  }
});
export const fetchEmployeeAttendance = createAsyncThunk("attendance/fetchEmployee", async (id, thunkAPI) => {
  try {
    const res = await API.get(`/attendance/employee/${id}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.msg || err.message);
  }
});
export const fetchTeamSummary = createAsyncThunk("attendance/fetchSummary", async (_, thunkAPI) => {
  try {
    const res = await API.get("/attendance/summary");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.msg || err.message);
  }
});
export const fetchPresentToday = createAsyncThunk("attendance/presentToday", async (_, thunkAPI) => {
  try {
    const res = await API.get("/attendance/today-status");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.msg || err.message);
  }
});
export const exportCSV = createAsyncThunk("attendance/exportCSV", async (_, thunkAPI) => {
  try {
    const res = await API.get("/attendance/export");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.msg || err.message);
  }
});

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    myHistory: [],
    todayStatus: null,
    allRecords: [],
    employeeRecords: [],
    teamSummary: null,
    presentToday: [],
    loading: false,
    error: null,
    lastAction: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkIn.fulfilled, (s, a) => { s.lastAction = a.payload; s.loading = false; })
      .addCase(checkIn.rejected, (s, a) => { s.error = a.payload; s.loading = false; })
      .addCase(checkIn.pending, (s) => { s.loading = true; })

      .addCase(checkOut.fulfilled, (s, a) => { s.lastAction = a.payload; s.loading = false; })
      .addCase(checkOut.rejected, (s, a) => { s.error = a.payload; s.loading = false; })
      .addCase(checkOut.pending, (s) => { s.loading = true; })

      .addCase(fetchMyHistory.fulfilled, (s, a) => { s.myHistory = a.payload; s.loading = false; })
      .addCase(fetchMyHistory.rejected, (s, a) => { s.error = a.payload; s.loading = false; })
      .addCase(fetchMyHistory.pending, (s) => { s.loading = true; })

      .addCase(fetchTodayStatus.fulfilled, (s, a) => { s.todayStatus = a.payload; s.loading = false; })
      .addCase(fetchAllAttendance.fulfilled, (s, a) => { s.allRecords = a.payload; s.loading = false; })
      .addCase(fetchEmployeeAttendance.fulfilled, (s, a) => { s.employeeRecords = a.payload; s.loading = false; })
      .addCase(fetchTeamSummary.fulfilled, (s, a) => { s.teamSummary = a.payload; s.loading = false; })
      .addCase(fetchPresentToday.fulfilled, (s, a) => { s.presentToday = a.payload; s.loading = false; });
  },
});

export default attendanceSlice.reducer;
