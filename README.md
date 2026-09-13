# Ariane's Birthday Royale 🎂🎮

A fake Fortnite lobby (in French) built as a birthday surprise for Ariane.

**Flow:** Fortnite lobby with Ariane's character + Tchoupie the sidekick → tap **JOUER** → the lobby fades out → **VICTOIRE ROYALE** birthday screen.

**Landscape only**, matching the real Fortnite mobile client. Opening it on a phone held upright shows a "tourne ton téléphone" gate until it's rotated (`@media (orientation:portrait)` in `style.css`).

The matchmaking → battle bus → skydive sequence is still in the code but skipped by default. Flip `SHOW_DROP_SEQUENCE` at the top of `script.js` to `true` to put it back between the lobby and the victory screen.

## Run it locally

Open `index.html` in a browser, or serve the folder with any static server.

## Character art

`assets/ariane-skin.png` is the "The Chemist" outfit render (Ariane + Tchoupie), background-removed and cropped tight. Ariane and the dog are a single image because they overlap in the source art and can't be split cleanly — so the two name tags are positioned as percentages over that image in `style.css`:

- `.tag-ariane` — `left: 58%` (over her head)
- `.tag-pet` — `left: 24%` (under the dog)

If you ever swap the PNG for a differently-composed one, those two percentages are what you'd re-tune.

## Background

`assets/lobby-bg.jpg` is built from a real Fortnite lobby screenshot. That screenshot had a character, a dog and UI panels in it, so the plate is cropped below the nav bar and between the side panels, then the character is painted over with mirrored scenery and the sky repatched (otherwise the mirror duplicates the meteor). It's drawn by `#app-bg` with `background-size: cover` + `filter: blur(8px)`, with `#app-vignette` over it — that blur is what gives the page its depth-of-field look.

The uncropped original is kept outside the repo at `../lobby-bg-original-screenshot.png`.

`assets/victory-banner.png` is the "#1 Victoire Royale" art with its white background flood-filled to transparent from the corners.

`reference/` holds the source art this was built against — the `Lobby with skin.png` mockup that defines the target layout, and the original victory banner. Nothing in there is loaded by the page.

## Fonts

The UI asks for **Burbank Big Condensed Black** (Fortnite's actual typeface) first and falls back to **Anton** / **Teko** from Google Fonts — Burbank is a commercial Adobe font, so it only kicks in if it's installed locally. The two stacks are `--fn` (big text) and `--fn-ui` (small chrome) in `style.css`. The birthday message deliberately stays in Rajdhani, since a condensed display face is hard to read for a paragraph.

## ✏️ TODO — the birthday message

The placeholder text lives in `index.html`, in `<div class="vic-message">`. Replace the two `<p>` lines with the real message.

Other easy edits in `index.html`:

| What | Where |
|---|---|
| Level (`Niv. 128`) and the "Prêt" status | `.nametag` |
| V-Bucks count | `.vbucks` |
| Nav tabs | `.nav-tabs` |
| Event card text | `.event-card` |
| Outfit card | `.outfit-card` |
| Party message at the bottom | `.party-msg` |
| Floating emoji on the victory screen | `.vic-emojis` (🦘 🍦 🏄‍♀️ 🧪 🍹 📱 🦥 ✈️ 🥼 🍸) |

Timings for the optional drop sequence are at the top of `startDrop()` in `script.js`.

## Deploying

GitHub Pages:
1. Push to GitHub.
2. Settings → Pages → Source: `main` branch, `/ (root)`.
3. Share the `https://<username>.github.io/<repo>/` link.
