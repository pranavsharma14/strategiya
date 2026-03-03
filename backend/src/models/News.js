const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["National", "Local", "Sports", "Entertainment"],
    },
    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Draft",
    },
    image: {
      type: String, // image URL / base64 (for now)
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
