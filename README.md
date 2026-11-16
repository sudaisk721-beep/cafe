# Cafe de Chao

A static cafe website (HTML, CSS, JavaScript) with a menu filter and a demo shopping bag.

## Project structure

```
cafe-de-chao/
├── index.html      # Home page
├── menu.html       # Menu with filters + add to bag
├── about.html      # Our story
├── style.css       # All styling (shared by every page)
├── script.js       # Nav, cart, filters, checkout (shared)
└── images/
    ├── cafe-banner.png     # logo shown in the header
    └── cafe-exterior.png   # hero + about images
```

## Run locally

Open `index.html` in a browser, or use VS Code's Live Server extension.

## Collaborating

1. Pull before you start: `git pull origin main`
2. Create a branch: `git checkout -b feature/your-change`
3. Commit small changes: `git add . && git commit -m "Describe change"`
4. Push: `git push origin feature/your-change`
5. Open a Pull Request into `main` on GitHub.

Rule of thumb: one person edits one file at a time, and never commit directly to `main` once the site is live.

## Hosting (GitHub Pages)

Repo -> Settings -> Pages -> Source: "Deploy from a branch" -> Branch: `main` / `/ (root)`.
The site appears at `https://<your-username>.github.io/<repo-name>/`.
