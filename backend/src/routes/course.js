const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { authenticate, authorize } = require("../middleware/auth");

// Public routes
router.get("/", courseController.getAllCourses);
router.get("/stats", courseController.getCourseStats);
router.get("/:id", courseController.getCourseById);

// Protected routes (admin only)
router.post(
  "/",
  authenticate,
  authorize("admin"),
  courseController.createCourse
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  courseController.updateCourse
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  courseController.deleteCourse
);

router.post(
  "/:id/schedule",
  authenticate,
  authorize("admin"),
  courseController.addSchedule
);

module.exports = router;
