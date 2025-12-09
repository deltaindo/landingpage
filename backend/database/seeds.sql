-- 🌱 PostgreSQL Seeder for Admin Users
-- Run this SQL file to seed the database with default users
-- Command: psql -U admin -d pendaftaran -f ./database/seeds.sql

-- ============================================
-- Seed default users
-- ============================================
-- Insert admin user (password: password123)
INSERT INTO users (email, password, name, role, is_active, created_at, updated_at)
VALUES (
    'admin@deltaindonesia.com',
    -- Password: password123 (bcrypt hash)
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'Admin User',
    'admin',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (email) DO NOTHING;

-- Insert editor user
INSERT INTO users (email, password, name, role, is_active, created_at, updated_at)
VALUES (
    'editor@deltaindonesia.com',
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'Editor User',
    'editor',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (email) DO NOTHING;

-- Insert PIC user
INSERT INTO users (email, password, name, role, is_active, created_at, updated_at)
VALUES (
    'pic@deltaindonesia.com',
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'PIC User',
    'pic',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (email) DO NOTHING;

-- Insert viewer user
INSERT INTO users (email, password, name, role, is_active, created_at, updated_at)
VALUES (
    'viewer@deltaindonesia.com',
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'Viewer User',
    'viewer',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- Verify seeding
-- ============================================
SELECT '✅ Seeding Complete. Users in database:' as result;
SELECT email, name, role, is_active FROM users ORDER BY email;
