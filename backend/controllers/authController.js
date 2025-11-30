const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// --------------------------------------
// AUTO GENERATE EMPLOYEE ID (EMP001...)
// --------------------------------------
const generateEmployeeId = async () => {
  const count = await User.countDocuments();
  return "EMP" + String(count + 1).padStart(3, "0");
};

// --------------------------------------
// REGISTER
// --------------------------------------
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique employeeId
    const employeeId = await generateEmployeeId();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "employee",
      employeeId,
      department: department || "General",
    });

    res.json({
      msg: "User registered",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        employeeId: user.employeeId,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// --------------------------------------
// LOGIN
// --------------------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login success",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        employeeId: user.employeeId,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// --------------------------------------
// GET ME
// --------------------------------------
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
