const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController");
const { authenticate, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

// Public route
router.post(
  "/",
  upload.array("documents", 5),
  registrationController.createRegistration
);

// Protected routes (admin only)
router.get(
  "/",
  authenticate,
  authorize("admin"),
  registrationController.getAllRegistrations
);

router.get(
  "/stats",
  authenticate,
  authorize("admin"),
  registrationController.getRegistrationStats
);

router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  registrationController.getRegistrationById
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("admin"),
  registrationController.updateRegistrationStatus
);

module.exports = router;
