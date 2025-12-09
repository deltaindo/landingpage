# Quick Start Guide - Delta Indonesia Admin System

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 12+ installed and running
- Git installed

## Step 1: Clone Repository

```bash
git clone https://github.com/deltaindo/landingpage.git
cd landingpage
```

## Step 2: Setup Backend (Port 5000)

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
nano .env  # or use your preferred editor
```

### Configure .env:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=landingpage_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:3000
```

### Setup Database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE landingpage_db;

# Exit psql
\q

# Run database seeders (in order)
psql -U postgres -d landingpage_db -f database/seeder.sql
psql -U postgres -d landingpage_db -f database/courses-seeder.sql
psql -U postgres -d landingpage_db -f database/2026-training-seeder-Final.sql
```

### Start Backend:

```bash
npm run dev
```

You should see:
```
✅ Database connection established successfully
✅ Database models synced
🚀 Server is running on port 5000
📍 API URL: http://localhost:5000/api
```

## Step 3: Setup Frontend (Port 3000)

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start development server
npm run dev
```

You should see:
```
  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  - Ready in 2.5s
```

## Step 4: Access Admin Panel

1. Open browser: `http://localhost:3000/admin/login`

2. Login with demo credentials:
   - Email: `admin@deltaindonesia.com`
   - Password: `password123`

3. You'll be redirected to the dashboard!

## Troubleshooting

### Backend Issues

**Error: "ECONNREFUSED" or "Cannot connect to database"**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list               # macOS

# Start PostgreSQL if not running
sudo systemctl start postgresql  # Linux
brew services start postgresql   # macOS
```

**Error: "Port 5000 already in use"**
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9    # Unix/macOS
netstat -ano | findstr :5000     # Windows
```

**Error: "Database does not exist"**
```bash
# Recreate database
psql -U postgres -c "CREATE DATABASE landingpage_db;"
```

### Frontend Issues

**Error: "Failed to fetch" or "Network Error"**
- Make sure backend is running on port 5000
- Check `.env.local` has correct API URL
- Clear browser cache and localStorage

**Error: "Port 3000 already in use"**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9    # Unix/macOS
```

**Error: "Module not found"**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS Issues

If you see CORS errors in browser console:

1. Check backend `.env` has `FRONTEND_URL=http://localhost:3000`
2. Restart backend server
3. Clear browser cache

## Verify Everything Works

### Test Backend:

```bash
# Health check
curl http://localhost:5000/api/health

# Should return:
# {"status":"OK","timestamp":"...","uptime":...}
```

### Test Frontend Login:

```bash
# Test login API
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@deltaindonesia.com","password":"password123"}'

# Should return token and user data
```

### Browser Console Check:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Try logging in
4. You should see:
   ```
   [API Request] POST /auth/login
   [API Response] /auth/login 200
   ```

## Next Steps

- ✅ Backend running on port 5000
- ✅ Frontend running on port 3000
- ✅ Database connected
- ✅ Admin login working

Now you can:
1. Explore the admin dashboard
2. Manage blogs, courses, schedules, etc.
3. Export data to CSV/PDF
4. Create new admin users

## Development Workflow

### Starting Development:

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

### Making Changes:

- Backend changes: Server auto-restarts with nodemon
- Frontend changes: Hot reload automatically

### Stopping Servers:

- Press `Ctrl+C` in each terminal

## Production Deployment

See `DEPLOYMENT.md` for production setup instructions.

## Support

If you encounter issues:
1. Check this guide first
2. Review error messages in console
3. Check browser Network tab
4. Contact development team
