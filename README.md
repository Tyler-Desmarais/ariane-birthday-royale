# Ariane's Birthday Royale 🎂🎮

A fake Fortnite lobby (in French) built as a birthday surprise for Ariane.

**Flow:** Fortnite lobby with Ariane's character + Tchoupie the sidekick → tap **PRÊT** → matchmaking → battle bus → skydive → **VICTOIRE ROYALE** birthday screen.

Built phone-first (portrait), works on desktop too.

## Run it locally

Open `index.html` in a browser, or serve the folder with any static server.

## 🔴 TODO — swap in the real skin art

The lobby character currently uses a hand-drawn placeholder. To replace it with a real Fortnite-style skin:

1. Generate the image (e.g. ChatGPT: feed it a photo of Ariane + *"make this person a Fortnite character skin wearing a chemist lab coat and turquoise Crocs, full body, transparent background"*).
2. Save it as **`assets/ariane-skin.png`** — that exact path and filename.
3. Done. No code changes needed; the page loads the PNG and only falls back to the placeholder SVG if it's missing.

Same deal for the dog: save a cut-out as **`assets/tchoupie.png`**.

**Important:** use a **transparent background PNG**, cropped tight to the character (no big empty margins), otherwise it'll render as a floating rectangle with a gap under the name plate.

## ✏️ TODO — the birthday message

The placeholder text lives in `index.html`, in `<div class="victory-message">`. Replace the two `<p>` lines with the real message.

Other easy edits in `index.html`:

| What | Where |
|---|---|
| Level number (`NIV. 1`) | `.level-badge` |
| V-Bucks count | `.vbucks` |
| Account name shown above the character | `.party-name` and `.nameplate` |
| Pet name tag | `.pet-tag` |
| Background items on the victory screen | `.bg-items` (emoji: 🦘 🍦 🏄‍♀️ 🧪 🍹 📱 🦥 ✈️ 🥼 🍸) |

Timings for the drop sequence (matchmaking → bus → skydive) are at the top of `startDrop()` in `script.js`.

## Deploying

GitHub Pages:
1. Push to GitHub.
2. Settings → Pages → Source: `main` branch, `/ (root)`.
3. Share the `https://<username>.github.io/<repo>/` link.
