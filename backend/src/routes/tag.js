const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");
const { authenticate, authorize } = require("../middleware/auth");

router.get("/", tagController.getAllTags);

router.post("/", authenticate, authorize("admin"), tagController.createTag);

// ADD THIS ROUTE
router.post(
  "/bulk",
  authenticate,
  authorize("admin"),
  tagController.bulkCreateTags
);

module.exports = router;
