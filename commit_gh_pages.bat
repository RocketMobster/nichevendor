@echo off
echo Starting commit process for GitHub Pages setup...

:: Stage all files
git add next.config.js
git add package.json
git add .github/workflows/github-pages.yml
git add .nojekyll
git add docs/github-pages-deployment.md
git add utils/linkUtils.ts

:: Create commit
git commit -m "ci: Configure GitHub Pages deployment

- Add static export configuration to Next.js
- Create GitHub Actions workflow for automatic deployment
- Add deployment documentation
- Create link utilities for path handling
- Add .nojekyll file for GitHub Pages"

echo.
echo Commit created successfully!
echo.
echo To push to GitHub, run:
echo git push origin main
echo.
echo After pushing, GitHub Actions will automatically deploy the site to:
echo https://rocketmobster.github.io/nichevendor/
echo.
