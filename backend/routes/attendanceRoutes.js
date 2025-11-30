const express = require("express");
const router = express.Router();

const { protect, managerOnly } = require("../middleware/authMiddleware");

const {
  markAttendance,
  getAttendance,
  getAllAttendance,
  getEmployeeAttendance,
  getTeamSummary,
  getTodayStatus,
  exportCSV
} = require("../controllers/attendanceController");

// Employee routes
router.post("/mark", protect, markAttendance);
router.get("/records", protect, getAttendance);

// Manager routes
router.get("/all", protect, managerOnly, getAllAttendance);
router.get("/employee/:id", protect, managerOnly, getEmployeeAttendance);
router.get("/summary", protect, managerOnly, getTeamSummary);
router.get("/today-status", protect, managerOnly, getTodayStatus);
router.get("/export", protect, managerOnly, exportCSV);

module.exports = router;
