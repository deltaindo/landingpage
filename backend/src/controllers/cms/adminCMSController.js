// backend/src/controllers/cms/adminCMSController.js
const pool = require("../../config/database");

/**
 * Admin CMS Controller
 * Provides full access to all 7 tables for superadmin role
 */

// ============================================
// 1. BLOG POSTS QUERIES
// ============================================

exports.getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 230, search = "" } = req.query;
    const offset = (page - 1) * limit;

    const query = `
      SELECT 
        id,
        "[PK] uuid" as uuid,
        code,
        name,
        category,
        certification
      FROM "blogPosts"
      WHERE name ILIKE $1 OR code ILIKE $1
      ORDER BY "createdAt" DESC
      LIMIT $2 OFFSET $3
    `;

    const countQuery = `SELECT COUNT(*) FROM "blogPosts" WHERE name ILIKE $1 OR code ILIKE $1`;

    const searchPattern = `%${search}%`;
    const [dataResult, countResult] = await Promise.all([
      pool.query(query, [searchPattern, limit, offset]),
      pool.query(countQuery, [searchPattern]),
    ]);

    res.json({
      success: true,
      data: dataResult.rows,
      pagination: {
        total: parseInt(countResult.rows[0].count),
        page: parseInt(page),
        limit: parseInt(limit),
        showing: `${offset + 1} to ${Math.min(
          offset + limit,
          countResult.rows[0].count
        )}`,
        totalPages: Math.ceil(countResult.rows[0].count / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog posts",
      error: error.message,
    });
  }
};

// ============================================
// 2. COURSE SCHEDULES QUERIES
// ============================================

exports.getAllCourseSchedules = async (req, res) => {
  try {
    const { page = 1, limit = 230 } = req.query;
    const offset = (page - 1) * limit;

    const query = `
      SELECT 
        cs.id,
        cs."[PK] uuid" as uuid,
        cs.code,
        cs.name,
        cs.category,
        cs.certification,
        c.name as course_name
      FROM "courseSchedules" cs
      LEFT JOIN courses c ON cs."courseId" = c.id
      ORDER BY cs."startDate" DESC
      LIMIT $1 OFFSET $2
    `;

    const countQuery = `SELECT COUNT(*) FROM "courseSchedules"`;

    const [dataResult, countResult] = await Promise.all([
      pool.query(query, [limit, offset]),
      pool.query(countQuery),
    ]);

    res.json({
      success: true,
      data: dataResult.rows,
      pagination: {
        total: parseInt(countResult.rows[0].count),
        page: parseInt(page),
        limit: parseInt(limit),
        showing: `${offset + 1} to ${Math.min(
          offset + limit,
          countResult.rows[0].count
        )}`,
        totalPages: Math.ceil(countResult.rows[0].count / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching course schedules:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch course schedules",
      error: error.message,
    });
  }
};

// ============================================
// 3. COURSES QUERIES
// ============================================

exports.getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 230, category = "" } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = "";
    const params = [limit, offset];

    if (category) {
      whereClause = "WHERE category = $3";
      params.push(category);
    }

    const query = `
      SELECT 
        id,
        "[PK] uuid" as uuid,
        code,
        name,
        category,
        certification
      FROM courses
      ${whereClause}
      ORDER BY "createdAt" DESC
      LIMIT $1 OFFSET $2
    `;

    const countQuery = `SELECT COUNT(*) FROM courses ${whereClause}`;

    const [dataResult, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, category ? [category] : []),
    ]);

    res.json({
      success: true,
      data: dataResult.rows,
      pagination: {
        total: parseInt(countResult.rows[0].count),
        page: parseInt(page),
        limit: parseInt(limit),
        showing: `${offset + 1} to ${Math.min(
          offset + limit,
          countResult.rows[0].count
        )}`,
        totalPages: Math.ceil(countResult.rows[0].count / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

// Continue with remaining tables...
