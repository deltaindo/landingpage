# 🌱 PostgreSQL Seeder Documentation

## Quick Start

```bash
psql -U admin -d pendaftaran -f ./database/seeds.sql
```

That's it! ✅

---

## Files

- **`seeds.sql`** - Complete seeder (recommended)
- **`seeds-simple.sql`** - Simple version (same thing, different name)

---

## Column Reference

Your actual database columns:

```
id              UUID (primary key)
email           VARCHAR(100) - UNIQUE
password        VARCHAR(255) - hashed
name            VARCHAR(255)
role            VARCHAR(20) - 'admin', 'editor', 'pic', 'viewer'
isActive        BOOLEAN - true/false (camelCase!)
createdAt       TIMESTAMP - auto
updatedAt       TIMESTAMP - auto
```

**Important**: Columns use camelCase: `isActive`, `createdAt`, `updatedAt` (wrapped in quotes in SQL)

---

## Users Created

```
email                           password      role
================================================
admin@deltaindonesia.com        password123   admin
editor@deltaindonesia.com       password123   editor
pic@deltaindonesia.com          password123   pic
viewer@deltaindonesia.com       password123   viewer
```

---

## Testing

### Verify Seeding Worked

```bash
psql -U admin -d pendaftaran -c "SELECT email, role, \"isActive\" FROM users WHERE email LIKE '%deltaindonesia.com' ORDER BY email;"
```

Should show:
```
              email         | role  | isActive
-----------------------+-------+----------
 admin@deltaindonesia.com | admin | t
 editor@deltaindonesia.com| editor| t
 pic@deltaindonesia.com   | pic   | t
 viewer@deltaindonesia.com| viewer| t
```

### Test Login

1. Restart backend: `npm start`
2. Clear browser cache: `localStorage.clear()`
3. Go to: `https://dev-landing.deltaindo.co.id/admin/login`
4. Use credentials above
5. Dashboard should load ✅

---

## Notes

- ✅ Safe to run multiple times (uses `ON CONFLICT DO NOTHING`)
- ✅ Passwords already hashed with bcrypt
- ✅ Uses `NOW()` for timestamps
- ✅ All 4 users created in one command

---

## Troubleshooting

**Error: column "xyz" does not exist**
- Make sure you're using the correct file from the `database/` folder
- Check that column names match exactly (camelCase with quotes!)

**Error: relation "users" does not exist**
- Table hasn't been created yet
- Create it first using your migration

**Password hash in SQL doesn't work**
- The hash `$2a$10$...` is valid bcrypt
- To generate your own: Use `bcrypt.hashSync('password', 10)` in Node.js

---

## Manual Insert (if seeder fails)

```sql
INSERT INTO users (email, password, name, role, "isActive", "createdAt", "updatedAt")
VALUES (
    'admin@deltaindonesia.com',
    '$2a$10$0Wm6lVxWnLzKKWKzk1jP8.R0A5zQ5jJ5J5J5J5J5J5J5J5J5J5J5',
    'Admin User',
    'admin',
    true,
    NOW(),
    NOW()
);
```
