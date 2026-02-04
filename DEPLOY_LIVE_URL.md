# 🌐 GET YOUR LIVE URL - QUICK GUIDE

## ✅ Current Status
- ✅ Code is ready
- ✅ Authentication working
- ✅ Backend API functional
- ✅ Frontend UI complete

## 🚀 3 Simple Steps to Deploy

### **STEP 1: Push to GitHub** (2 minutes)

Your repository: `https://github.com/ssaxena2609/tms-app`

```bash
cd /Users/sasaxena/Desktop/test

# Push to GitHub
git push -u origin main
```

**If you get authentication error:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name: "TMS Deploy"
4. Select scope: **repo** (full control)
5. Copy the token
6. Use as password when pushing

---

### **STEP 2: Deploy Backend to Railway** (3 minutes)

**A. Sign Up & Create Project:**
1. Go to: **https://railway.app**
2. Click **"Login with GitHub"** (free account)
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose: **ssaxena2609/tms-app**
6. Select folder: **backend**

**B. Add Environment Variables:**

Click "Variables" and add these:

```
PORT=4000
NODE_ENV=production
JWT_SECRET=e8f9a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8
CORS_ORIGIN=https://your-app.vercel.app
```

**C. Deploy:**
- Click "Deploy"
- Wait ~2 minutes
- **Copy your Railway URL** (e.g., `https://tms-backend-production.up.railway.app`)

---

### **STEP 3: Deploy Frontend to Vercel** (3 minutes)

**A. Sign Up & Import:**
1. Go to: **https://vercel.com**
2. Click **"Login with GitHub"** (free account)
3. Click **"New Project"**
4. Click **"Import Git Repository"**
5. Select: **ssaxena2609/tms-app**

**B. Configure Build:**
- Framework Preset: **Vite**
- Root Directory: **frontend**
- Build Command: `npm run build`
- Output Directory: `dist`

**C. Add Environment Variable:**

Click "Environment Variables" and add:

```
VITE_GRAPHQL_URI=https://your-railway-url.railway.app/graphql
```

(Use the Railway URL from Step 2)

**D. Deploy:**
- Click "Deploy"
- Wait ~2 minutes
- **Get your live URL!** (e.g., `https://tms-app.vercel.app`)

---

### **STEP 4: Update CORS** (1 minute)

1. Go back to **Railway dashboard**
2. Open your backend project
3. Click **"Variables"**
4. Update `CORS_ORIGIN` to your Vercel URL from Step 3
5. Click **"Redeploy"**

---

## 🎉 **YOU'RE LIVE!**

**Your Live URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.railway.app/graphql`

**Test it:**
1. Open your Vercel URL
2. Login with: **admin@tms.com** / **admin123**
3. Explore all features!

---

## 📱 **Alternative: One Platform (Easier)**

If you want everything on one platform:

### **Option A: Deploy Both on Render.com**
```bash
1. Go to https://render.com
2. Sign up with GitHub
3. Create two services:
   - Backend: Node.js (from GitHub)
   - Frontend: Static Site (from GitHub)
4. Configure environment variables
5. Deploy both!
```

### **Option B: Use Railway for Both**
```bash
1. Deploy backend (as above)
2. Deploy frontend:
   - New Project → Deploy from GitHub
   - Select 'frontend' folder
   - Add VITE_GRAPHQL_URI variable
   - Deploy!
```

---

## 🐛 **Troubleshooting**

### Issue: Can't push to GitHub
**Solution:** Use Personal Access Token
```bash
# Instead of password, paste your token
Username: ssaxena2609
Password: <paste-your-github-token>
```

### Issue: Railway deployment fails
**Solution:** Check logs
- Click on deployment
- Check "Logs" tab
- Look for errors

### Issue: Frontend shows "Failed to fetch"
**Solution:** Verify environment variables
1. Check VITE_GRAPHQL_URI matches Railway URL
2. Check CORS_ORIGIN matches Vercel URL
3. Redeploy both services

### Issue: Login doesn't work
**Solution:** Check JWT secret
- Make sure JWT_SECRET is at least 32 characters
- Don't use special characters that might break
- Redeploy backend

---

## ⚡ **Super Quick Deploy (CLI)**

If you have Railway and Vercel CLI installed:

```bash
# Backend
cd backend
railway login
railway init
railway up
railway open  # Copy URL

# Frontend  
cd ../frontend
vercel login
vercel --prod
# When prompted, add VITE_GRAPHQL_URI
```

---

## 📊 **Free Tier Limits**

**Railway Free Tier:**
- $5/month credit
- 512MB RAM
- Good for MVP/Demo

**Vercel Free Tier:**
- Unlimited projects
- 100GB bandwidth/month
- Perfect for frontend

---

## 🎯 **Next Steps After Deployment**

1. **Custom Domain** (Optional):
   - Vercel: Settings → Domains
   - Add your custom domain

2. **Monitoring**:
   - Railway: Built-in logs
   - Vercel: Analytics dashboard

3. **Database** (Future):
   - Add PostgreSQL on Railway
   - Update backend to use database

---

## ✅ **Deployment Checklist**

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] CORS updated with correct URLs
- [ ] Live URL working
- [ ] Login tested
- [ ] All features working

---

**Need help? Run the interactive script:**
```bash
cd /Users/sasaxena/Desktop/test
./deploy-live.sh
```

**Your app will be live in ~10 minutes!** 🚀
