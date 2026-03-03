const News = require("../models/News");
const fs = require("fs");
const path = require("path");

console.log("🔥 NEW CONTROLLER FILE LOADED");

// ---------- SLUG ----------
const createSlug = async (title) => {
  const baseSlug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  let slug = baseSlug;
  let count = 1;

  while (await News.exists({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
};

// ---------- CREATE ----------
exports.createNews = async (req, res) => {
  try {
    const { title, category, status, content } = req.body;

    const slug = await createSlug(title);
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const news = await News.create({
      title,
      slug,
      category,
      status,
      image,
      content,
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- GET ALL ----------
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- GET BY SLUG ----------
exports.getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug });
    if (!news) return res.status(404).json({ message: "Not found" });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- UPDATE (IMAGE REPLACE) ----------
exports.updateNews = async (req, res) => {
  try {
    console.log("🔥 UPDATE NEWS HIT");
    console.log("🔥 FILE:", req.file);

    const { title, category, status, content } = req.body;

    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    // 🔥 replace image
    if (req.file) {
      if (news.image) {
        const oldImagePath = path.resolve(
          "uploads",
          path.basename(news.image)
        );

        fs.unlink(oldImagePath, () => {});
      }

      news.image = `/uploads/${req.file.filename}`;
    }

    news.title = title;
    news.category = category;
    news.status = status;
    news.content = content;

    await news.save();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- DELETE (IMAGE AUTO DELETE) ----------
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    if (news.image) {
      const imagePath = path.resolve(
        "uploads",
        path.basename(news.image)
      );
      fs.unlink(imagePath, () => {});
    }

    await News.findByIdAndDelete(req.params.id);

    res.json({ message: "News and image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};