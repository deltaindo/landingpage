const express = require("express");
const router = express.Router();
const cmsPICController = require("../controllers/cmsPICController");
const { authenticate, authorize } = require("../middleware/auth");

/**
 * CMS PIC Routes
 * PIC role has access to courses and documents-related tables
 */

router.use(authenticate);
router.use(authorize("pic", "admin", "superadmin"));

// Dashboard
router.get("/stats", cmsPICController.getDashboardStats);

// Courses
router.get("/courses", cmsPICController.getAllCourses);
router.get("/courses/:id", cmsPICController.getCourseById);

// Schedules
router.get("/schedules", cmsPICController.getAllSchedules);
router.get("/schedules/:id", cmsPICController.getScheduleById);

// Registrations
router.get("/registrations", cmsPICController.getAllRegistrations);
router.get("/registrations/:id", cmsPICController.getRegistrationById);

// Registration Documents
router.get(
  "/registration-documents",
  cmsPICController.getAllRegistrationDocuments
);
router.get(
  "/registration-documents/:id",
  cmsPICController.getRegistrationDocumentById
);

// Form Templates
router.get("/form-templates", cmsPICController.getAllFormTemplates);
router.get("/form-templates/:id", cmsPICController.getFormTemplateById);

module.exports = router;
