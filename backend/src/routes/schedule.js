const express = require("express");
const router = express.Router();

// GET all schedules
router.get("/", (req, res) => {
  res.json({ message: "Get all schedules" });
});

// GET schedule by ID
router.get("/:id", (req, res) => {
  res.json({ message: "Get schedule by ID" });
});

// POST create schedule
router.post("/", (req, res) => {
  res.json({ message: "Create schedule" });
});

// PUT update schedule
router.put("/:id", (req, res) => {
  res.json({ message: "Update schedule" });
});

// DELETE schedule
router.delete("/:id", (req, res) => {
  res.json({ message: "Delete schedule" });
});

module.exports = router;
