# Ariane's Birthday Royale 🎂🎮

A fake Fortnite lobby built as a birthday surprise for Ariane.

**Flow:** the lobby screen → tap **PLAY** → the **VICTOIRE ROYALE** birthday screen (banner, message, and a swipeable photo gallery).

**Orientation:** a phone held upright gets a "tourne ton téléphone" gate — at that size the PLAY button would render 76x19 px. A tablet in portrait is left alone (the button is still 160x41 px there) and the birthday page stacks into one column instead. The gate is `@media (orientation:portrait) and (max-width:700px)`.

Heights use `dvh`, not `vh`. On iOS Safari `100vh` is the screen height *ignoring* the address and tab bars, so a `100vh` element is taller than the visible area and its top slides underneath the browser chrome. `vh` is kept as a fallback for older browsers.

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

## Birthday page

A two-column landscape layout: the note on the left, a photo carousel on the right.

The photos are a **mix of portrait and landscape**, so the carousel uses a fixed
frame with `object-fit: contain` — every photo shows in full, nothing is cropped.
(`cover` was cutting the subjects out of the portrait shots entirely.)

Slide tracking uses `IntersectionObserver`, not the `scroll` event — the track
fires no scroll events in some browsers, which left the dots stuck on the wrong
photo. The observer also catches real touch swipes, which button clicks alone
would miss.

`assets/victory-banner.png` is the "#1 Victoire Royale" art with its white
background flood-filled to transparent from the corners.

`reference/` holds source art this was built against. Nothing in there is loaded
by the page.

`assets/ariane-skin.png` and `assets/lobby-bg.jpg` are left over from an earlier
hand-built lobby and are no longer referenced — safe to delete.

## Fonts

None — the page loads no webfonts. The lobby's type is baked into its image, and
the birthday page uses the system UI stack with a serif heading. That keeps the
page fast and stops it looking like a generic template.

## Editing

The birthday message lives in `index.html`, in `<div class="vic-message">`.

If you change `style.css` or `script.js`, bump the `?v=` number on their `<link>`/`<script>` tags in `index.html` — otherwise browsers keep serving the cached copy and the deploy looks like it silently failed.

Other easy edits:

| What | Where |
|---|---|
| Heading above the note | `.vic-text h1` |
| Photos | `.gal-track` — swap the `assets/Image-Swipe(n).jpg` files, or add/remove `<img>` tags (dots follow automatically) |

## Deploying

GitHub Pages:
1. Push to GitHub.
2. Settings → Pages → Source: the branch you want, `/ (root)`.
3. Share the `https://<username>.github.io/<repo>/` link.
