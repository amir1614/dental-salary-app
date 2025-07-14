# 🚀 Backend Deployment Guide

This guide will help you deploy your backend to Render and update your frontend to use the deployed backend.

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **Node.js**: Ensure you have Node.js installed locally

## 🔧 Step 1: Deploy Backend to Render

### 1.1 Create Render Account
1. Go to [https://dashboard.render.com/](https://dashboard.render.com/)
2. Sign up with your GitHub account
3. Complete the verification process

### 1.2 Create New Web Service
1. Click "New +" button
2. Select "Web Service"
3. Connect your GitHub account if not already connected
4. Select your `dental-salary-app` repository

### 1.3 Configure the Service
- **Name**: `dental-salary-app-backend` (or any name you prefer)
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Plan**: Free

### 1.4 Advanced Settings (Optional)
- **Environment Variables**: Add any if needed
- **Health Check Path**: `/api/health`

### 1.5 Deploy
1. Click "Create Web Service"
2. Wait for deployment (usually 2-5 minutes)
3. Copy your service URL (e.g., `https://dental-salary-app-backend.onrender.com`)

## 🔧 Step 2: Update Frontend Configuration

### 2.1 Update Backend URL
Run this command with your actual Render URL:

```bash
npm run update-backend https://your-actual-render-url.onrender.com
```

**Example:**
```bash
npm run update-backend https://dental-salary-app-backend.onrender.com
```

### 2.2 Verify Configuration
Check that `src/config/api.ts` now has your Render URL:

```typescript
production: {
  baseURL: 'https://your-actual-render-url.onrender.com',
}
```

## 🔧 Step 3: Deploy Updated Frontend

### 3.1 Commit and Push Changes
```bash
git add .
git commit -m "Update backend URL for production deployment"
git push origin main
```

### 3.2 Deploy to GitHub Pages
```bash
npm run deploy
```

## 🔧 Step 4: Test Your Deployment

### 4.1 Test Frontend
1. Visit your GitHub Pages URL: `https://amir1614.github.io/dental-salary-app`
2. Test the salary submission form
3. Test the admin panel login
4. Verify all API calls work

### 4.2 Test Backend Directly
1. Visit your Render URL + `/api/health`
2. Should return: `{"status":"OK","timestamp":"..."}`

## 🛠️ Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Check that your backend allows requests from your frontend domain
   - Update CORS settings in `backend/server.js` if needed

2. **404 Errors**
   - Verify your Render service is running
   - Check the service logs in Render dashboard

3. **Database Issues**
   - Render uses ephemeral storage, so data may reset
   - Consider using a persistent database for production

4. **Environment Variables**
   - Add any needed environment variables in Render dashboard
   - Update your backend code to use `process.env` variables

## 🔧 Alternative Backend Hosts

If Render doesn't work for you, try these alternatives:

### Railway
1. Go to [railway.app](https://railway.app)
2. Connect GitHub and deploy from `backend` directory
3. Use the provided URL

### Fly.io
1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Run `fly launch` in the `backend` directory
3. Follow the prompts

### Glitch
1. Go to [glitch.com](https://glitch.com)
2. Create new project and import your `backend` folder
3. Use the provided URL

## 📊 Monitoring

### Render Dashboard
- Monitor your service health
- View logs and performance
- Scale if needed

### GitHub Pages
- Check deployment status in repository settings
- View build logs if needed

## 🎉 Success!

Your full-stack dental salary app is now deployed:
- **Frontend**: `https://amir1614.github.io/dental-salary-app`
- **Backend**: `https://your-backend-url.onrender.com`

Both are live and connected! 🚀 