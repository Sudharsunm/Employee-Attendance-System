// src/pages/manager/ManagerDashboard.jsx
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAttendance, fetchTeamSummary, fetchPresentToday } from "../../redux/slices/features/attendance/attendanceSlice";
import { Link } from "react-router-dom";

export default function ManagerDashboard() {
  const dispatch = useDispatch();
  const { allRecords, teamSummary, presentToday } = useSelector((s) => s.attendance);

  useEffect(() => {
    dispatch(fetchAllAttendance());
    dispatch(fetchTeamSummary());
    dispatch(fetchPresentToday());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Manager Dashboard</h2>

        <div>
          <h4>Team Summary</h4>
          <pre>{JSON.stringify(teamSummary, null, 2)}</pre>
        </div>

        <div>
          <h4>Present Today</h4>
          <ul>
            {presentToday.map((p) => <li key={p._id || p.user?._id}>{p.user?.name || p.user}</li>)}
          </ul>
        </div>

        <div>
          <h4>All Attendance (latest 20)</h4>
          <div style={{ maxHeight: 300, overflow: "auto" }}>
            {allRecords.slice(0, 50).map((r) => (
              <div key={r._id} style={{ padding: 6, borderBottom: "1px solid #eee" }}>
                <strong>{r.user?.name || r.user}</strong> — {r.date || new Date(r.time).toLocaleString()} — In: {r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString() : "-"}
                {" "}Out: {r.checkOutTime ? new Date(r.checkOutTime).toLocaleTimeString() : "-"}
                <Link to={`/manager/employee/${r.user?._id || r.user}`} style={{ marginLeft: 12 }}>View</Link>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <Link to="/manager/all"><button>View full attendance</button></Link>
        </div>
      </div>
    </div>
  );
}
