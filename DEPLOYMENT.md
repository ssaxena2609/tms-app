# TMS Production Deployment Guide

## Prerequisites

- Node.js 18+ installed
- npm 9+ installed
- Domain name (optional)
- SSL certificate (for production)

## Environment Configuration

### Backend Environment Variables

Create `backend/.env.production`:

```env
PORT=4000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

### Frontend Environment Variables

Create `frontend/.env.production`:

```env
VITE_GRAPHQL_URI=https://api.yourdomain.com/graphql
```

## Build Process

### 1. Backend Build

```bash
cd backend
npm install --production
npm run build
```

This creates a `dist/` folder with compiled JavaScript.

### 2. Frontend Build

```bash
cd frontend
npm install
npm run build
```

This creates a `dist/` folder with optimized static assets.

## Deployment Options

### Option 1: Traditional Server (VPS)

#### Backend Deployment

1. **Setup PM2 (Process Manager)**

```bash
npm install -g pm2
```

2. **Create PM2 Config** (`backend/ecosystem.config.js`):

```javascript
module.exports = {
  apps: [{
    name: 'tms-backend',
    script: 'dist/index.js',
    instances: 2,
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: 'production',
      PORT: 4000
    }
  }]
};
```

3. **Start Application**

```bash
cd backend
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

#### Frontend Deployment

1. **Using Nginx**

Install Nginx:
```bash
sudo apt update
sudo apt install nginx
```

2. **Configure Nginx** (`/etc/nginx/sites-available/tms`):

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/tms/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /graphql {
        proxy_pass http://localhost:4000/graphql;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Enable Site**

```bash
sudo ln -s /etc/nginx/sites-available/tms /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Option 2: Docker Deployment

#### Backend Dockerfile

Create `backend/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 4000

CMD ["node", "dist/index.js"]
```

#### Frontend Dockerfile

Create `frontend/Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - PORT=4000
      - CORS_ORIGIN=http://localhost
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

### Option 3: Cloud Platform Deployment

#### Heroku

**Backend:**
```bash
cd backend
heroku create tms-backend
heroku config:set NODE_ENV=production
git push heroku main
```

**Frontend:**
```bash
cd frontend
heroku create tms-frontend
heroku buildpacks:set heroku/nodejs
git push heroku main
```

#### Vercel (Frontend)

```bash
cd frontend
npm install -g vercel
vercel --prod
```

#### Railway / Render

1. Connect GitHub repository
2. Configure build commands
3. Set environment variables
4. Deploy

## SSL Certificate (HTTPS)

### Using Let's Encrypt (Free)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
sudo certbot renew --dry-run
```

## Performance Optimization

### Backend

1. **Enable Compression**

```bash
npm install compression
```

In `backend/src/index.ts`:
```typescript
import compression from 'compression';
app.use(compression());
```

2. **Add Rate Limiting**

```bash
npm install express-rate-limit
```

3. **Enable Caching Headers**

4. **Monitor with PM2**

```bash
pm2 monit
```

### Frontend

1. **Already optimized** by Vite build:
   - Code splitting
   - Tree shaking
   - Minification
   - Asset optimization

2. **CDN Setup** (optional):
   - Use Cloudflare
   - Or AWS CloudFront
   - Or Netlify CDN

## Monitoring & Logging

### Backend Logging

Install Winston:
```bash
npm install winston
```

### Frontend Error Tracking

Consider:
- Sentry
- LogRocket
- Rollbar

### Uptime Monitoring

- UptimeRobot
- Pingdom
- StatusCake

## Backup Strategy

### Database Backup (if using database)

Set up automated backups:
```bash
# Example for PostgreSQL
pg_dump dbname > backup.sql
```

### Code Backup

- Use Git version control
- Regular commits to remote repository
- Tag releases

## Security Checklist

- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation on all mutations
- [ ] Security headers configured
- [ ] Dependencies updated regularly
- [ ] Error messages don't expose sensitive info

## Health Checks

Backend already has a health endpoint:
```bash
curl http://localhost:4000/health
```

Set up monitoring to ping this endpoint.

## Rollback Strategy

### Using PM2

```bash
# List previous versions
pm2 list

# Restart previous version
pm2 restart tms-backend@previous
```

### Using Git

```bash
git checkout previous-working-commit
npm run build
pm2 restart all
```

## Scaling

### Horizontal Scaling

Use PM2 cluster mode:
```bash
pm2 start app.js -i max
```

### Load Balancer

Use Nginx or cloud load balancer for multiple instances.

## CI/CD Pipeline Example

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy TMS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        run: |
          # Your deployment script here
```

## Post-Deployment Verification

1. **Test GraphQL API**
   ```bash
   curl https://api.yourdomain.com/health
   ```

2. **Test Frontend**
   - Open browser to your domain
   - Check all views work
   - Test CRUD operations

3. **Monitor Logs**
   ```bash
   pm2 logs
   ```

4. **Check Performance**
   - Use Lighthouse for frontend
   - Use ab (Apache Bench) for backend

## Maintenance

### Regular Updates

```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Security audit
npm audit
npm audit fix
```

### Backup Schedule

- Daily: Logs backup
- Weekly: Full application backup
- Monthly: Archive old data

## Troubleshooting

### High CPU Usage
```bash
pm2 monit
pm2 reload all
```

### Memory Leaks
```bash
pm2 restart all
```

### Connection Issues
- Check firewall settings
- Verify CORS configuration
- Check SSL certificate

## Cost Optimization

1. Use free tiers:
   - Heroku free tier
   - Vercel free tier
   - Railway free tier

2. Optimize resources:
   - Enable compression
   - Use CDN for static assets
   - Implement caching

3. Monitor usage:
   - Set up alerts
   - Track metrics

---

**Deployment Complete! 🚀**

For support: Check logs, review documentation, or create an issue.
