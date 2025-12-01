const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const { connectDB } = require("./src/config/database");
const errorHandler = require("./src/middleware/errorHandler");
const { sequelize } = require("./src/config/database");
const publishScheduledBlogs = require("./src/jobs/publishScheduledBlogs");

// Start cron job
publishScheduledBlogs.start();

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware - CORS MUST BE FIRST!
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Delta Indonesia API is running",
    version: "2.0.0",
    database: "PostgreSQL",
  });
});

// Routes
app.use("/api/blogs", require("./src/routes/blog"));
app.use("/api/courses", require("./src/routes/course"));
app.use("/api/registrations", require("./src/routes/registration"));
app.use("/api/schedules", require("./src/routes/schedule"));
app.use("/api/categories", require("./src/routes/category"));
app.use("/api/tags", require("./src/routes/tag"));
app.use("/api/media", require("./src/routes/media"));

// Error Handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api`);
  console.log(`🗄️  Database: ${process.env.DB_NAME}`);
});

module.exports = app;
