# 🚀 Deployment Guide

This guide will help you deploy your dental salary app to GitHub and GitHub Pages.

## 📋 Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Git**: Install Git on your computer
3. **Node.js**: Ensure Node.js is installed

## 🔧 Step 1: Prepare Your Repository

### 1.1 Initialize Git Repository
```bash
cd dental-salary-app
git init
```

### 1.2 Add All Files
```bash
git add .
```

### 1.3 Make Initial Commit
```bash
git commit -m "Initial commit: Dental salary comparison platform"
```

## 🌐 Step 2: Create GitHub Repository

### 2.1 Create New Repository
1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it: `dental-salary-app`
5. Make it **Public** (required for GitHub Pages)
6. **Don't** initialize with README (we already have one)
7. Click "Create repository"

### 2.2 Update Homepage URL
Edit `package.json` and replace `yourusername` with your actual GitHub username:

```json
{
  "homepage": "https://YOUR_USERNAME.github.io/dental-salary-app"
}
```

### 2.3 Connect to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/dental-salary-app.git
git branch -M main
git push -u origin main
```

## 🎯 Step 3: Deploy to GitHub Pages

### 3.1 Build the Project
```bash
npm run build
```

### 3.2 Deploy to GitHub Pages
```bash
npm run deploy
```

### 3.3 Configure GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch
6. Click "Save"

## 🔄 Step 4: Update Backend for Production

Since GitHub Pages only serves static files, you'll need to deploy the backend separately. Here are your options:

### Option A: Deploy Backend to Heroku
1. Create a Heroku account
2. Install Heroku CLI
3. Deploy the backend folder to Heroku
4. Update frontend API endpoints to point to Heroku URL

### Option B: Use a Free Backend Service
- **Railway**: Free tier available
- **Render**: Free tier available
- **Vercel**: Free tier available

### Option C: Use GitHub Pages with Mock Data
For now, you can use the app with mock data by commenting out the API calls.

## 🔧 Step 5: Update API Endpoints

Once your backend is deployed, update the API endpoints in your React components:

```javascript
// Replace localhost:3001 with your deployed backend URL
const API_BASE_URL = 'https://your-backend-url.com';
```

## 📝 Step 6: Final Steps

### 6.1 Update README
- Replace `yourusername` with your actual GitHub username
- Update the repository URL in the README

### 6.2 Test Your Deployment
1. Visit your GitHub Pages URL
2. Test all features
3. Check that the admin panel works
4. Verify form submissions work

### 6.3 Share Your Project
- Add a link to your live site in your GitHub profile
- Share on social media
- Add to your portfolio

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check for TypeScript errors
   - Ensure all dependencies are installed
   - Run `npm install` again

2. **GitHub Pages Not Loading**
   - Check the gh-pages branch exists
   - Verify the homepage URL in package.json
   - Wait a few minutes for deployment

3. **API Calls Fail**
   - Check CORS settings on your backend
   - Verify the API URL is correct
   - Ensure your backend is running

## 🎉 Success!

Your dental salary app is now live at:
`https://YOUR_USERNAME.github.io/dental-salary-app`

## 📞 Need Help?

- Check GitHub Pages documentation
- Review the React deployment guide
- Open an issue in your repository

---

**Happy Deploying! 🚀** 