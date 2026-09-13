# Ariane's Birthday Royale 🎂🎮

A fake Fortnite lobby (in French) built as a birthday surprise for Ariane.

**Flow:** Fortnite lobby with Ariane's character + Tchoupie the sidekick → tap **JOUER** → straight to the **VICTOIRE ROYALE** birthday screen (banner, message, and a swipeable photo gallery). No matchmaking/battle-bus/skydive sequence — that was cut; `play-btn`'s click handler just swaps `display` on the two screens, no delay.

**Landscape only**, matching the real Fortnite mobile client. Opening it on a phone held upright shows a "tourne ton téléphone" gate until it's rotated (`@media (orientation:portrait)` in `style.css`).

## Run it locally

Open `index.html` in a browser, or serve the folder with any static server.

## Character art

`assets/ariane-skin.png` is the "The Chemist" outfit render (Ariane + Tchoupie), background-removed and cropped tight. Ariane and the dog are a single image because they overlap in the source art and can't be split cleanly — so the two name tags are positioned as percentages over that image in `style.css`:

- `.tag-ariane` — `left: 58%` (over her head)
- `.tag-pet` — `left: 24%` (under the dog)

If you ever swap the PNG for a differently-composed one, those two percentages are what you'd re-tune.

## Background

`assets/lobby-bg.jpg` is rendered crisp — no blur — so it had to be built from real, unedited pixels rather than papered over with a filter. The source screenshot had a character, a dog and UI panels baked in, none of which are usable, so the image is two genuinely clean crops from elsewhere in that same screenshot (a warehouse strip and a trees/meteor strip, both from areas the character never touched) placed side by side with a feathered seam, then padded on both outer edges with a heavily-blurred stretch of their own edge pixels (reads as atmospheric haze, not a stretched photo). `#app-bg` just draws it with `background-size: cover`; `#app-vignette` adds a light top/bottom gradient for text legibility, nothing heavier.

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
| Photo gallery images | `.photo-gallery` — swap the 5 `assets/Image-Swipe(n).jpg` files or add more `<img>` tags |

## Deploying

GitHub Pages:
1. Push to GitHub.
2. Settings → Pages → Source: `main` branch, `/ (root)`.
3. Share the `https://<username>.github.io/<repo>/` link.
