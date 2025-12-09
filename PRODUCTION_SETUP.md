# Production Setup - Delta Indonesia

## 🚀 Quick Summary

Your current error:
```
POST https://localhost:5000/api/auth/login net::ERR_FAILED
CORS error
```

**Root Cause:** Frontend deployed on Cloudflare is trying to connect to `localhost:5000` which:
- ❌ Doesn't exist in production
- ❌ Is only available on your local machine
- ❌ Not reachable from Cloudflare domain

---

## ✅ Solution

### 1. Identify Your Backend URL

Where is your backend API deployed?
- Option A: `api.deltaindo.co.id` (separate domain)
- Option B: Same domain as frontend with path `/api`
- Option C: Different domain/port

### 2. Set Environment Variable

Replace `YOUR_BACKEND_URL` with actual backend:

```bash
cd frontend

# Create .env.production with your backend URL
echo "NEXT_PUBLIC_API_URL=https://YOUR_BACKEND_URL/api" > .env.production
```

### 3. Build for Production

```bash
npm install
npm run build
```

### 4. Deploy to Cloudflare Pages

#### Method A: GitHub Integration (Recommended)

1. Push to GitHub `dev` branch
2. Go to Cloudflare Dashboard → Pages
3. Connect GitHub repository
4. Select `dev` branch
5. Build settings:
   - Framework: **Next.js**
   - Build command: `npm run build`
   - Output directory: `.next`
6. Environment: Add `NEXT_PUBLIC_API_URL=https://YOUR_BACKEND_URL/api`
7. Deploy!

#### Method B: Manual Deployment

```bash
npm install -g wrangler
wrangler pages deploy frontend/out
```

---

## 🔧 Backend Configuration

Your backend must:

1. **Enable CORS for production domain:**

```javascript
app.use(cors({
  origin: 'https://dev-landing.deltaindo.co.id',
  credentials: true
}));
```

2. **Have all required endpoints:**
   - `POST /api/auth/login`
   - `GET /api/auth/me`
   - `GET /api/cms/admin/blogs`
   - `GET /api/cms/admin/courses`
   - `GET /api/cms/admin/schedules`
   - `GET /api/cms/admin/registrations`
   - `GET /api/cms/admin/registration-documents`
   - `GET /api/cms/admin/form-templates`
   - `GET /api/cms/admin/users`
   - `GET /api/cms/admin/stats`

3. **Use HTTPS in production**

---

## 📍 API URL Configuration

The frontend automatically determines API URL:

```
Local Dev:    http://localhost:5000/api
Production:   Use .env.production value
```

If not set, it defaults to:
```
https://dev-landing.deltaindo.co.id/api
```

---

## ✨ Verification Checklist

- [ ] Backend deployed and accessible
- [ ] CORS configured for `https://dev-landing.deltaindo.co.id`
- [ ] `.env.production` has backend URL
- [ ] Build succeeds: `npm run build`
- [ ] Cloudflare Pages deployment complete
- [ ] Access `https://dev-landing.deltaindo.co.id/admin/login`
- [ ] Login works (no network errors)
- [ ] Dashboard loads (data fetches correctly)

---

## 🆘 Still Having Issues?

### Check Backend

```bash
# Test backend is running
curl https://api.deltaindo.co.id/api/health

# Should return: {"status":"OK", ...}
```

### Check Frontend Console

1. Open DevTools (F12)
2. Console tab
3. Look for API URL being used
4. Look for CORS errors

### Common Errors

| Error | Solution |
|-------|----------|
| `net::ERR_FAILED` | Backend not running or wrong URL |
| `CORS policy blocked` | Backend CORS not configured |
| `404 on /api/auth/login` | Backend endpoint doesn't exist |
| `Connection refused` | Backend firewall blocking |

---

## Next Steps

1. ✅ Identify backend URL
2. ✅ Set `.env.production`
3. ✅ Build locally: `npm run build`
4. ✅ Deploy to Cloudflare Pages
5. ✅ Test admin login
6. ✅ Verify data loads

You're good to go! 🎉
