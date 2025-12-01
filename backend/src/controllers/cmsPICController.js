const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

/**
 * CMS PIC Controller
 * Access to course and document-related tables:
 * 1. courses - Course listings
 * 2. courseSchedules - Training schedules
 * 3. registrations - User registrations
 * 4. registrationDocuments - Registration documents
 * 5. formTemplates - Form templates
 */

// ============================================
// COURSES MANAGEMENT
// ============================================

exports.getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 230, search = "", category = "" } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = "WHERE 1=1";
    const params = [];
    let paramCount = 1;

    if (search) {
      params.push(`%${search}%`);
      whereClause += ` AND (name ILIKE $${paramCount} OR code ILIKE $${paramCount})`;
      paramCount++;
    }

    if (category) {
      params.push(category);
      whereClause += ` AND category = $${paramCount}`;
      paramCount++;
    }

    params.push(limit, offset);

    const query = `
      SELECT 
        id, "[PK] uuid" as uuid, code, name, category, certification,
        "createdAt", "updatedAt"
      FROM courses
      ${whereClause}
      ORDER BY "createdAt" DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    const countQuery = `SELECT COUNT(*) FROM courses ${whereClause}`;

    const [dataResult, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, params.slice(0, -2)),
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
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        showing,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch courses",
        error: error.message,
      });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM courses WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch course",
        error: error.message,
      });
  }
};

// ============================================
// COURSE SCHEDULES MANAGEMENT
// ============================================

exports.getAllSchedules = async (req, res) => {
  try {
    const { page = 1, limit = 230, courseId = "", status = "" } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = "WHERE 1=1";
    const params = [];
    let paramCount = 1;

    if (courseId) {
      params.push(courseId);
      whereClause += ` AND cs."courseId" = $${paramCount}`;
      paramCount++;
    }

    if (status) {
      params.push(status);
      whereClause += ` AND cs.status = $${paramCount}`;
      paramCount++;
    }

    params.push(limit, offset);

    const query = `
      SELECT 
        cs.id, cs."[PK] uuid" as uuid, cs."startDate", cs."endDate",
        cs.location, cs.type, cs."maxParticipants", cs.status, cs."createdAt",
        json_build_object(
          'id', c.id, 'name', c.name, 'code', c.code,
          'category', c.category, 'certification', c.certification
        ) as course
      FROM "courseSchedules" cs
      LEFT JOIN courses c ON cs."courseId" = c.id
      ${whereClause}
      ORDER BY cs."startDate" DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    const countQuery = `SELECT COUNT(*) FROM "courseSchedules" cs ${whereClause}`;

    const [dataResult, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, params.slice(0, -2)),
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
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        showing,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch schedules",
        error: error.message,
      });
  }
};

exports.getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT cs.*, json_build_object(
        'id', c.id, 'name', c.name, 'code', c.code,
        'category', c.category, 'certification', c.certification
      ) as course
      FROM "courseSchedules" cs
      LEFT JOIN courses c ON cs."courseId" = c.id
      WHERE cs.id = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Schedule not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch schedule",
        error: error.message,
      });
  }
};

// ============================================
// REGISTRATIONS MANAGEMENT
// ============================================

