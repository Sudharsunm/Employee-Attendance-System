const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ msg: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ msg: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token failed" });
  }
};

const managerOnly = (req, res, next) => {
  if (req.user.role !== "manager") {
    return res.status(403).json({ msg: "Access denied. Manager only" });
  }
  next();
};

module.exports = { protect, managerOnly };
