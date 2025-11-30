// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (res.meta.requestStatus === "fulfilled") {
      const role = localStorage.getItem("role");
      navigate(role === "manager" ? "/manager/dashboard" : "/employee/dashboard");
    } else {
      alert(res.payload || "Login failed");
    }
  };

  return (
    <div style={center}>
      <h2>Login</h2>
      <form onSubmit={submit} style={formStyle}>
        <input name="email" value={form.email} onChange={handle} placeholder="Email" />
        <input name="password" value={form.password} type="password" onChange={handle} placeholder="Password" />
        <button type="submit" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

const center = { display: "flex", justifyContent: "center", marginTop: 60 };
const formStyle = { display: "flex", flexDirection: "column", gap: 10, width: 320 };
