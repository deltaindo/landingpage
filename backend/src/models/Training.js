const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  certification: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["kemnaker", "bnsp", "migas"],
    required: true,
  },
  description: String,
  price: Number,
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Training", trainingSchema);
