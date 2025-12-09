# Quick Fix for API Connection Error

## Problem
The admin login page is trying to connect to `http://localhost:5000/api/auth/login` but your backend is running on port **3001**.

## Solution

### Step 1: Create .env.local file

In the `frontend` directory, create a file named `.env.local`:

```bash
cd frontend
touch .env.local
```

### Step 2: Add API URL configuration

Add this line to `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Step 3: Restart the development server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Verify Backend is Running

Make sure your backend server is running on port 3001:

```bash
cd backend
npm run dev
```

You should see something like:
```
Server running on port 3001
```

### Step 5: Test the Connection

Open your browser console (F12) and you should see:
```
API Base URL: http://localhost:3001/api
```

When you try to login, you should see:
```
API Request: POST /auth/login
```

## Troubleshooting

### Error: "Cannot connect to backend"

1. Check if backend is running:
   ```bash
   curl http://localhost:3001/api/auth/login
   ```

2. Check backend CORS settings in `backend/server.js`:
   ```javascript
   app.use(cors({
     origin: 'http://localhost:3000',
     credentials: true
   }));
   ```

### Error: "401 Unauthorized"

1. Check if you have a user in the database
2. Try registering first at `/api/auth/register`
3. Verify password hashing in backend

### Error: "Network Error"

1. Backend not running
2. Wrong port number
3. Firewall blocking connection

## Backend Setup Reminder

If your backend isn't set up yet:

```bash
cd backend
npm install

# Create .env file
echo "DATABASE_URL=postgresql://user:password@localhost:5432/dbname" > .env
echo "JWT_SECRET=your-secret-key" >> .env
echo "PORT=3001" >> .env

# Run database migrations
psql -U postgres -d dbname -f database/seeder.sql

# Start server
npm run dev
```

## Quick Test

Test if backend is working:

```bash
# Should return list of routes or 404
curl http://localhost:3001/api/

# Test login endpoint (should return error about missing credentials)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'
```

## Environment Variables Reference

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend (.env)
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/landingpage_db
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=3001
NODE_ENV=development
```
