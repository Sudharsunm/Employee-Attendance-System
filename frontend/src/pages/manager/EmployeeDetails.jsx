// src/pages/manager/EmployeeDetails.jsx
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeAttendance } from "../../redux/slices/features/attendance/attendanceSlice"
//"../../redux/silce/features/attendance/attendanceSlice";
import { useParams } from "react-router-dom";

export default function EmployeeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { employeeRecords } = useSelector((s) => s.attendance);

  useEffect(() => {
    if (id) dispatch(fetchEmployeeAttendance(id));
  }, [dispatch, id]);

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Employee Attendance</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr><th>Date</th><th>Check In</th><th>Check Out</th><th>Hours</th></tr>
          </thead>
          <tbody>
            {employeeRecords.map((r) => (
              <tr key={r._id}>
                <td>{r.date || new Date(r.time).toLocaleDateString()}</td>
                <td>{r.checkInTime ? new Date(r.checkInTime).toLocaleString() : "-"}</td>
                <td>{r.checkOutTime ? new Date(r.checkOutTime).toLocaleDateString() : "-"}</td>
                <td>{r.totalHours || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
