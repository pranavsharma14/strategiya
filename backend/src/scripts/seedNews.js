const mongoose = require("mongoose");
require("dotenv").config();

const News = require("../models/News");

const categories = ["National", "Local", "Sports", "Entertainment"];

const seedNews = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const dummyNews = Array.from({ length: 20 }).map((_, i) => ({
      title: `Demo News Title ${i + 1}`,
      slug: `demo-news-${i + 1}`,
      category: categories[i % categories.length],
      status: "Published",
      image: `https://picsum.photos/800/500?random=${i + 1}`,
      content: "यह एक डेमो न्यूज़ कंटेंट है।",
    }));

    await News.insertMany(dummyNews);

    console.log("✅ Dummy news inserted");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedNews();
