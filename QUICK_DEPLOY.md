# Quick Deployment to Railway + Vercel

## Prerequisites
- GitHub account
- Railway account (free tier available)
- Vercel account (free tier available)

## Step 1: Push Code to GitHub

```bash
cd /Users/sasaxena/Desktop/test

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Complete TMS app with authentication"

# Create repository on GitHub, then:
git remote add origin https://github.com/yourusername/tms-app.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Railway

### Via Railway CLI:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend
cd backend
railway init
railway up
```

### Via Railway Dashboard (Easier):
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select your repository
5. Select "backend" folder
6. Add environment variables:
   ```
   PORT=4000
   NODE_ENV=production
   JWT_SECRET=generate-a-secure-random-string-here
   CORS_ORIGIN=https://your-app.vercel.app
   ```
7. Deploy!
8. Copy your Railway URL (e.g., `https://tms-backend-production.up.railway.app`)

## Step 3: Deploy Frontend to Vercel

### Via Vercel CLI:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
```

### Via Vercel Dashboard (Easier):
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variable:
   ```
   VITE_GRAPHQL_URI=https://your-railway-backend-url.railway.app/graphql
   ```
6. Deploy!
7. Get your live URL (e.g., `https://tms-app.vercel.app`)

## Step 4: Update CORS Origin

Go back to Railway dashboard:
1. Open your backend project
2. Go to Variables
3. Update CORS_ORIGIN to your Vercel URL:
   ```
   CORS_ORIGIN=https://tms-app.vercel.app
   ```
4. Redeploy

## Step 5: Test Your Live App!

1. Open your Vercel URL
2. Login with: admin@tms.com / admin123
3. Test all features!

## Alternative: All-in-One Platform

### Option A: Render.com
1. Go to https://render.com
2. Create two services:
   - Backend: Node.js
   - Frontend: Static Site
3. Connect GitHub
4. Configure environment variables
5. Deploy both

### Option B: Fly.io
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Deploy backend
cd backend
fly launch

# Deploy frontend
cd frontend
fly launch
```

## Environment Variables Reference

### Backend (.env):
```
PORT=4000
NODE_ENV=production
JWT_SECRET=your-super-secure-random-string-min-32-chars
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend (.env):
```
VITE_GRAPHQL_URI=https://your-backend-domain.com/graphql
```

## Generate Secure JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Troubleshooting

### CORS Error:
- Ensure CORS_ORIGIN in backend matches your frontend URL exactly
- Include https:// 
- No trailing slash

### GraphQL Connection Error:
- Verify VITE_GRAPHQL_URI is correct
- Check backend is running
- Test backend health: `https://your-backend-url.com/health`

### Build Fails:
- Check all dependencies are in package.json
- Ensure Node version is 18+
- Check build logs for specific errors

## Free Tier Limits

### Railway (Free Tier):
- $5/month credit
- Unlimited projects
- 512MB RAM
- Good for MVP/Demo

### Vercel (Free Tier):
- Unlimited projects
- 100GB bandwidth/month
- Perfect for frontend

### Render (Free Tier):
- 750 hours/month
- Sleeps after 15 min inactivity
- Good for demos

## Going Live Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Railway/Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] JWT secret is secure and random
- [ ] HTTPS enabled on both
- [ ] Test login/register
- [ ] Test all CRUD operations
- [ ] Test role-based permissions
- [ ] Custom domain (optional)
- [ ] Monitoring set up (optional)

**Your app is now LIVE!** 🎉🚀
