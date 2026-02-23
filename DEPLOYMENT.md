# Deployment Guide - Animal Health Advisory React App

## Local Development Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- A code editor (VS Code recommended)

### Installation Steps

1. **Clone or Extract the Project**
```bash
cd animal-health-advisory
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Development Workflow

```bash
# Start dev server
npm run dev

# In another terminal, you can:
# - Edit components and see hot reload
# - View changes immediately
# - Check console for errors
```

## Building for Production

### Create Production Build

```bash
npm run build
```

This generates an optimized build in the `dist/` folder with:
- Minified JavaScript
- Optimized CSS
- Image optimization
- Tree-shaking to remove unused code

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally to verify everything works.

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)

Vercel is the creator of Next.js and Vite, making it ideal for this app.

#### Using Vercel CLI

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

Follow the prompts to:
- Log in to Vercel
- Select project settings
- Deploy

#### Using Vercel Web Interface

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

**Advantages:**
- ✅ Zero-config deployment
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Environment variables management
- ✅ Free tier available
- ✅ Automatic rollbacks

### Option 2: Deploy to Netlify

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect Netlify**
- Go to [netlify.com](https://netlify.com)
- Click "New site from Git"
- Select your repository
- Configure build settings:
  - **Build command:** `npm run build`
  - **Publish directory:** `dist`
- Click "Deploy"

**Advantages:**
- ✅ Free SSL certificates
- ✅ Easy form handling
- ✅ Serverless functions
- ✅ Great free tier

### Option 3: Deploy to GitHub Pages

1. **Update package.json**
```json
{
  "homepage": "https://yourusername.github.io/animal-health-advisory"
}
```

2. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

3. **Add deploy scripts**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. **Deploy**
```bash
npm run deploy
```

### Option 4: Deploy to Your Own Server

#### Using Node.js + Express

1. **Build the app**
```bash
npm run build
```

2. **Create server.js**
```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
```

3. **Deploy to server**
```bash
# Copy dist folder to server
scp -r dist/ user@server:/app/

# SSH into server
ssh user@server

# Start the app
pm2 start server.js
```

#### Using Docker

1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Build and run**
```bash
docker build -t animal-health-app .
docker run -p 80:80 animal-health-app
```

## Environment Variables

Create a `.env` file in the project root for environment-specific configuration:

```env
# API Configuration
VITE_API_URL=https://api.example.com
VITE_API_KEY=your_api_key_here

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PAYMENTS=false

# App Settings
VITE_APP_NAME=AnimalHealth Advisory
VITE_APP_VERSION=1.0.0
```

Access in your code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

### Environment Variable Best Practices

- ✅ Never commit `.env` files to git
- ✅ Use `.env.example` to document required variables
- ✅ Keep secrets separate per environment
- ✅ Use different keys for dev/staging/production

## Pre-Deployment Checklist

- [ ] All components tested locally
- [ ] No console errors or warnings
- [ ] API endpoints configured
- [ ] Environment variables set
- [ ] Build completes successfully: `npm run build`
- [ ] Preview build works: `npm run preview`
- [ ] Mobile responsive design tested
- [ ] All routes working correctly
- [ ] Performance optimized (check Lighthouse)
- [ ] Security reviewed (no exposed secrets)
- [ ] Documentation updated
- [ ] Git repository clean (committed all changes)

## Performance Optimization

### Before Deployment

1. **Run Lighthouse Audit**
   - Open DevTools → Lighthouse
   - Run audit for Performance, Accessibility, Best Practices, SEO
   - Fix issues above 80 score

2. **Check Build Size**
```bash
npm run build
# Check dist/ folder size
```

3. **Analyze Bundle**
```bash
npm install --save-dev @vitejs/plugin-visualize
# Add to vite.config.js and check bundle composition
```

### Optimization Tips

- ✅ Code splitting for routes
- ✅ Image optimization
- ✅ Lazy loading components
- ✅ Minify CSS/JS
- ✅ Remove unused dependencies
- ✅ Cache static assets
- ✅ Compress resources (gzip)

## Monitoring & Logging

### Set Up Error Tracking

Option 1: Sentry
```bash
npm install @sentry/react @sentry/tracing
```

Option 2: LogRocket
```bash
npm install logrocket
```

### Enable Analytics

Add Google Analytics:
```jsx
<!-- In index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## Scaling Considerations

As your app grows:

1. **Database**
   - Add backend database (PostgreSQL, MongoDB)
   - Implement caching (Redis)
   - Set up database backups

2. **API**
   - Create RESTful/GraphQL API
   - Implement rate limiting
   - Add API versioning

3. **Infrastructure**
   - Use CDN for static assets
   - Implement load balancing
   - Set up monitoring/alerts

4. **DevOps**
   - CI/CD pipeline (GitHub Actions, GitLab CI)
   - Automated testing
   - Staging environment
   - Blue-green deployments

## Troubleshooting

### App Not Loading

1. Check browser console for errors
2. Verify build completed: `npm run build`
3. Check if correct port is open
4. Clear browser cache

### Build Fails

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routes Not Working

- Ensure React Router is configured
- Check that all routes are defined
- Verify server redirects 404 to index.html

### Styling Issues

- CSS Modules not loading: Check import syntax
- Global styles missing: Ensure globals.css imported in main.jsx
- Responsive issues: Check media queries

### Performance Issues

- Large bundle: Run build analysis
- Slow API: Check network tab in DevTools
- Memory leaks: Use React DevTools Profiler

## After Deployment

### Verify

1. Test all routes work
2. Check responsive design on mobile
3. Verify API connections
4. Test forms and submissions
5. Check performance (Lighthouse)
6. Ensure HTTPS is enabled

### Monitor

- Set up error tracking
- Monitor performance metrics
- Track user analytics
- Monitor server resources

### Maintain

- Keep dependencies updated: `npm update`
- Fix security vulnerabilities: `npm audit fix`
- Monitor and fix issues
- Plan future enhancements

## Continuous Integration/Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Quick Deploy Checklist by Provider

### ✅ Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### ✅ Netlify
1. Push to GitHub
2. Connect repository on netlify.com
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### ✅ GitHub Pages
```bash
npm run deploy
```

### ✅ Docker
```bash
docker build -t app .
docker run -p 80:80 app
```

## Support & Resources

- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev
- **React Router:** https://reactrouter.com
- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com

## Success!

Your application is now deployed and accessible to users! 🎉

For questions or issues, refer to the documentation files:
- README.md
- QUICK_START.md
- PROJECT_STRUCTURE.md
- BUILD_SUMMARY.md
