# Solent Marine Consultants — Static HTML Website

This project is a clean static conversion of the supplied SMC website.

## Stack
- HTML5
- CSS3
- Vanilla JavaScript
- No WordPress, Elementor, PHP, database, npm, or build tools required

## Preview locally
You can open `index.html` directly, or (recommended) run a small local server:

```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

## Structure
- `index.html` — homepage
- page folders (for example `about-us/index.html`) — internal pages
- `assets/css/style.css` — all styling
- `assets/js/main.js` — navigation, reveal animations, scroll effects, and contact form helper
- `assets/images/` — original SMC website images and logo

## Contact form
Because this is a fully static HTML project, the contact form uses an email-client fallback. For production server-side form submission, connect the form to your preferred API/PHP/backend endpoint.

## Design notes
The UI uses the supplied reference direction while preserving SMC's content. Text is kept outside image surfaces, whitespace and card alignment have been standardized, and motion respects `prefers-reduced-motion`.
