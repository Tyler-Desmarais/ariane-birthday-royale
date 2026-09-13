# Ariane's Birthday Royale 🎂🎮

A fake Fortnite lobby (in French) built as a birthday surprise for Ariane.

**Flow:** Fortnite lobby with Ariane's character + Tchoupie the sidekick → tap **PRÊT** → matchmaking → battle bus → skydive → **VICTOIRE ROYALE** birthday screen.

Built phone-first (portrait), works on desktop too.

## Run it locally

Open `index.html` in a browser, or serve the folder with any static server.

## Character art

`assets/ariane-skin.png` is the "The Chemist" outfit render (Ariane + Tchoupie), background-removed and cropped tight. Ariane and the dog are a single image because they overlap in the source art and can't be split cleanly — so the two name tags are positioned as percentages over that image in `style.css`:

- `.tag-ariane` — `left: 58%` (over her head)
- `.tag-pet` — `left: 24%` (under the dog)

If you ever swap the PNG for a differently-composed one, those two percentages are what you'd re-tune.

## ✏️ TODO — the birthday message

The placeholder text lives in `index.html`, in `<div class="victory-message">`. Replace the two `<p>` lines with the real message.

Other easy edits in `index.html`:

| What | Where |
|---|---|
| Level number (`NIV. 1`) | `.level-badge` |
| V-Bucks count | `.vbucks` |
| Name above the character | `.tag-ariane` |
| Pet name tag | `.tag-pet` |
| Background items on the victory screen | `.bg-items` (emoji: 🦘 🍦 🏄‍♀️ 🧪 🍹 📱 🦥 ✈️ 🥼 🍸) |

Timings for the drop sequence (matchmaking → bus → skydive) are at the top of `startDrop()` in `script.js`.

## Deploying

GitHub Pages:
1. Push to GitHub.
2. Settings → Pages → Source: `main` branch, `/ (root)`.
3. Share the `https://<username>.github.io/<repo>/` link.
