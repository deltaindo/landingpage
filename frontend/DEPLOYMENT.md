# Deployment Guide - Delta Indonesia Admin System

## Local Development

### Prerequisites
- Node.js 18+
- Backend running on `http://localhost:5000`
- PostgreSQL running locally

### Setup

```bash
cd frontend
npm install

# Create .env.local for development
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

npm run dev
```

Access at: `http://localhost:3000/admin/login`

---

## Production Deployment (Cloudflare)

You have **2 options** for the backend API URL:

### Option 1: Backend on Separate Domain

If backend is on `api.deltaindo.co.id`:

```bash
# Create .env.production
echo "NEXT_PUBLIC_API_URL=https://api.deltaindo.co.id/api" > .env.production

# Build
npm run build
```

**Backend Requirements:**
- Must have CORS enabled for `https://dev-landing.deltaindo.co.id`
- Backend `.env` should have:
  ```
  FRONTEND_URL=https://dev-landing.deltaindo.co.id
  ```

### Option 2: Backend on Same Domain (Recommended for Cloudflare)

If you want to proxy `/api/*` requests to your backend:

**1. Create Cloudflare Rewrite Rule:**

- Go to Cloudflare Dashboard
- Select your domain
- Rules → URL Rewrite
- Add rule:
  - URL Path: `/api/*`
  - Rewrite to: `https://your-backend-domain.com/api/*`

**2. Don't set `NEXT_PUBLIC_API_URL` or set it to relative path:**

```bash
echo "NEXT_PUBLIC_API_URL=/api" > .env.production
# OR just don't set it, and it will auto-detect
```

---

## Current Setup Issue

Your current error shows:
```
POST https://localhost:5000/api/auth/login net::ERR_FAILED
CORS error
```

**Problems:**
1. ❌ Frontend is trying to connect to `localhost:5000` (doesn't exist in production)
2. ❌ Backend is not reachable from Cloudflare domain
3. ❌ CORS is not configured for production domain

---

## Fix for Your Setup

Assuming you have a backend API somewhere (e.g., `api.deltaindo.co.id`):

### Step 1: Set Production API URL

```bash
cd frontend
echo "NEXT_PUBLIC_API_URL=https://api.deltaindo.co.id/api" > .env.production
```

### Step 2: Verify Backend CORS

Your backend `server.js` should have:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',           // Local development
    'https://dev-landing.deltaindo.co.id', // Production
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Step 3: Build & Deploy

```bash
npm run build
npm start  # or deploy to Cloudflare
```

### Step 4: Deploy to Cloudflare

#### Using Cloudflare Pages (Recommended):

```bash
npm install -g wrangler
wrangler login

# In frontend directory
wrangler pages deploy out  # if using 'out' as export directory
```

#### OR Connect GitHub to Cloudflare Pages:

1. Go to Cloudflare Dashboard
2. Pages → Create project → Connect to Git
3. Select your repository and branch (`dev`)
4. Build settings:
   - Framework: Next.js
   - Build command: `npm run build`
   - Build output directory: `.next` or `out`
5. Environment variables:
   - Add `NEXT_PUBLIC_API_URL=https://api.deltaindo.co.id/api`
6. Deploy

---

## Environment Variables

### Development (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Production (.env.production)
```env
NEXT_PUBLIC_API_URL=https://api.deltaindo.co.id/api
```

---

## Testing Production

### Local Staging:

```bash
# Build production version locally
npm run build
NODE_ENV=production NEXT_PUBLIC_API_URL=https://api.deltaindo.co.id/api npm start
```

### Test API Connection:

```bash
# In browser console:
curl https://api.deltaindo.co.id/api/health
```

---

## Troubleshooting

### CORS Error

**Error:** `has been blocked by CORS policy`

**Solution:**
1. Verify backend has CORS middleware
2. Check `FRONTEND_URL` matches your Cloudflare domain
3. Restart backend

### 404 on API Endpoints

**Error:** `POST https://api.deltaindo.co.id/api/auth/login 404`

**Solution:**
1. Verify backend is running
2. Check endpoint exists: `curl https://api.deltaindo.co.id/api/health`
3. Check auth route is registered in backend

### Network Error

**Error:** `net::ERR_FAILED`

**Solution:**
1. Backend is down or unreachable
2. Check firewall rules
3. Verify domain/IP is correct
4. Check SSL certificate validity

---

## Cloudflare Configuration

### SSL/TLS

1. Go to SSL/TLS → Overview
2. Set to "Full" or "Full (Strict)"
3. Enable "Always Use HTTPS"

### Security

1. Security → Security Level: Medium or High
2. Bot Management: Enable if needed
3. WAF: Optional

### Performance

1. Caching → Cache Level: Cache Everything
2. Browser Cache TTL: 30 minutes
3. Enable Brotli compression

---

## Environment Variables Summary

| Variable | Local Dev | Production |
|----------|-----------|------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api` | `https://api.deltaindo.co.id/api` |
| `NODE_ENV` | `development` | `production` |
| Backend Port | `5000` | `443` (HTTPS) |
| Frontend Port | `3000` | Cloudflare managed |

---

## Checklist

- [ ] Backend deployed and accessible
- [ ] CORS configured for production domain
- [ ] `.env.production` has correct API URL
- [ ] Built production version locally and tested
- [ ] Connected GitHub to Cloudflare Pages
- [ ] Environment variables set in Cloudflare
- [ ] SSL/TLS enabled
- [ ] Admin login working in production
- [ ] Data tables loading correctly
- [ ] Export functionality working

---

## Support

If issues persist:
1. Check browser DevTools Console
2. Check Network tab for failed requests
3. Verify backend is running
4. Check CORS configuration
5. Verify environment variables
