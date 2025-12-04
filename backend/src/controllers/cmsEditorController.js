const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

/**
 * CMS Editor Controller
 * Access to blog-related tables only:
 * 1. blogPosts - Blog content management
 */

// ============================================
// BLOG POSTS MANAGEMENT (Editor Access)
// ============================================

/**
 * Get all blog posts with pagination and search
 * @route GET /api/cms/editor/blogs
 */
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
        certification,
        "createdAt",
        "updatedAt"
      FROM "blogPosts"
      WHERE name ILIKE $1 OR code ILIKE $1
      ORDER BY "createdAt" DESC
      LIMIT $2 OFFSET $3
    `;

    const countQuery = `
      SELECT COUNT(*) FROM "blogPosts"
      WHERE name ILIKE $1 OR code ILIKE $1
    `;

    const searchPattern = `%${search}%`;
    const [dataResult, countResult] = await Promise.all([
      pool.query(query, [searchPattern, limit, offset]),
      pool.query(countQuery, [searchPattern]),
    ]);

    const total = parseInt(countResult.rows[0].count);
    const showing = `${offset + 1} to ${Math.min(
      offset + parseInt(limit),
      total
    )}`;

    res.json({
      success: true,
      data: dataResult.rows,
      pagination: {
        total: total,
        page: parseInt(page),
        limit: parseInt(limit),
        showing: showing,
        totalPages: Math.ceil(total / limit),
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

/**
 * Get single blog post by ID
 * @route GET /api/cms/editor/blogs/:id
 */
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM "blogPosts" WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog post",
      error: error.message,
    });
  }
};

/**
 * Get editor dashboard statistics
 * @route GET /api/cms/editor/stats
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const queries = {
      totalBlogs: 'SELECT COUNT(*) as count FROM "blogPosts"',
      publishedBlogs:
        "SELECT COUNT(*) as count FROM \"blogPosts\" WHERE status = 'published'",
      draftBlogs:
        "SELECT COUNT(*) as count FROM \"blogPosts\" WHERE status = 'draft'",
      recentBlogs:
        'SELECT id, name, status, "createdAt" FROM "blogPosts" ORDER BY "createdAt" DESC LIMIT 5',
    };

    const results = await Promise.all([
      pool.query(queries.totalBlogs),
      pool.query(queries.publishedBlogs),
      pool.query(queries.draftBlogs),
      pool.query(queries.recentBlogs),
    ]);

    res.json({
      success: true,
      data: {
        counts: {
          total: parseInt(results[0].rows[0].count),
          published: parseInt(results[1].rows[0].count),
          draft: parseInt(results[2].rows[0].count),
        },
        recent: results[3].rows,
      },
    });
  } catch (error) {
    console.error("Error fetching editor stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message,
    });
  }
};

module.exports = exports;
