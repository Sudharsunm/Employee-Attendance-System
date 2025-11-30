// src/pages/auth/Register.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "employee" });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser(form));
    if (res.meta.requestStatus === "fulfilled") {
      alert("Registered! Login now.");
      navigate("/auth/login");
    } else {
      alert(res.payload || "Registration failed");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8, width: 360 }}>
        <h2>Register</h2>
        <input name="name" placeholder="Name" onChange={handle} value={form.name} />
        <input name="email" placeholder="Email" onChange={handle} value={form.email} />
        <input name="password" placeholder="Password" type="password" onChange={handle} value={form.password} />
        <label>
          Role:{" "}
          <select name="role" onChange={handle} value={form.role}>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
