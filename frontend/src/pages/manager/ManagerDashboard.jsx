import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAttendance, fetchTeamSummary } from "../features/attendance/attendanceSlice";
import Navbar from "../components/Navbar";

const ManagerDashboard = () => {
  const dispatch = useDispatch();
  const { records, summary } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(fetchAllAttendance());
    dispatch(fetchTeamSummary());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <h2>Manager Dashboard</h2>
      <h3>Team Summary</h3>
      <pre>{JSON.stringify(summary, null, 2)}</pre>
    </div>
  );
};

export default ManagerDashboard;
