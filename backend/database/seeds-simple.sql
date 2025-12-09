-- 🌱 Simple PostgreSQL Seeder
-- Use this for existing users table
-- Columns: id, email, password, name, role, isActive, createdAt, updatedAt

INSERT INTO users (email, password, name, role, "isActive", "createdAt", "updatedAt")
VALUES (
    'admin@deltaindonesia.com',
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'Admin User',
    'admin',
    true,
    NOW(),
    NOW()
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (email, password, name, role, "isActive", "createdAt", "updatedAt")
VALUES (
    'editor@deltaindonesia.com',
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'Editor User',
    'editor',
    true,
    NOW(),
    NOW()
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (email, password, name, role, "isActive", "createdAt", "updatedAt")
VALUES (
    'pic@deltaindonesia.com',
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'PIC User',
    'pic',
    true,
    NOW(),
    NOW()
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (email, password, name, role, "isActive", "createdAt", "updatedAt")
VALUES (
    'viewer@deltaindonesia.com',
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'Viewer User',
    'viewer',
    true,
    NOW(),
    NOW()
)
ON CONFLICT (email) DO NOTHING;

SELECT '✅ Done!' as status;
SELECT email, name, role, "isActive" FROM users WHERE email LIKE '%deltaindonesia.com' ORDER BY email;
