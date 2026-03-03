const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  console.log("🧪 LOGIN PAYLOAD:", username, password);
  console.log(
    "🧪 ENV:",
    process.env.SUPER_ADMIN_USERNAME,
    process.env.SUPER_ADMIN_PASSWORD
  );
  
  // 👑 SUPER ADMIN CHECK
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

  // 👤 NORMAL ADMIN CHECK (DB)
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
};
