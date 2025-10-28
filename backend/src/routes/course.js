const express = require("express");
const router = express.Router();
const { Course, CourseSchedule } = require("../models");
const { Op } = require("sequelize");

// GET all courses
router.get("/", async (req, res, next) => {
  try {
    const {
      category,
      status,
      featured,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const where = {};

    if (category && category !== "all") {
      where.category = category;
    }

    if (status) {
      where.status = status;
    } else {
      where.status = "active";
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { code: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Course.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [
        ["featured", "DESC"],
        ["createdAt", "DESC"],
      ],
      include: [
        {
          model: CourseSchedule,
          as: "courseSchedules", // ✅ Match the alias from models/index.js
          where: { status: "open" },
          required: false,
        },
      ],
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET single course by ID
router.get("/:id", async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: CourseSchedule,
          as: "courseSchedules", // ✅ Match alias
          where: { status: "open" },
          required: false,
        },
      ],
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
    });
  } catch (error) {
    next(error);
  }
});

// GET featured courses
router.get("/featured/list", async (req, res, next) => {
  try {
    const courses = await Course.findAll({
      where: {
        featured: true,
        status: "active",
      },
      limit: 6,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
