import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout());

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/attendance-history">My Attendance</Link> |{" "}
      <Link to="/all-attendance">All Employees</Link> |{" "}
      <Link to="/reports">Reports</Link> |{" "}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
