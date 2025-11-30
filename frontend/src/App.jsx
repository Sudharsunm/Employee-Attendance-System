import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, } from "react-redux";
import React from "react";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EmployeeDashboard from "./pages/employeee/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import AttendanceHistory from "./pages/AttendanceHistory";
import AllEmployeesAttendance from "./pages/AllEmployeesAttendance";
import Reports from "./pages/Reports";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" />;
};

// Redirect user to dashboard based on role
const RoleRedirect = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Navigate to="/login" />;
  return user.role === "manager" ? <Navigate to="/manager-dashboard" /> : <Navigate to="/dashboard" />;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RoleRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Employee Routes */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <EmployeeDashboard />
        </PrivateRoute>
      } />
      <Route path="/attendance-history" element={
        <PrivateRoute>
          <AttendanceHistory />
        </PrivateRoute>
      } />

      {/* Manager Routes */}
      <Route path="/manager-dashboard" element={
        <PrivateRoute>
          <ManagerDashboard />
        </PrivateRoute>
      } />
      <Route path="/all-attendance" element={
        <PrivateRoute>
          <AllEmployeesAttendance />
        </PrivateRoute>
      } />
      <Route path="/reports" element={
        <PrivateRoute>
          <Reports />
        </PrivateRoute>
      } />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);


export default App;
