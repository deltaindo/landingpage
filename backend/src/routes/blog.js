const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { authenticate, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

// Public routes
router.get("/", blogController.getAllBlogs);
router.get("/:slug", blogController.getBlogBySlug);

// Protected routes (admin only)
router.post(
  "/",
  authenticate,
  authorize("admin"),
  upload.single("featuredImage"),
  blogController.createBlog
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  upload.single("featuredImage"),
  blogController.updateBlog
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  blogController.deleteBlog
);

router.patch(
  "/:id/publish",
  authenticate,
  authorize("admin"),
  blogController.publishBlog
);

// Add these routes to existing blog.js

router.post(
  "/bulk/publish",
  authenticate,
  authorize("admin"),
  blogController.bulkPublish
);

router.post(
  "/bulk/delete",
  authenticate,
  authorize("admin"),
  blogController.bulkDelete
);

router.patch(
  "/:id/schedule",
  authenticate,
  authorize("admin"),
  blogController.scheduleBlog
);

router.post(
  "/:id/duplicate",
  authenticate,
  authorize("admin"),
  blogController.duplicateBlog
);

router.get(
  "/stats/overview",
  authenticate,
  authorize("admin"),
  blogController.getBlogStats
);

module.exports = router;