exports.getAllRegistrations = async (req, res) => {
  try {
    const { page = 1, limit = 230, status = "", search = "" } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = "WHERE 1=1";
    const params = [];
    let paramCount = 1;

    if (status) {
      params.push(status);
      whereClause += ` AND r.status = $${paramCount}`;
      paramCount++;
    }

    if (search) {
      params.push(`%${search}%`);
      whereClause += ` AND (r."fullName" ILIKE $${paramCount} OR r.email ILIKE $${paramCount})`;
      paramCount++;
    }

    params.push(limit, offset);

    const query = `
      SELECT 
        r.id, r."[PK] uuid" as uuid, r."fullName", r.email,
        r.phone, r.company, r.status, r."createdAt",
        json_build_object('id', cs.id, 'startDate', cs."startDate", 'endDate', cs."endDate", 'location', cs.location) as schedule,
        json_build_object('id', c.id, 'name', c.name, 'code', c.code) as course
      FROM registrations r
      LEFT JOIN "courseSchedules" cs ON r."scheduleId" = cs.id
      LEFT JOIN courses c ON cs."courseId" = c.id
      ${whereClause}
      ORDER BY r."createdAt" DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    const countQuery = `SELECT COUNT(*) FROM registrations r ${whereClause}`;

    const [dataResult, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, params.slice(0, -2)),
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
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        showing,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch registrations",
        error: error.message,
      });
  }
};

exports.getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT r.*,
        json_build_object('id', cs.id, 'startDate', cs."startDate", 'endDate', cs."endDate", 'location', cs.location) as schedule,
        json_build_object('id', c.id, 'name', c.name, 'code', c.code) as course
      FROM registrations r
      LEFT JOIN "courseSchedules" cs ON r."scheduleId" = cs.id
      LEFT JOIN courses c ON cs."courseId" = c.id
      WHERE r.id = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Registration not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch registration",
        error: error.message,
      });
  }
};

// ============================================
// REGISTRATION DOCUMENTS MANAGEMENT
// ============================================

exports.getAllRegistrationDocuments = async (req, res) => {
  try {
    const { page = 1, limit = 230, registrationId = "" } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = "WHERE 1=1";
    const params = [];
    let paramCount = 1;

    if (registrationId) {
      params.push(registrationId);
      whereClause += ` AND rd."registrationId" = $${paramCount}`;
      paramCount++;
    }

    params.push(limit, offset);

    const query = `
      SELECT 
        rd.id, rd."[PK] uuid" as uuid, rd."documentType",
        rd."fileName", rd."fileUrl", rd."uploadedAt",
        json_build_object('id', r.id, 'fullName', r."fullName", 'email', r.email) as registration
      FROM "registrationDocuments" rd
      LEFT JOIN registrations r ON rd."registrationId" = r.id
      ${whereClause}
      ORDER BY rd."uploadedAt" DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    const countQuery = `SELECT COUNT(*) FROM "registrationDocuments" rd ${whereClause}`;

    const [dataResult, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, params.slice(0, -2)),
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
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        showing,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch documents",
        error: error.message,
      });
  }
};

exports.getRegistrationDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT rd.*,
        json_build_object('id', r.id, 'fullName', r."fullName", 'email', r.email) as registration
      FROM "registrationDocuments" rd
      LEFT JOIN registrations r ON rd."registrationId" = r.id
      WHERE rd.id = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch document",
        error: error.message,
      });
  }
};

// ============================================
// FORM TEMPLATES MANAGEMENT
// ============================================

exports.getAllFormTemplates = async (req, res) => {
  try {
    const { page = 1, limit = 230, search = "" } = req.query;
    const offset = (page - 1) * limit;

    const query = `
      SELECT 
        id, "[PK] uuid" as uuid, name, description, fields,
        "createdAt", "updatedAt"
      FROM "formTemplates"
      WHERE name ILIKE $1 OR description ILIKE $1
      ORDER BY "createdAt" DESC
      LIMIT $2 OFFSET $3
    `;

    const countQuery = `SELECT COUNT(*) FROM "formTemplates" WHERE name ILIKE $1 OR description ILIKE $1`;

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
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        showing,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch form templates",
        error: error.message,
      });
  }
};

exports.getFormTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM "formTemplates" WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Form template not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch form template",
        error: error.message,
      });
  }
};

// ============================================
// DASHBOARD STATISTICS
// ============================================

exports.getDashboardStats = async (req, res) => {
  try {
    const queries = {
      courses: "SELECT COUNT(*) as count FROM courses",
      schedules: 'SELECT COUNT(*) as count FROM "courseSchedules"',
      registrations: "SELECT COUNT(*) as count FROM registrations",
      documents: 'SELECT COUNT(*) as count FROM "registrationDocuments"',
      formTemplates: 'SELECT COUNT(*) as count FROM "formTemplates"',
      pendingRegistrations:
        "SELECT COUNT(*) as count FROM registrations WHERE status = 'pending'",
      recentRegistrations:
        'SELECT id, "fullName", email, status, "createdAt" FROM registrations ORDER BY "createdAt" DESC LIMIT 5',
    };

    const results = await Promise.all([
      pool.query(queries.courses),
      pool.query(queries.schedules),
      pool.query(queries.registrations),
      pool.query(queries.documents),
      pool.query(queries.formTemplates),
      pool.query(queries.pendingRegistrations),
      pool.query(queries.recentRegistrations),
    ]);

    res.json({
      success: true,
      data: {
        counts: {
          courses: parseInt(results[0].rows[0].count),
          schedules: parseInt(results[1].rows[0].count),
          registrations: parseInt(results[2].rows[0].count),
          documents: parseInt(results[3].rows[0].count),
          formTemplates: parseInt(results[4].rows[0].count),
          pendingRegistrations: parseInt(results[5].rows[0].count),
        },
        recent: {
          registrations: results[6].rows,
        },
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch statistics",
        error: error.message,
      });
  }
};

module.exports = exports;
