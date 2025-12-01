const express = require("express");
const router = express.Router();
const cmsAdminController = require("../controllers/cmsAdminController");
const { authenticate, authorize } = require("../middleware/auth");

/**
 * CMS Admin Routes
 * All routes protected with authentication and admin role authorization
 * Admin has access to all 7 tables:
 * 1. blogPosts
 * 2. courses
 * 3. courseSchedules
 * 4. registrations
 * 5. registrationDocuments
 * 6. formTemplates
 * 7. users
 */

// Apply authentication and authorization middleware to all routes
router.use(authenticate);
router.use(authorize("admin", "superadmin"));

// ============================================
// DASHBOARD STATISTICS
// ============================================
router.get("/stats", cmsAdminController.getDashboardStats);

// ============================================
// BLOG POSTS ROUTES
// ============================================
router.get("/blogs", cmsAdminController.getAllBlogs);
router.get("/blogs/:id", cmsAdminController.getBlogById);

// ============================================
// COURSES ROUTES
// ============================================
router.get("/courses", cmsAdminController.getAllCourses);
router.get("/courses/:id", cmsAdminController.getCourseById);

// ============================================
// COURSE SCHEDULES ROUTES
// ============================================
router.get("/schedules", cmsAdminController.getAllSchedules);
router.get("/schedules/:id", cmsAdminController.getScheduleById);

// ============================================
// REGISTRATIONS ROUTES
// ============================================
router.get("/registrations", cmsAdminController.getAllRegistrations);
router.get("/registrations/:id", cmsAdminController.getRegistrationById);

// ============================================
// REGISTRATION DOCUMENTS ROUTES
// ============================================
router.get(
  "/registration-documents",
  cmsAdminController.getAllRegistrationDocuments
);
router.get(
  "/registration-documents/:id",
  cmsAdminController.getRegistrationDocumentById
);

// ============================================
// FORM TEMPLATES ROUTES
// ============================================
router.get("/form-templates", cmsAdminController.getAllFormTemplates);
router.get("/form-templates/:id", cmsAdminController.getFormTemplateById);

// ============================================
// USERS ROUTES
// ============================================
router.get("/users", cmsAdminController.getAllUsers);
router.get("/users/:id", cmsAdminController.getUserById);

module.exports = router;
