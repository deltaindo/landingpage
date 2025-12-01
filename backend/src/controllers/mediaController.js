const Media = require("../models/Media");
const { uploadToStorage, deleteFromStorage } = require("../utils/storage");

exports.getAllMedia = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, fileType } = req.query;
    const query = fileType ? { fileType } : {};

    const media = await Media.find(query)
      .populate("uploadedBy", "name email")
      .sort("-createdAt")
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Media.countDocuments(query);

    res.json({
      success: true,
      data: media,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

exports.uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    const fileUrl = await uploadToStorage(req.file);

    const media = await Media.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      fileUrl,
      fileType: req.file.mimetype.split("/")[0], // image, video, etc
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      alt: req.body.alt || req.file.originalname,
      caption: req.body.caption,
      uploadedBy: req.user.id,
    });

    res.status(201).json({ success: true, data: media });
  } catch (error) {
    next(error);
  }
};

exports.updateMedia = async (req, res, next) => {
  try {
    const { alt, caption } = req.body;
    const media = await Media.findByIdAndUpdate(
      req.params.id,
      { alt, caption },
      { new: true }
    );

    if (!media) {
      return res.status(404).json({
        success: false,
        error: "Media not found",
      });
    }

    res.json({ success: true, data: media });
  } catch (error) {
    next(error);
  }
};

exports.deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);

    if (!media) {
      return res.status(404).json({
        success: false,
        error: "Media not found",
      });
    }

    // Delete physical file
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(__dirname, "../../uploads", media.fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({
      success: true,
      message: "Media deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
