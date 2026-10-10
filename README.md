# DOMIDELT

Brand website for **DOMIDELT / Project Delta: Diagnose. Design. Deliver.**

A plain static site (HTML + CSS, no build step), so it deploys on Cloudflare Pages in seconds.

## Files

- `index.html`: the whole site
- `styles.css`: all styling
- `project-profit/`, `project-360/`, `project-next/`, `project-edge/`: the four Project pages, each with its own `index.html`
- `assets/`: logo files (full lockup, mono D, wordmark, white versions, favicons)

## Put it on GitHub

1. Create a new empty repository on github.com (for example `domidelt-website`). Do not add a README there.
2. In this folder, run:

```bash
git init
git add .
git commit -m "Initial DOMIDELT site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/domidelt-website.git
git push -u origin main
```

## Deploy on Cloudflare Pages

1. Log in to the Cloudflare dashboard and go to **Workers & Pages**.
2. Click **Create** and choose **Pages**, then **Connect to Git**.
3. Authorise GitHub and select the `domidelt-website` repository.
4. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`
5. Click **Save and Deploy**. You get a `*.pages.dev` URL straight away.

From now on, every `git push` to `main` redeploys the site automatically.

## Connect your domain

In your Pages project, open **Custom domains**, then **Set up a custom domain**, and enter `domidelt.com` (or your domain). If the domain is already on Cloudflare DNS, the records are added for you.

## Things to change before launch

- Contact details (phones and `hello@domidelt.com`) appear in `index.html` and the four project pages. Search for the number or email to change them everywhere.
- Project pages: all four are built. To add another later (for example Project AI), copy a project folder and edit it, then add a card to `index.html`.

## Adding a new Project later

Copy one `<article class="card project">` block in `index.html`, change the name, subtitle and list. The layout adapts automatically.
