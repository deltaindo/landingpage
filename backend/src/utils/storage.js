const fs = require("fs").promises;
const path = require("path");

exports.uploadToStorage = async (file) => {
  // For now, return local file path
  // In production, upload to cloud storage (AWS S3, Google Cloud Storage, etc.)
  return `/uploads/${file.filename}`;
};

exports.deleteFromStorage = async (filePath) => {
  try {
    await fs.unlink(path.join(__dirname, "../..", filePath));
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};
