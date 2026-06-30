# Girish Kumar — Portfolio

A single-page, terminal/ops-themed portfolio built with vanilla HTML, CSS, and JavaScript.
No build step, no dependencies — GitHub Pages serves the files directly.

```
girish-portfolio/
├── index.html        # all content (edit the marked sections)
├── styles.css        # design system / theme
├── script.js         # typing effect, particle canvas, nav, scroll reveal
├── .nojekyll         # tells GitHub Pages to serve files as-is
└── public/
    └── Girish_Kumar_Resume.pdf   # ← add your resume here
```

## Before you push — edit these

Search `index.html` for the `EDIT:` comments and fix:

1. **LinkedIn URL** — replace `https://www.linkedin.com/in/girishchhonkar/` with your real profile (appears 3×).
2. **Contact email** — currently your Freshworks address; swap for the email you want recruiters to use (appears 2×).
3. **GitHub handle** — confirm `github.com/girishchhonkar19` is correct, and make sure those project repos have at least a README each before linking.
4. **Experience** — verify roles, add **dates**, and adjust bullet points (Freshworks / Zuora / CloudNexa) to match your resume.
5. **Resume PDF** — drop `Girish_Kumar_Resume.pdf` into `public/`.

## Run locally

Just open `index.html` in a browser, or serve it:

```bash
cd girish-portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages (repo: `girishchhonkar19.github.io`)

1. Create a new repo at https://github.com/new
   - Name: `girishchhonkar19.github.io`  ·  Public  ·  don't add a README (this folder has one)
2. From this folder:

   ```bash
   rm -rf .git          # start clean (clears the sandbox-created git state)
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/girishchhonkar19/girishchhonkar19.github.io.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: `main`  ·  folder: `/ (root)`  ·  Save
   - (For a `username.github.io` repo this is often on by default — just confirm it.)
4. Wait ~1 minute. Your site goes live at the clean root URL:

   ```
   https://girishchhonkar19.github.io
   ```

## Optional: attach a custom domain later (e.g. girishkumar.dev)

No rebuild needed. Once you own a domain:

1. Create a file named `CNAME` (no extension) in this folder containing only your domain, e.g.:
   ```
   girishkumar.dev
   ```
2. At your registrar, add DNS records pointing to GitHub Pages:
   - `A` records for the apex domain → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - or a `CNAME` record for `www` → `girishchhonkar19.github.io`
3. Commit + push the `CNAME` file, then set the domain under **Settings → Pages → Custom domain** and enable **Enforce HTTPS**.

## Use it in your application (Q6)

```
Portfolio: https://girishchhonkar19.github.io
GitHub:    https://github.com/girishchhonkar19
```
