const express = require("express");
const cors = require("cors");
const path = require("path");

const newsRoutes = require("./routes/news.routes");
const adminRoutes = require("./routes/admin.routes"); // 👈 ADD THIS

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 serve images
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// 🔥 REGISTER ROUTES
app.use("/api/news", newsRoutes);
app.use("/api/admin", adminRoutes); // 👈 THIS WAS MISSING

app.get("/", (req, res) => {
  res.send("API running...");
});

module.exports = app;
