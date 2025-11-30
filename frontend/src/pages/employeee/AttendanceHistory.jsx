import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAttendance } from "../features/attendance/attendanceSlice";
import Navbar from "../components/Navbar";

const AttendanceHistory = () => {
  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.attendance);

  useEffect(() => { dispatch(fetchMyAttendance()); }, [dispatch]);

  return (
    <div>
      <Navbar />
      <h2>My Attendance History</h2>
      <table border="1">
        <thead>
          <tr><th>Date</th><th>Status</th></tr>
        </thead>
        <tbody>
          {records.map((r) => <tr key={r._id}><td>{r.date}</td><td>{r.status}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceHistory;
