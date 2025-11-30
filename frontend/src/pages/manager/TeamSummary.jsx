// src/pages/manager/TeamSummary.jsx
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamSummary } from "../../redux/slices/features/attendance/attendanceSlice";

export default function TeamSummary() {
  const dispatch = useDispatch();
  const { teamSummary } = useSelector((s) => s.attendance);

  useEffect(() => {
    dispatch(fetchTeamSummary());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Team Summary</h2>
        <pre>{JSON.stringify(teamSummary, null, 2)}</pre>
      </div>
    </div>
  );
}
