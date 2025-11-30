import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAttendance } from "../features/attendance/attendanceSlice";
import Navbar from "../../components/Navbar";

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(fetchMyAttendance());
  }, [dispatch]);

  // Get today's date string
  const today = new Date().toISOString().split("T")[0];
  const todayRecord = records.find(r => r.date === today);

  return (
    <div>
      <Navbar />
      <h2>Employee Dashboard</h2>

      <h3>Today's Status: 
        {todayRecord 
          ? <span className={todayRecord.status === "Present" ? "status-present" : "status-absent"}>
              {todayRecord.status}
            </span> 
          : <span className="status-absent">Not Marked</span>}
      </h3>

      <h3>Recent Attendance (Last 7 days):</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.slice(-7).map((r) => (
            <tr key={r._id}>
              <td>{r.date}</td>
              <td className={
                r.status === "Present" ? "status-present" :
                r.status === "Absent" ? "status-absent" : "status-late"
              }>
                {r.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDashboard;
