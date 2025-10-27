const express = require("express");
const router = express.Router();
const formTemplateController = require("../controllers/formTemplateController");
const { authenticate, authorize } = require("../middleware/auth");

// Public routes
router.get("/", formTemplateController.getAllFormTemplates);
router.get("/default", formTemplateController.getDefaultFormTemplate);
router.get("/:id", formTemplateController.getFormTemplateById);

// Protected routes (admin only)
router.post(
  "/",
  authenticate,
  authorize("admin"),
  formTemplateController.createFormTemplate
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  formTemplateController.updateFormTemplate
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  formTemplateController.deleteFormTemplate
);

module.exports = router;
