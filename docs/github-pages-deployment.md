# GitHub Pages Deployment Guide for NicheVendor CRM

This document explains how the NicheVendor CRM application is configured for GitHub Pages deployment.

## Configuration Details

The application has been set up to be deployed to GitHub Pages with the following configurations:

1. **Static Export** - The application is configured to generate static HTML/JS/CSS files that can be served by GitHub Pages.
2. **Base Path** - Assets are configured to load correctly from the `/nichevendor` path on GitHub Pages.
3. **Automated Deployment** - GitHub Actions will automatically deploy the app when changes are pushed to the main branch.

## Local Development

Your local development workflow remains unchanged:

```bash
# Start development server
npm run dev

# Build the project locally
npm run build

# Preview the production build locally
npm run start
```

## Deployment Process

### Automatic Deployment

The app will deploy automatically to GitHub Pages whenever you push to the main branch, thanks to the GitHub Actions workflow.

### Manual Deployment

If you need to deploy manually:

1. Build and export the site:
   ```bash
   npm run deploy
   ```

2. Push the changes to the gh-pages branch:
   ```bash
   # If you have the gh-pages package installed:
   npx gh-pages -d out
   ```

## Accessing the Deployed Site

Once deployed, your site will be available at:
`https://rocketmobster.github.io/nichevendor/`

## Important Notes

1. **Data Storage**: The application uses local storage for data persistence, which is separate for each user visiting the site.

2. **Navigation**: Internal links use Next.js's Link component, which handles the base path correctly in production.

3. **Assets**: All assets are configured to load with the correct prefix in production.

## Troubleshooting

If you encounter any issues with the deployed site:

1. Check that GitHub Pages is enabled in your repository settings.
2. Verify that the site is being deployed from the `gh-pages` branch.
3. Check the GitHub Actions tab for any deployment errors.
4. Clear browser cache if you're seeing outdated content.
