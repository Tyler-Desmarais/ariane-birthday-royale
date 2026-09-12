# Ariane's Birthday Royale 🎂🎮

A Fortnite-lobby-themed interactive birthday page. Boot screen → character locker → island loot hunt → Victory Royale finale.

## Run it locally

Just open `index.html` in a browser, or serve the folder with any static server.

## Adding the real art

Drop these files into `assets/` (exact filenames) and they'll automatically replace the placeholders — no code changes needed:

- `assets/ariane-skin.png` — the custom "skin" art of Ariane (lab coat, turquoise crocs with pins visible)
- `assets/tchoupie.png` — photo/art of Tchoupie, the black goldendoodle sidekick

Recommended size: roughly 3:4 portrait for the skin, square for Tchoupie. PNG or JPG both work.

## Customizing the jokes/messages

Open `script.js` and edit the `LOOT` array at the top — each item has a `name`, `icon` (emoji), `rarity` (`rare`/`epic`/`legendary`), and `message` (the birthday joke/inside-reference shown when it's collected). Positions (`x`/`y`, in %) control where the chest sits on the island.

The final birthday message on the Victory Royale screen is in `index.html` inside `.birthday-message`.

## Deploying

Easiest free option: GitHub Pages.
1. Push this repo to GitHub.
2. In the repo settings → Pages, set source to the `main` branch, root folder.
3. Share the generated `https://<username>.github.io/<repo>/` link.
