const Training = require("../models/Training");

exports.getAllTrainings = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category, isActive: true } : { isActive: true };

    const trainings = await Training.find(filter).sort({ name: 1 });

    res.json({
      success: true,
      count: trainings.length,
      data: trainings,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTrainingById = async (req, res, next) => {
  try {
    const training = await Training.findById(req.params.id);

    if (!training) {
      return res.status(404).json({
        success: false,
        error: "Training not found",
      });
    }

    res.json({
      success: true,
      data: training,
    });
  } catch (error) {
    next(error);
  }
};

exports.createTraining = async (req, res, next) => {
  try {
    const training = await Training.create(req.body);

    res.status(201).json({
      success: true,
      data: training,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTraining = async (req, res, next) => {
  try {
    const training = await Training.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!training) {
      return res.status(404).json({
        success: false,
        error: "Training not found",
      });
    }

    res.json({
      success: true,
      data: training,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTraining = async (req, res, next) => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id);

    if (!training) {
      return res.status(404).json({
        success: false,
        error: "Training not found",
      });
    }

    res.json({
      success: true,
      message: "Training deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
