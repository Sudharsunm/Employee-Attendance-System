// src/pages/employee/AttendanceHistory.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyHistory } from "../../redux/slices/features/attendance/attendanceSlice";
import Navbar from "../../components/Navbar";

export default function AttendanceHistory() {
  const dispatch = useDispatch();
  const { myHistory } = useSelector((s) => s.attendance);

  useEffect(() => {
    dispatch(fetchMyHistory());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>My Attendance History</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Date</th><th>Check In</th><th>Check Out</th><th>Status</th><th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {myHistory.map((r) => (
              <tr key={r._id || r.date}>
                <td>{r.date || new Date(r.time).toLocaleDateString()}</td>
                <td>{r.checkInTime ? new Date(r.checkInTime).toLocaleString() : "-"}</td>
                <td>{r.checkOutTime ? new Date(r.checkOutTime).toLocaleString() : "-"}</td>
                <td>{r.status}</td>
                <td>{r.totalHours || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
