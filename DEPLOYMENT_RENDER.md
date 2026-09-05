# Deploying Niljyoti Travels to Render

This project is configured for 1-click deployment on **[Render](https://render.com/)** as a high-performance **Static Site** (CDN-cached, free SSL, zero cost).

---

## 🚀 Quickest Method: Render Blueprint (1-Click Automated)

Since [`render.yaml`](./render.yaml) is already present in this repository, Render can provision everything automatically:

### Step 1: Push Code to GitHub
If you haven't pushed this code to a GitHub repository yet, run the following commands in your terminal:

```bash
# 1. Create a new repository on GitHub (e.g., 'niljyoti-rentals')
# 2. Link your local repository:
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git

# 3. Push to main:
git push -u origin main
```

---

### Step 2: Deploy on Render

1. Log in to **[dashboard.render.com](https://dashboard.render.com/)**.
2. Click the **New +** button in the top right.
3. Select **Blueprint**.
4. Connect your GitHub repository.
5. Render will automatically read `render.yaml` and configure:
   - **Service Type**: Static Site
   - **Name**: `niljyoti-car-rentals`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `./dist`
   - **SPA Rewrite Route**: `/*` → `/index.html`
6. Click **Apply**.
7. In ~45 seconds, your live production site will be active at `https://niljyoti-car-rentals.onrender.com`.

---

## 🛠️ Alternative Method: Manual Setup on Render

If you prefer to configure manually via the Render Web UI:

1. Go to **[dashboard.render.com](https://dashboard.render.com/)**.
2. Click **New +** → **Static Site**.
3. Connect your repository.
4. Fill in the deployment details:
   - **Name**: `niljyoti-car-rentals` (or your preferred name)
   - **Branch**: `main`
   - **Root Directory**: *(leave blank)*
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Scroll down to **Redirects / Rewrites** → Click **Add Rule**:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
6. Click **Create Static Site**.

---

## ⚙️ Configuration File Overview (`render.yaml`)

```yaml
services:
  - type: web
    name: niljyoti-car-rentals
    runtime: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    pullRequestPreviewsEnabled: true
    headers:
      - path: /*
        name: X-Frame-Options
        value: SAMEORIGIN
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

---

## 🔄 Automatic Continuous Deployment (CI/CD)

Whenever you push new changes to the `main` branch:
```bash
git add .
git commit -m "Update fleet details"
git push
```
Render will automatically detect the push, rebuild with Vite, and update your live site with zero downtime.
