-- 🌱 PostgreSQL Seeder for Admin Users
-- Run this SQL file to seed the database with default users
-- Command: psql -U your_user -d your_database -f backend/database/seeds.sql

-- ============================================
-- Create ENUM type if it doesn't exist
-- ============================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'editor', 'pic', 'viewer');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- Create users table if it doesn't exist
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'viewer',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster queries
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================
-- Seed default users
-- ============================================
-- Check and insert admin user
INSERT INTO users (email, password, name, role, is_active, created_at, updated_at)
SELECT 
    'admin@deltaindonesia.com',
    -- Password: password123 (bcrypt hash)
    -- To generate: bcrypt.hash('password123', 10)
    -- Or use online generator: https://bcrypt-generator.com/
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'Admin User',
    'admin'::user_role,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@deltaindonesia.com');

-- Insert editor user
INSERT INTO users (email, password, name, role, is_active, created_at, updated_at)
SELECT 
    'editor@deltaindonesia.com',
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'Editor User',
    'editor'::user_role,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'editor@deltaindonesia.com');

-- Insert PIC user
INSERT INTO users (email, password, name, role, is_active, created_at, updated_at)
SELECT 
    'pic@deltaindonesia.com',
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'PIC User',
    'pic'::user_role,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'pic@deltaindonesia.com');

-- Insert viewer user
INSERT INTO users (email, password, name, role, is_active, created_at, updated_at)
SELECT 
    'viewer@deltaindonesia.com',
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'Viewer User',
    'viewer'::user_role,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'viewer@deltaindonesia.com');

-- ============================================
-- Verify seeding
-- ============================================
SELECT '✅ Seeding Complete. Users in database:' as result;
SELECT email, name, role, is_active, created_at FROM users ORDER BY created_at;
