# Connecting NicheVendor CRM to GitHub

Follow these steps to connect your local repository to GitHub.

## Prerequisites

1. Make sure you have a GitHub account
2. Ensure Git is installed and configured on your computer
3. You have already run the initial commit locally (already done)

## Creating a GitHub Repository

1. Go to [GitHub](https://github.com) and log in to your account
2. Click on the "+" icon in the upper right corner and select "New repository"
3. Fill in the repository details:
   - Name: `nichevendor`
   - Description: `NicheVendor CRM - A mobile-first app for artists, crafters, and vendors`
   - Choose either Public or Private
   - Do NOT initialize with README, .gitignore, or license (since we already have these)
4. Click "Create repository"

## Connecting Your Local Repository

After creating the repository, GitHub will show instructions. Follow the "push an existing repository" section:

```bash
# Add the remote repository
git remote add origin https://github.com/yourusername/nichevendor.git

# Push your changes to GitHub
git push -u origin master
```

Replace `yourusername` with your actual GitHub username.

## Using GitHub Desktop (Alternative)

If you prefer a graphical interface:

1. Install [GitHub Desktop](https://desktop.github.com/)
2. Open GitHub Desktop and add the local repository
3. Publish the repository to your GitHub account

## Using VS Code Git Integration (Alternative)

VS Code has built-in Git support:

1. Open the Source Control view (Ctrl+Shift+G)
2. Click on "Publish to GitHub"
3. Follow the prompts to publish your repository

## Next Steps After Connection

Once connected:

1. Set up GitHub Actions for CI/CD (optional)
2. Configure branch protection rules (optional)
3. Add collaborators if needed
4. Create project boards to track development tasks
