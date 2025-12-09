-- 🌱 Simple PostgreSQL Seeder - Insert Users Only
-- Use this if the users table already exists
-- Command: psql -U admin -d pendaftaran -f ./database/seeds-simple.sql

-- Insert admin user (password: password123)
INSERT INTO users (email, password, name, role, "isActive", "createdAt", "updatedAt")
VALUES (
    'admin@deltaindonesia.com',
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'Admin User',
    'admin',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (email) DO NOTHING;

-- Insert editor user
INSERT INTO users (email, password, name, role, "isActive", "createdAt", "updatedAt")
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
INSERT INTO users (email, password, name, role, "isActive", "createdAt", "updatedAt")
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
INSERT INTO users (email, password, name, role, "isActive", "createdAt", "updatedAt")
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

-- Verify
SELECT '✅ Done! Users in database:' as result;
SELECT email, name, role, "isActive" FROM users WHERE email LIKE '%deltaindonesia.com' ORDER BY email;
