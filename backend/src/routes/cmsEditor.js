const express = require("express");
const router = express.Router();
const cmsEditorController = require("../controllers/cmsEditorController");
const { authenticate, authorize } = require("../middleware/auth");

/**
 * CMS Editor Routes
 * Editor role has access to blog-related tables only
 */

router.use(authenticate);
router.use(authorize("editor", "admin", "superadmin"));

// Dashboard
router.get("/stats", cmsEditorController.getDashboardStats);

// Blog Posts
router.get("/blogs", cmsEditorController.getAllBlogs);
router.get("/blogs/:id", cmsEditorController.getBlogById);

module.exports = router;
