const Attendance = require("../models/Attendance");
const User = require("../models/User");
const { Parser } = require("json2csv");

// -------------------- EMPLOYEE: MARK ATTENDANCE --------------------
exports.markAttendance = async (req, res) => {
  try {
    const record = await Attendance.create({
      user: req.user.id,
      time: new Date(),
      type: "checkin",
    });

    res.json({ msg: "Check-in recorded", record });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// -------------------- EMPLOYEE: GET MY HISTORY --------------------
exports.getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ user: req.user.id });
    res.json(records);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// -------------------- MANAGER: GET ALL EMPLOYEES ATTENDANCE --------------------
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate("user", "name email role");
    res.json(records);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// -------------------- MANAGER: GET SPECIFIC EMPLOYEE ATTENDANCE --------------------
exports.getEmployeeAttendance = async (req, res) => {
  try {
    const id = req.params.id;
    const records = await Attendance.find({ user: id }).populate(
      "user",
      "name email"
    );

    res.json(records);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// -------------------- MANAGER: TEAM SUMMARY --------------------
exports.getTeamSummary = async (req, res) => {
  try {
    const summary = await Attendance.aggregate([
      {
        $group: {
          _id: "$user",
          totalDays: { $sum: 1 }
        }
      }
    ]);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// -------------------- MANAGER: WHO IS PRESENT TODAY --------------------
exports.getTodayStatus = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const records = await Attendance.find({
      time: { $gte: start, $lte: end }
    }).populate("user", "name email");

    res.json(records);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// -------------------- MANAGER: EXPORT CSV --------------------
exports.exportCSV = async (req, res) => {
  try {
    const records = await Attendance.find().populate("user", "name email");

    const data = records.map((r) => ({
      name: r.user.name,
      email: r.user.email,
      type: r.type,
      time: r.time,
    }));

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("attendance.csv");
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
