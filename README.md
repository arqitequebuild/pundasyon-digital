# Pundasyon Digital

A lightweight, responsive static landing page for Pundasyon Digital.

## Stack
- HTML
- CSS
- Vanilla JavaScript
- No build step or framework required

## Run locally
Open `index.html` in a browser, or use a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Other**.
4. Build command: leave blank.
5. Output directory: `.` (project root).
6. Deploy.

Vercel can then create preview deployments for branches and production deployments from the connected production branch.

## Before launch
- Replace the provisional SVG mark with the approved final vector logo if the final logo artwork differs.
- Confirm the Facebook contact destination.
- Add real portfolio projects when available; no fictional client work is presented here.
- Add a custom domain when ready.
- For Cloudinary, upload `assets/images/coastal-resort-hero.webp` and replace the CSS asset URL with the Cloudinary delivery URL if desired.

## Design notes
The hero photograph is cropped from the supplied Pundasyon Digital cover image. All headline and supporting text are live HTML for responsive behavior and accessibility.
