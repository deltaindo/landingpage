const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");
const { authenticate, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/", authenticate, mediaController.getAllMedia);

router.post(
  "/",
  authenticate,
  authorize("admin", "editor"),
  upload.single("file"),
  mediaController.uploadMedia
);

router.put(
  "/:id",
  authenticate,
  authorize("admin", "editor"),
  mediaController.updateMedia
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  mediaController.deleteMedia
);

module.exports = router;
