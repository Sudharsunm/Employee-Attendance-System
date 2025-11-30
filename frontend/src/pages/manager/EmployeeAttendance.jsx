import React, { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const Reports = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleExport = async () => {
    const res = await API.get(`/attendance/export?start=${start}&end=${end}`, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <Navbar />
      <h2>Export Attendance CSV</h2>
      <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
      <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
      <button onClick={handleExport}>Export CSV</button>
    </div>
  );
};

export default Reports;
