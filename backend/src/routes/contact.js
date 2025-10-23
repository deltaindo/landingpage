const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validator");
const {
  sendContactMessage,
  getAllContacts,
  updateContactStatus,
} = require("../controllers/contactController");

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").trim().notEmpty().withMessage("Phone number is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
  ],
  validate,
  sendContactMessage
);

router.get("/", getAllContacts);
router.put("/:id", updateContactStatus);

module.exports = router;
