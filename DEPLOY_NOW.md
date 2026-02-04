# 🚀 DEPLOY YOUR APP - STEP BY STEP

I've prepared everything for deployment! Here's what you need to do:

## ✅ What's Ready:
- ✅ Git repository initialized
- ✅ All code committed
- ✅ Deployment configs created
- ✅ Environment variables documented
- ✅ Helper script created

---

## 📋 Follow These Steps:

### Step 1: Create GitHub Repository (2 minutes)

1. Go to **https://github.com/new**
2. Create a new repository:
   - Name: `tms-app` (or any name you like)
   - Make it **Public** or **Private**
   - **DON'T** initialize with README
3. Copy the repository URL

### Step 2: Push Code to GitHub (1 minute)

Run these commands in your terminal:

```bash
cd /Users/sasaxena/Desktop/test

# Add your GitHub repository (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/tms-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy Backend to Railway (3 minutes)

1. Go to **https://railway.app** and sign up (free)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `tms-app` repository
4. Choose **"backend"** folder
5. Click **"Add Variables"** and add:
   ```
   PORT=4000
   NODE_ENV=production
   JWT_SECRET=<generate-random-32-char-string>
   CORS_ORIGIN=https://your-app.vercel.app
   ```
6. Click **"Deploy"**
7. **Copy your Railway URL** (e.g., `https://tms-backend-production.up.railway.app`)

### Step 4: Deploy Frontend to Vercel (3 minutes)

1. Go to **https://vercel.com** and sign up (free)
2. Click **"New Project"** → **"Import Git Repository"**
3. Select your `tms-app` repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Environment Variables"** and add:
   ```
   VITE_GRAPHQL_URI=<your-railway-url>/graphql
   ```
   (Use the Railway URL from Step 3)
6. Click **"Deploy"**
7. **Get your live URL** (e.g., `https://tms-app.vercel.app`)

### Step 5: Update CORS (1 minute)

1. Go back to **Railway dashboard**
2. Find your backend project
3. Go to **"Variables"**
4. Update `CORS_ORIGIN` to your Vercel URL from Step 4
5. Click **"Redeploy"**

---

## 🎉 DONE! Your app is live!

**Your Live URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.railway.app/graphql`

**Test it:**
- Open your Vercel URL
- Login with: **admin@tms.com** / **admin123**

---

## 🆘 Need Help?

### Option 1: Use the Helper Script
```bash
cd /Users/sasaxena/Desktop/test
./deploy-helper.sh
```

### Option 2: Use Railway CLI (Faster)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy backend
cd backend
railway login
railway init
railway up

# Get your URL
railway open
```

### Option 3: Manual Deployment
See detailed instructions in:
- `QUICK_DEPLOY.md` - Fast deployment guide
- `DEPLOYMENT.md` - Complete deployment documentation

---

## ⚡ Quick Deploy Alternative - Use Railway for Both

If you prefer to deploy everything on Railway:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend
cd backend
railway init
railway up

# Deploy frontend
cd ../frontend
railway init
railway up
```

---

## 🔑 Important Notes:

1. **JWT Secret**: Generate a secure secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **CORS**: Make sure CORS_ORIGIN matches your frontend URL exactly

3. **Free Tiers**:
   - Railway: $5/month credit (enough for small apps)
   - Vercel: Unlimited projects, 100GB bandwidth

---

## 🎯 What You Need:

1. ✅ GitHub account (to store code)
2. ✅ Railway account (for backend) - **https://railway.app**
3. ✅ Vercel account (for frontend) - **https://vercel.com**

**Total time: ~10 minutes**
**Cost: FREE (using free tiers)**

---

Would you like me to help you with any specific step? I can guide you through the process!
