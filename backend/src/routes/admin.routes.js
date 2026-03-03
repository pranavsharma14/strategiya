const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const auth = require("../middleware/auth.middleware");
const News = require("../models/News");

// ===================== LOGIN (SUPER ADMIN + ADMIN) =====================
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // 👑 SUPER ADMIN (ENV BASED)
  if (
    username === process.env.SUPER_ADMIN_USERNAME &&
    password === process.env.SUPER_ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { role: "SUPER_ADMIN" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({
      token,
      role: "SUPER_ADMIN",
    });
  }

  // 👤 NORMAL ADMIN (DB BASED)
  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id, role: "ADMIN" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({
    token,
    role: "ADMIN",
  });
});

// ===================== CREATE ADMIN (SUPER_ADMIN ONLY) =====================
router.post("/users", auth, async (req, res) => {
  if (req.user.role !== "SUPER_ADMIN") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { username, password } = req.body;

  const exists = await Admin.findOne({ username });
  if (exists) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  await Admin.create({ username, password: hashed });

  res.json({ message: "Admin created successfully" });
});

// ===================== GET ADMINS =====================
router.get("/users", auth, async (req, res) => {
  if (req.user.role !== "SUPER_ADMIN") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const admins = await Admin.find().select("-password");
  res.json(admins);
});

// ===================== DELETE ADMIN =====================
router.delete("/users/:id", auth, async (req, res) => {
  if (req.user.role !== "SUPER_ADMIN") {
    return res.status(403).json({ message: "Forbidden" });
  }

  // ❌ prevent deleting yourself (if later you store id for super admin)
  if (req.user.id && req.user.id === req.params.id) {
    return res
      .status(400)
      .json({ message: "You cannot delete yourself" });
  }

  await Admin.findByIdAndDelete(req.params.id);
  res.json({ message: "Admin deleted successfully" });
});


module.exports = router;

router.get("/dashboard/stats", auth, async (req, res) => {
  try {
    const total = await News.countDocuments();
    const published = await News.countDocuments({ status: "Published" });
    const drafts = await News.countDocuments({ status: "Draft" });

    res.json({
      total,
      published,
      drafts,
      role: req.user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load stats" });
  }
});

// 🔐 CHANGE OWN PASSWORD (ADMIN / SUPER_ADMIN)
router.put("/change-password", auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // SUPER ADMIN (ENV BASED)
  if (req.user.role === "SUPER_ADMIN") {
    return res.status(400).json({
      message:
        "Super admin password is fixed via environment variables",
    });
  }

  const admin = await Admin.findById(req.user.id);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  const isMatch = await bcrypt.compare(
    oldPassword,
    admin.password
  );
  if (!isMatch) {
    return res.status(401).json({ message: "Old password incorrect" });
  }

  admin.password = await bcrypt.hash(newPassword, 10);
  await admin.save();

  res.json({ message: "Password updated successfully" });
});

// 👑 RESET ADMIN PASSWORD (SUPER_ADMIN ONLY)
router.put("/users/:id/reset-password", auth, async (req, res) => {
  if (req.user.role !== "SUPER_ADMIN") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { newPassword } = req.body;
  if (!newPassword) {
    return res.status(400).json({ message: "New password required" });
  }

  const admin = await Admin.findById(req.params.id);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  admin.password = await bcrypt.hash(newPassword, 10);
  await admin.save();

  res.json({ message: "Admin password reset successfully" });
});
