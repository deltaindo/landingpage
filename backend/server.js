const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { sequelize } = require('./src/models');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get frontend URL from environment
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://dev-landing.deltaindo.co.id',
      'https://landing.deltaindo.co.id',
      FRONTEND_URL
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS request from unknown origin: ${origin}`);
      // Don't reject in development, only in production
      if (IS_PRODUCTION) {
        callback(new Error('Not allowed by CORS'));
      } else {
        callback(null, true);
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400 // 24 hours
};

// Security Middleware
app.use(helmet());
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const origin = req.headers.origin || 'no-origin';
  console.log(`[${timestamp}] ${req.method} ${req.path} - Origin: ${origin}`);
  next();
});

// Routes
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');
const categoryRoutes = require('./src/routes/category');
const tagRoutes = require('./src/routes/tag');
const mediaRoutes = require('./src/routes/media');
const courseRoutes = require('./src/routes/course');
const scheduleRoutes = require('./src/routes/schedule');
const registrationRoutes = require('./src/routes/registration');
const contactRoutes = require('./src/routes/contact');
const subscriptionRoutes = require('./src/routes/subscription');
const formTemplateRoutes = require('./src/routes/formTemplate');
const trainingRoutes = require('./src/routes/training');
const cmsAdminRoutes = require('./src/routes/cmsAdmin');
const cmsEditorRoutes = require('./src/routes/cmsEditor');
const cmsPICRoutes = require('./src/routes/cmsPIC');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/form-templates', formTemplateRoutes);
app.use('/api/trainings', trainingRoutes);
app.use('/api/cms/admin', cmsAdminRoutes);
app.use('/api/cms/editor', cmsEditorRoutes);
app.use('/api/cms/pic', cmsPICRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Delta Indonesia API Server',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    frontendUrl: FRONTEND_URL,
    health: '/api/health'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Database connection and server start
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');

    // Sync models (use { force: false } in production)
    await sequelize.sync({ alter: false });
    console.log('✅ Database models synced');

    // Start server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n🚀 Server is running on port ${PORT}`);
      console.log(`📍 API URL: http://localhost:${PORT}/api`);
      console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
      console.log(`🔒 CORS Enabled for: ${FRONTEND_URL}`);
      console.log(`💼 Environment: ${process.env.NODE_ENV || 'development'}\n`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
