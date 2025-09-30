# How to Deploy Your Astro Blog to GitHub Pages

This guide will walk you through the process of deploying your new Astro blog to GitHub Pages using GitHub Actions.

## 1. Update Your Astro Configuration

Before you can deploy, you need to update the `astro.config.mjs` file with your specific GitHub Pages URL.

- Open `astro.config.mjs` in your code editor.
- Replace `<YOUR_USERNAME>` with your GitHub username.
- Replace `<YOUR_REPO_NAME>` with the name of your GitHub repository.

For example, if your username is `jane-doe` and your repository is `my-awesome-blog`, the configuration should look like this:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
// ... other imports

export default defineConfig({
  site: 'https://jane-doe.github.io',
  base: '/my-awesome-blog',
  // ... other configurations
});
```

## 2. Create the GitHub Actions Workflow

GitHub Actions will automatically build and deploy your site whenever you push changes to your `main` branch.

### a. Create the Workflow Directory

- In the root of your project, create a new directory named `.github`.
- Inside the `.github` directory, create another new directory named `workflows`.

### b. Create the Workflow File

- Inside the `.github/workflows` directory, create a new file named `deploy.yml`.
- Copy and paste the following content into `deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  # Trigger the workflow every time you push to the `main` branch
  push:
    branches: [main]
  # Allows you to run this workflow manually from the Actions tab on GitHub.
  workflow_dispatch:

# Allow this job to clone the repo and create a page deployment
permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository
        uses: actions/checkout@v4
      - name: Install, build, and upload your site
        uses: withastro/action@v2
        with:
          # If you're using a package manager other than pnpm,
          # change this to 'npm' or 'yarn'.
          package-manager: pnpm@latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 3. Configure Your Repository Settings

Finally, you need to configure your GitHub repository to use the artifacts from the `deploy` job.

- Go to your repository on GitHub.
- Click on the **Settings** tab.
- In the left sidebar, click on **Pages**.
- Under "Build and deployment", select **GitHub Actions** as the source.

## 4. Push Your Changes

Commit all your changes and push them to the `main` branch on GitHub.

```bash
git add .
git commit -m "Initial commit of my new blog"
git push origin main
```

After you push your changes, you can go to the **Actions** tab in your GitHub repository to see the workflow running. Once it completes, your blog will be live at the URL you configured in `astro.config.mjs`.

That's it! Your blog is now deployed and will automatically update whenever you push new changes.