const cron = require("node-cron");
const Blog = require("../models/Blog");

// Run every hour to check for scheduled posts
const publishScheduledBlogs = cron.schedule("0 * * * *", async () => {
  try {
    const now = new Date();
    const scheduledBlogs = await Blog.find({
      status: "draft",
      scheduledAt: { $lte: now },
    });

    for (const blog of scheduledBlogs) {
      blog.status = "published";
      blog.publishedAt = new Date();
      blog.scheduledAt = null;
      await blog.save();
      console.log(`Published scheduled blog: ${blog.title}`);
    }
  } catch (error) {
    console.error("Error publishing scheduled blogs:", error);
  }
});

module.exports = publishScheduledBlogs;
