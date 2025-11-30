// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import AttendanceHistory from "./pages/employee/AttendanceHistory";

import ManagerDashboard from "./pages/manager/ManagerDashboard";
import AllEmployeesAttendance from "./pages/manager/AllEmployeeAttendance";
import EmployeeDetails from "./pages/manager/EmployeeDetails";
import TeamSummary from "./pages/manager/TeamSummary";

import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const { token } = useSelector((s) => s.auth);
  return token ? children : <Navigate to="/auth/login" />;
}

function RoleRoute({ children, roleRequired }) {
  const { token, role } = useSelector((s) => s.auth);
  if (!token) return <Navigate to="/auth/login" />;
  if (role !== roleRequired) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Employee */}
        <Route path="/employee/dashboard" element={
          <RoleRoute roleRequired="employee"><EmployeeDashboard /></RoleRoute>
        } />
        <Route path="/employee/history" element={
          <RoleRoute roleRequired="employee"><AttendanceHistory /></RoleRoute>
        } />

        {/* Manager */}
        <Route path="/manager/dashboard" element={
          <RoleRoute roleRequired="manager"><ManagerDashboard /></RoleRoute>
        } />
        <Route path="/manager/all" element={
          <RoleRoute roleRequired="manager"><AllEmployeesAttendance /></RoleRoute>
        } />
        <Route path="/manager/employee/:id" element={
          <RoleRoute roleRequired="manager"><EmployeeDetails /></RoleRoute>
        } />
        <Route path="/manager/summary" element={
          <RoleRoute roleRequired="manager"><TeamSummary /></RoleRoute>
        } />

        <Route path="*" element={<div style={{padding:20}}>404 - Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
