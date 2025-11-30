// src/pages/employee/EmployeeDashboard.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkIn, checkOut, fetchMyHistory, fetchTodayStatus } from "../../redux/slices/features/attendance/attendanceSlice"//./../redux/slice/features/attendance/attendanceSlice"
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function EmployeeDashboard() {
  const dispatch = useDispatch();
  const { myHistory, todayStatus, loading, lastAction } = useSelector((s) => s.attendance);

  useEffect(() => {
    dispatch(fetchTodayStatus());
    dispatch(fetchMyHistory());
  }, [dispatch, lastAction]);

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Employee Dashboard</h2>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => dispatch(checkIn())}>Check In</button>
          <button onClick={() => dispatch(checkOut())}>Check Out</button>
          <Link to="/employee/history"><button>My History</button></Link>
        </div>

        <div style={{ marginTop: 20 }}>
          <h4>Today's status</h4>
          <pre>{JSON.stringify(todayStatus, null, 2)}</pre>
        </div>

        <div style={{ marginTop: 20 }}>
          <h4>Recent Records</h4>
          <ul>
            {myHistory.slice(0, 7).map((r) => (
              <li key={r._id || r.date}>
                {r.date || new Date(r.time).toLocaleDateString()} — In: {r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString() : "-"} Out: {r.checkOutTime ? new Date(r.checkOutTime).toLocaleTimeString() : "-"} Hours: {r.totalHours || "-"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
