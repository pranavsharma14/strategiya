const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload.middleware");
const auth = require("../middleware/auth.middleware");

const {
  createNews,
  getAllNews,
  getNewsBySlug,
  updateNews,
  deleteNews,
} = require("../controllers/news.controller");

router.post("/", auth, upload.single("image"), createNews);
router.get("/", getAllNews);
router.get("/:slug", getNewsBySlug);

// 🔥 IMPORTANT: multer must be here
router.put("/:id", auth, upload.single("image"), updateNews);

router.delete("/:id", auth, deleteNews);

module.exports = router;
