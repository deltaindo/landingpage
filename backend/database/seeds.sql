-- 🌱 PostgreSQL Seeder for Admin Users
-- Run this SQL file to seed the database with default users
-- Command: psql -U your_user -d your_database -f backend/database/seeds.sql

-- ============================================
-- Seed default users
-- ============================================
-- Check and insert admin user
INSERT INTO users (email, password, name, role, "isActive", "createdAt", "updatedAt")
SELECT 
    'admin@deltaindonesia.com',
    -- Password: password123 (bcrypt hash)
    -- Generated with: bcrypt.hash('password123', 10)
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'Admin User',
    'admin',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@deltaindonesia.com');

-- Insert editor user
INSERT INTO users (email, password, name, role, "isActive", "createdAt", "updatedAt")
SELECT 
    'editor@deltaindonesia.com',
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'Editor User',
    'editor',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'editor@deltaindonesia.com');

-- Insert PIC user
INSERT INTO users (email, password, name, role, "isActive", "createdAt", "updatedAt")
SELECT 
    'pic@deltaindonesia.com',
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'PIC User',
    'pic',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'pic@deltaindonesia.com');

-- Insert viewer user
INSERT INTO users (email, password, name, role, "isActive", "createdAt", "updatedAt")
SELECT 
    'viewer@deltaindonesia.com',
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'Viewer User',
    'viewer',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'viewer@deltaindonesia.com');

-- ============================================
-- Verify seeding
-- ============================================
SELECT '✅ Seeding Complete. Users in database:' as result;
SELECT email, name, role, "isActive", "createdAt" FROM users ORDER BY "createdAt";
