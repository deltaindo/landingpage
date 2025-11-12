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

module.exports = router;
