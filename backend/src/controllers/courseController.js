const Course = require("../models/Course");
const Registration = require("../models/Registration");

// Get all courses
exports.getAllCourses = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      status,
      featured,
      search,
      sort = "-createdAt",
    } = req.query;

    const query = { status: status || "active" };

    if (category) query.category = category;
    if (featured !== undefined) query.featured = featured === "true";
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
      ];
    }

    const courses = await Course.find(query)
      .populate("registrationForm")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Course.countDocuments(query);

    res.json({
      success: true,
      data: courses,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

// Get single course
exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "registrationForm"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Course not found",
      });
    }

    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

// Create new course
exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      data: course,
      message: "Course created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Update course
exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Course not found",
      });
    }

    res.json({
      success: true,
      data: course,
      message: "Course updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete course
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Course not found",
      });
    }

    res.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Add schedule to course
exports.addSchedule = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Course not found",
      });
    }

    course.schedule.push(req.body);
    await course.save();

    res.json({
      success: true,
      data: course,
      message: "Schedule added successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get course statistics
exports.getCourseStats = async (req, res, next) => {
  try {
    const stats = await Course.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          totalEnrollments: { $sum: "$totalEnrollments" },
          avgRating: { $avg: "$rating.average" },
        },
      },
    ]);

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
