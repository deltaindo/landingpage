const FormTemplate = require("../models/FormTemplate");

// Get all form templates
exports.getAllFormTemplates = async (req, res, next) => {
  try {
    const templates = await FormTemplate.find({ status: "active" });

    res.json({
      success: true,
      data: templates,
    });
  } catch (error) {
    next(error);
  }
};

// Get single form template
exports.getFormTemplateById = async (req, res, next) => {
  try {
    const template = await FormTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        error: "Form template not found",
      });
    }

    res.json({
      success: true,
      data: template,
    });
  } catch (error) {
    next(error);
  }
};

// Create new form template
exports.createFormTemplate = async (req, res, next) => {
  try {
    const template = await FormTemplate.create(req.body);

    res.status(201).json({
      success: true,
      data: template,
      message: "Form template created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Update form template
exports.updateFormTemplate = async (req, res, next) => {
  try {
    const template = await FormTemplate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!template) {
      return res.status(404).json({
        success: false,
        error: "Form template not found",
      });
    }

    res.json({
      success: true,
      data: template,
      message: "Form template updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete form template
exports.deleteFormTemplate = async (req, res, next) => {
  try {
    const template = await FormTemplate.findByIdAndDelete(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        error: "Form template not found",
      });
    }

    res.json({
      success: true,
      message: "Form template deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get default form template
exports.getDefaultFormTemplate = async (req, res, next) => {
  try {
    const template = await FormTemplate.findOne({
      isDefault: true,
      status: "active",
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        error: "Default form template not found",
      });
    }

    res.json({
      success: true,
      data: template,
    });
  } catch (error) {
    next(error);
  }
};
