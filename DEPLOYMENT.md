# Deployment Guide - Delta Indonesia Admin System

## Prerequisites

- VPS/Server with Node.js 18+
- PostgreSQL 12+
- Nginx or Apache for reverse proxy
- SSL Certificate (Let's Encrypt)
- Domain names configured

## Architecture

```
Client Browser
       ↓
   Nginx (Reverse Proxy)
    ↙        ↘
Frontend    Backend
(Port 3000) (Port 5000)
Next.js     Express.js
```

## Step 1: Server Setup

### Update System

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git nodejs npm postgresql postgresql-contrib nginx certbot python3-certbot-nginx
```

### Create App User

```bash
sudo useradd -m -s /bin/bash deltaindo
sudo usermod -aG sudo deltaindo
su - deltaindo
```

## Step 2: Setup Backend

```bash
# Clone repository
git clone https://github.com/deltaindo/landingpage.git
cd landingpage/backend

# Install dependencies
npm install

# Create .env for production
cat > .env << 'EOF'
PORT=5000
NODE_ENV=production

DB_HOST=localhost
DB_PORT=5432
DB_NAME=landingpage_db
DB_USER=postgres
DB_PASSWORD=your_strong_password_here

JWT_SECRET=your-production-secret-key-change-this
JWT_EXPIRE=7d

FRONTEND_URL=https://dev-landing.deltaindo.co.id
EOF
```

### Create PostgreSQL Database

```bash
# Login as postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE landingpage_db;
CREATE USER deltaindo WITH PASSWORD 'your_strong_password_here';
ALTER ROLE deltaindo SET client_encoding TO 'utf8';
ALTER ROLE deltaindo SET default_transaction_isolation TO 'read committed';
ALTER ROLE deltaindo SET default_transaction_deferrable TO on;
ALTER ROLE deltaindo SET default_transaction_read_committed TO on;
GRANT ALL PRIVILEGES ON DATABASE landingpage_db TO deltaindo;
\q
```

### Run Database Seeders

```bash
cd /home/deltaindo/landingpage/backend

psql -U deltaindo -d landingpage_db -f database/seeder.sql
psql -U deltaindo -d landingpage_db -f database/courses-seeder.sql
psql -U deltaindo -d landingpage_db -f database/2026-training-seeder-Final.sql
```

### Setup PM2 for Backend

```bash
npm install -g pm2

cd /home/deltaindo/landingpage/backend
pm2 start "npm start" --name "deltaindo-api" --instances max
pm2 save
pm2 startup
```

## Step 3: Setup Frontend

```bash
cd /home/deltaindo/landingpage/frontend

# Install dependencies
npm install

# Create .env.production
cat > .env.production << 'EOF'
NEXT_PUBLIC_API_URL=https://api-dev.deltaindo.co.id/api
EOF

# Build for production
npm run build

# Verify build
NEXT_PUBLIC_API_URL=https://api-dev.deltaindo.co.id/api npm start
```

### Setup PM2 for Frontend

```bash
pm2 start "npm start" --name "deltaindo-frontend" --instances max --cwd /home/deltaindo/landingpage/frontend
pm2 save
```

## Step 4: Nginx Configuration

### Backend API Proxy

Create `/etc/nginx/sites-available/api-dev.deltaindo.co.id`:

```nginx
upstream api_backend {
    server localhost:5000;
    keepalive 32;
}

server {
    listen 80;
    server_name api-dev.deltaindo.co.id;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api-dev.deltaindo.co.id;

    ssl_certificate /etc/letsencrypt/live/api-dev.deltaindo.co.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api-dev.deltaindo.co.id/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # CORS headers
    add_header 'Access-Control-Allow-Origin' 'https://dev-landing.deltaindo.co.id' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;

    if ($request_method = 'OPTIONS') {
        return 204;
    }

    location / {
        proxy_pass http://api_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Frontend Proxy

Create `/etc/nginx/sites-available/dev-landing.deltaindo.co.id`:

```nginx
upstream frontend_backend {
    server localhost:3000;
    keepalive 32;
}

server {
    listen 80;
    server_name dev-landing.deltaindo.co.id;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name dev-landing.deltaindo.co.id;

    ssl_certificate /etc/letsencrypt/live/dev-landing.deltaindo.co.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dev-landing.deltaindo.co.id/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    client_max_body_size 10M;

    location / {
        proxy_pass http://frontend_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable Sites

```bash
sudo ln -s /etc/nginx/sites-available/api-dev.deltaindo.co.id /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/dev-landing.deltaindo.co.id /etc/nginx/sites-enabled/

# Test nginx
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

## Step 5: SSL Certificates

```bash
sudo certbot certonly --nginx -d api-dev.deltaindo.co.id -d dev-landing.deltaindo.co.id

# Auto-renewal
sudo systemctl enable certbot.timer
```

## Step 6: Verification

### Check Services

```bash
pm2 status
sudo systemctl status nginx
sudo systemctl status postgresql
```

### Test Endpoints

```bash
# Health check
curl https://api-dev.deltaindo.co.id/api/health

# Frontend
curl https://dev-landing.deltaindo.co.id/admin/login
```

## Step 7: Monitoring

### Enable PM2 Monitoring

```bash
pm2 web
# Available at http://localhost:9615

pm2 log
pm2 monit
```

### Setup Log Rotation

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 100M
pm2 set pm2-logrotate:retain 30
```

## Troubleshooting

### Backend Not Starting

```bash
pm2 logs deltaindo-api
pm2 delete deltaindo-api
pm2 start "npm start" --name "deltaindo-api" --cwd /home/deltaindo/landingpage/backend
```

### CORS Still Blocked

1. Check nginx CORS headers are set
2. Verify `FRONTEND_URL` in backend .env
3. Restart both nginx and backend: `sudo systemctl restart nginx && pm2 restart deltaindo-api`

### Database Connection Error

```bash
# Test connection
psql -U deltaindo -d landingpage_db -c "SELECT 1;"

# Check .env credentials
cat /home/deltaindo/landingpage/backend/.env | grep DB_
```

## Production Checklist

- [ ] SSL certificates installed
- [ ] CORS configured correctly
- [ ] Database backups enabled
- [ ] PM2 set to restart on reboot
- [ ] Environment variables set
- [ ] Database seeders run
- [ ] Frontend build optimized
- [ ] Monitoring configured
- [ ] Log rotation enabled
- [ ] Firewall rules applied

## Maintenance

### Update Dependencies

```bash
cd /home/deltaindo/landingpage/backend
git pull
npm install
pm2 restart deltaindo-api

cd /home/deltaindo/landingpage/frontend
git pull
npm install
npm run build
pm2 restart deltaindo-frontend
```

### Backup Database

```bash
sudo -u postgres pg_dump landingpage_db > backup_$(date +%Y%m%d).sql
```

### View Logs

```bash
pm2 logs deltaindo-api --tail 100
pm2 logs deltaindo-frontend --tail 100
sudo tail -f /var/log/nginx/error.log
```
