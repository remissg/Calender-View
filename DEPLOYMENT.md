# 🚀 Deployment Guide

## GitHub Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Repository name: **Calender-View**
3. Description: "Interactive Calendar Component with 3D animations and blue/green theme"
4. Make it **Public**
5. **Do NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### 2. Push to GitHub

Run these commands in your terminal:

```powershell
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/Calender-View.git

# Push code to GitHub
git branch -M main
git push -u origin main
```

---

## Netlify Deployment

### Option 1: Deploy via Netlify Website (Recommended - Easiest)

1. **Go to [Netlify](https://www.netlify.com/)** and sign in (or create account)

2. **Click "Add new site" → "Import an existing project"**

3. **Connect to GitHub:**
   - Click "GitHub"
   - Authorize Netlify
   - Select your **Calender-View** repository

4. **Configure build settings:**
   - Branch: `main`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

5. **Wait 2-3 minutes** for deployment to complete

6. **Your site is live!** 🎉
   - Netlify will give you a URL like: `https://random-name-12345.netlify.app`
   - You can customize this in Site settings → Domain management

### Option 2: Deploy via Netlify CLI

```powershell
# Install Netlify CLI globally
npm install -g netlify-cli

# Build your project
npm run build

# Deploy to Netlify
netlify deploy

# Follow the prompts:
# - Authorize with Netlify
# - Create & configure new site
# - Publish directory: dist

# For production deployment
netlify deploy --prod
```

---

## Storybook Deployment (Optional)

### Deploy Storybook to Netlify

```powershell
# Build Storybook
npm run build-storybook

# This creates a 'storybook-static' folder
```

Then either:

**Option A: Drag & Drop**
1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag the `storybook-static` folder
3. Get instant deployment URL

**Option B: Netlify CLI**
```powershell
# Deploy storybook-static folder
netlify deploy --dir=storybook-static --prod
```

---

## 📝 Post-Deployment Checklist

### ✅ GitHub
- [ ] Repository created as **Public**
- [ ] Code pushed successfully
- [ ] README.md visible on GitHub
- [ ] All files uploaded

### ✅ Netlify (Main App)
- [ ] Site deployed successfully
- [ ] Calendar loads correctly
- [ ] 3D animations working
- [ ] Blue and green theme displaying
- [ ] Events can be created/edited/deleted
- [ ] Mobile responsive

### ✅ Storybook (Optional)
- [ ] Storybook deployed
- [ ] All 7 stories visible
- [ ] Components interactive
- [ ] Documentation readable

---

## 🔧 Troubleshooting

### Build Fails on Netlify

If deployment fails, check:

1. **Node version** - Add to `netlify.toml`:
```toml
[build.environment]
  NODE_VERSION = "18"
```

2. **Build command** - Ensure it's: `npm run build`

3. **Publish directory** - Ensure it's: `dist`

### Site Shows Blank Page

1. Check browser console for errors
2. Verify `dist` folder was created locally: `npm run build`
3. Check Netlify deploy logs for errors

### 3D Animations Not Working

- Animations require modern browsers (Chrome, Firefox, Safari, Edge)
- Check if CSS is loading properly
- Verify Tailwind config is included in build

---

## 🌐 Expected URLs

After deployment, you'll have:

- **GitHub Repository**: `https://github.com/YOUR_USERNAME/Calender-View`
- **Live Calendar**: `https://your-site-name.netlify.app`
- **Storybook** (if deployed): `https://your-storybook-name.netlify.app`

---

## 📊 Features to Test After Deployment

1. ✨ **3D Animations**
   - Floating calendar title
   - Glowing today badge
   - Hover effects on cells
   - Modal bounce-in animation

2. 🎨 **Blue and Green Theme**
   - Gradient backgrounds
   - Blue and green color palette
   - Event colors

3. 📅 **Calendar Functions**
   - Month/Week view toggle
   - Navigate between months
   - Add new events
   - Edit existing events
   - Delete events
   - Event persistence (localStorage)

4. 📱 **Responsive Design**
   - Mobile view
   - Tablet view
   - Desktop view

5. ♿ **Accessibility**
   - Keyboard navigation
   - Focus indicators
   - Screen reader support

---

## 🎉 Submission

Once deployed, share these links:

1. **GitHub Repository**: `https://github.com/YOUR_USERNAME/Calender-View`
2. **Live Demo**: `https://your-site-name.netlify.app`
3. **Storybook** (optional): `https://your-storybook-name.netlify.app`

---

## 💡 Tips

- **Custom Domain**: You can add a custom domain in Netlify settings
- **Auto Deploy**: Netlify automatically redeploys on Git push
- **Deploy Previews**: Pull requests get preview URLs automatically
- **Analytics**: Enable Netlify Analytics to track visitors
- **Forms**: Netlify can handle forms without backend code

---

Good luck with your submission! 🚀✨
