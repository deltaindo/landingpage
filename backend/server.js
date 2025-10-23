const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");
const rateLimiter = require("./src/middleware/rateLimiter");

// Routes
const contactRoutes = require("./src/routes/contact");
const trainingRoutes = require("./src/routes/training");
const subscriptionRoutes = require("./src/routes/subscription");

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

// Routes
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Delta Indonesia API is running",
    version: "1.0.0",
  });
});

app.use("/api/contact", contactRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/subscription", subscriptionRoutes);

// Error Handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
