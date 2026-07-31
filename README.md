# TML Website

This folder contains the standalone, static official website for Theology Modeling Language. It requires no build step, package manager, or backend: open `index.html` directly in a browser or deploy this folder to any static hosting provider.

## Quick customization

- **GitHub and release links:** search `index.html` for `REPLACE-WITH-YOUR-ORG`.
- **Site domain and sharing metadata:** search `index.html` for `REPLACE-WITH-YOUR-DOMAIN`.
- **Documentation link:** search `index.html` for `REPLACE-WITH-YOUR-DOCUMENTATION`.
- **Screenshots:** add optimized files to `images/` and follow the gallery comment in `index.html`.
- **YouTube videos:** replace the `REPLACE_WITH_VIDEO_ID_*` values in `index.html`.
- **Contact address:** search `index.html` for `TheologyML@outlook.com`.
- **Main logo and favicon:** replace `assets/tml-logo.png` if the official TML mark changes. The site uses this supplied logo in the header, hero, footer, and browser icon.
- **Social image:** update `assets/social-preview.svg` when final sharing artwork is available.

## Structure

```text
website/
├── assets/       Official TML logo and social-sharing placeholder
├── css/          Responsive site styles
├── images/       Future product screenshots
├── js/           Mobile menu, animation, and lazy video behavior
├── videos/       Notes for future hosted video content
└── index.html    The complete landing page
```

## Deployment

Upload the contents of this `website/` folder to GitHub Pages, Netlify, Cloudflare Pages, Azure Static Web Apps, or any standard static web server. The site has only relative local asset paths, so no configuration is necessary.
