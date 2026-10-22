# Free-Tier Cloud Deployment Guide
## Vercel (Frontend) + Render (Backend)

> **Cost**: 100% Free forever (No credit card required).

---

### Step 1: Push Your Code to GitHub

In your terminal or VS Code:
```bash
git init
git add .
git commit -m "Complete PropVal AI Real Estate System"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

---

### Step 2: Deploy Backend to Render (Free Web Service)

1. Go to [render.com](https://render.com) and log in with your GitHub account.
2. Click **New +** $\to$ **Web Service**.
3. Select **Build and deploy from a Git repository** and connect your repository.
4. Fill in the following settings:
   * **Name**: `propval-ai-backend` (or your choice)
   * **Region**: Any (e.g. Oregon / Singapore)
   * **Branch**: `main`
   * **Root Directory**: `Final Project/backend` (or `backend` if deploying only backend)
   * **Runtime**: `Python 3`
   * **Build Command**: `pip install -r requirements.txt`
   * **Start Command**: `gunicorn app:app`
   * **Instance Type**: **Free (512 MB RAM)**
5. Click **Deploy Web Service**.
6. Once deployed, copy your live backend URL (e.g., `https://propval-ai-backend.onrender.com`).

> [!TIP]
> **Free Tier Cold-Start Note**: Render free tier sleeps after 15 minutes of inactivity. Open your backend URL in a browser tab **5 minutes before your college presentation** to wake it up!

---

### Step 3: Deploy Frontend to Vercel (Free Edge CDN)

1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New...** $\to$ **Project**.
3. Import your GitHub repository.
4. In the configuration screen:
   * **Framework Preset**: `Vite`
   * **Root Directory**: Click *Edit* and select `Final Project/frontend` (or `frontend`)
5. Under **Environment Variables**, add:
   * **Key**: `VITE_API_URL`
   * **Value**: `https://propval-ai-backend.onrender.com` *(Paste your Render backend URL from Step 2)*
6. Click **Deploy**.
7. In ~30 seconds, your site is live at: `https://your-project.vercel.app`!

---

### Step 4: The 100% Foolproof "Viva Safety Net" (Offline Localhost Backup)

In case college Wi-Fi is slow during your viva, you can run the complete project locally on your laptop:

1. **Terminal 1 (Backend)**:
   ```bash
   cd "Final Project/backend"
   .\.venv\Scripts\python.exe app.py
   ```
2. **Terminal 2 (Frontend)**:
   ```bash
   cd "Final Project/frontend"
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser. It runs with zero internet dependency!
