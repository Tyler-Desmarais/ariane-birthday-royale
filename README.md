# Ariane's Birthday Royale 🎂🎮

A Fortnite-lobby-themed interactive birthday page. Boot screen → character locker → island loot hunt → Victory Royale finale.

## Run it locally

Just open `index.html` in a browser, or serve the folder with any static server.

## Character art

`assets/ariane-skin.svg` and `assets/tchoupie.svg` are hand-built vector illustrations (chemist lab coat + goggles + flask, turquoise crocs with pins, and Tchoupie the black goldendoodle sidekick). They're plain SVG, so they're easy to tweak by hand or in any vector editor.

Want to swap in different art instead? Drop a replacement file into `assets/` — any of these filenames work and will be picked up automatically, no code changes needed:

- `assets/ariane-skin.svg` / `.png` / `.jpg` — just update the `src` in `index.html` (`#ariane-skin-img`) if you change the extension
- `assets/tchoupie.svg` / `.png` / `.jpg` — same, via `#tchoupie-img`

Recommended size: roughly 3:4 portrait for the skin, square for Tchoupie.

## Customizing the jokes/messages

Open `script.js` and edit the `LOOT` array at the top — each item has a `name`, `icon` (emoji), `rarity` (`rare`/`epic`/`legendary`), and `message` (the birthday joke/inside-reference shown when it's collected). Positions (`x`/`y`, in %) control where the chest sits on the island.

The final birthday message on the Victory Royale screen is in `index.html` inside `.birthday-message`.

## Deploying

Easiest free option: GitHub Pages.
1. Push this repo to GitHub.
2. In the repo settings → Pages, set source to the `main` branch, root folder.
3. Share the generated `https://<username>.github.io/<repo>/` link.
