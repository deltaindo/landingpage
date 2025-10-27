const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const { connectDB } = require("./src/config/database");
const errorHandler = require("./src/middleware/errorHandler");
const rateLimiter = require("./src/middleware/rateLimiter");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimiter);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Delta Indonesia API is running",
    version: "2.0.0",
    database: "PostgreSQL",
  });
});

// Only include routes that exist
// app.use('/api/blog', require('./src/routes/blog'));
// app.use('/api/courses', require('./src/routes/course'));
// app.use('/api/registrations', require('./src/routes/registration'));
// app.use('/api/form-templates', require('./src/routes/formTemplate'));
app.use("/api/contact", require("./src/routes/contact"));
app.use("/api/subscription", require("./src/routes/subscription"));
app.use("/api/auth", require("./src/routes/auth"));

// Error Handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
  console.log(`📍 API: http://localhost:${PORT}/api`);
  console.log(`📧 Email: ${process.env.EMAIL_USER}`);
  console.log(`🗄️  Database: ${process.env.DB_NAME}`);
});
