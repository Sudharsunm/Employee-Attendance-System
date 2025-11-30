import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAttendance } from "../features/attendance/attendanceSlice";
import Navbar from "../components/Navbar";

const AllEmployeesAttendance = () => {
  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.attendance);

  useEffect(() => { dispatch(fetchAllAttendance()); }, [dispatch]);

  return (
    <div>
      <Navbar />
      <h2>All Employees Attendance</h2>
      <table border="1">
        <thead>
          <tr><th>Name</th><th>Date</th><th>Status</th></tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{r.user?.name}</td>
              <td>{r.date}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllEmployeesAttendance;
