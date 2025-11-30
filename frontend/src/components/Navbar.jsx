// src/components/Navbar.jsx
//import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/features/auth/authSlice";
//./redux/slices/features/auth/authSlice
const Navbar = () => {
  const { token, role } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    nav("/");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>AttendanceApp</Link>
      </div>
      <div style={styles.right}>
        {!token && <Link to="/auth/login" style={styles.link}>Login</Link>}
        {!token && <Link to="/auth/register" style={styles.link}>Register</Link>}
        {token && role === "employee" && <Link to="/employee/dashboard" style={styles.link}>Dashboard</Link>}
        {token && role === "manager" && <Link to="/manager/dashboard" style={styles.link}>Manager</Link>}
        {token && <button onClick={handleLogout} style={styles.btn}>Logout</button>}
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: "flex", justifyContent: "space-between", padding: "10px 20px", background: "#222", color: "#fff" },
  left: { display: "flex", alignItems: "center" },
  brand: { color: "#fff", textDecoration: "none", fontWeight: "700", marginRight: 12 },
  right: { display: "flex", gap: 12, alignItems: "center" },
  link: { color: "#fff", textDecoration: "none" },
  btn: { background: "#e74c3c", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 4, cursor: "pointer" }
};

export default Navbar;
