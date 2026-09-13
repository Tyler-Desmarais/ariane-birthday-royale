# Ariane's Birthday Royale 🎂🎮

A fake Fortnite lobby built as a birthday surprise for Ariane.

**Flow:** the lobby screen → tap **PLAY** → the **VICTOIRE ROYALE** birthday screen (banner, message, and a swipeable photo gallery).

**Landscape only.** Opening it on a phone held upright shows a "tourne ton téléphone" gate until it's rotated (`@media (orientation:portrait)` in `style.css`).

## Run it locally

Open `index.html` in a browser, or serve the folder with any static server.

## The lobby screen

The lobby is **one image, shown exactly as-is** — `assets/lobby.png`, the pre-rendered mockup with Ariane, Tchoupie and the whole Fortnite UI already baked in. Nothing about it is rebuilt in HTML, so it can't drift from the picture.

It is displayed whole, never cropped (`max-width:100vw; max-height:100vh`), and centred, with letterbox bars in `#lobby-ui`'s background colour on whichever axis doesn't fill.

The only interactive part is `.play-hotspot` — a transparent `<button>` positioned in **percentages of the image box**, so it tracks the PLAY button at any screen size:

| | value | why |
|---|---|---|
| `left` | `3.77%` | measured from the image: yellow pixels span x 63–391 of 1671 |
| `top` | `75.88%` | …and y 714–799 of 941 |
| `width` | `19.63%` | |
| `height` | `9.03%` | |

If you swap `lobby.png` for a version where the PLAY button sits elsewhere, re-measure and update those four numbers.

The hotspot has a slow white pulse so it reads as tappable. Delete the `animation:playPulse` line in `style.css` to make it fully invisible.

## Victory screen

`assets/victory-banner.png` is the "#1 Victoire Royale" art with its white background flood-filled to transparent from the corners.

`reference/` holds source art this was built against. Nothing in there is loaded by the page.

`assets/ariane-skin.png` and `assets/lobby-bg.jpg` are left over from the earlier hand-built lobby and are no longer referenced — safe to delete.

## Fonts

Only the victory screen uses webfonts now (the lobby's type is part of the image). Headings ask for **Burbank Big Condensed Black** (Fortnite's typeface) and fall back to **Anton** / **Teko** — Burbank is a commercial Adobe font, so it only applies if installed locally. The birthday message stays in Rajdhani, since a condensed display face is hard to read for a paragraph.

## ✏️ TODO — the birthday message

The placeholder text lives in `index.html`, in `<div class="vic-message">`. Replace the two `<p>` lines with the real message.

Other easy edits:

| What | Where |
|---|---|
| Floating emoji on the victory screen | `.vic-emojis` (🦘 🍦 🏄‍♀️ 🧪 🍹 📱 🦥 ✈️ 🥼 🍸) |
| Photo gallery images | `.photo-gallery` — swap the 5 `assets/Image-Swipe(n).jpg` files or add more `<img>` tags |

## Deploying

GitHub Pages:
1. Push to GitHub.
2. Settings → Pages → Source: the branch you want, `/ (root)`.
3. Share the `https://<username>.github.io/<repo>/` link.
