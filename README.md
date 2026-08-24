# CodeRush ⚡

A modern, dark-themed typing game with a coding twist. Words and code fall from the sky — type them before they hit the danger line.

Built with **React + Vite**, styled like a developer terminal with a black-and-gold cyber aesthetic, and packed with game modes to train raw typing speed, code muscle memory, mental math, and bug spotting.

---

## Sections

| Mode | Description |
|------|-------------|
| **Normal** | Falling English words. Type them before they cross the danger line. |
| **Code** | Falling code snippets — type every character exactly, symbols and all. |
| **Math** | Falling equations (`12 × 7`). Type the answer (digits only). |
| **Enemy** | Every falling item has **one bug baked in** (misspelling or syntax error). Type the *corrected* version to destroy it. |
| **DevType** | Full code-typing challenge: 40 levels across 4 tiers (Easy → Medium → Hard → Elite), plus Free Play with timed/practice modes. |
| **Music** | Spotify embeds — lofi/chill/focus playlists while you type. |
| **How It Works** | Quick guide to every mode and mechanic. |

Every arcade section (Normal / Code / Math / Enemy) has **Easy / Medium / Normal / Hard** difficulty levels that change fall speed, spawn rate, and word length.

---

## DevType — Level System

- **4 tiers × 10 levels = 40 levels**, with fixed snippets rotating across 9 languages: TypeScript, JavaScript, Python, Java, C++, C#, Go, Rust, HTML/CSS
- Tier time limits: Easy 90s · Medium 120s · Hard 150s · Elite 180s
- **Pass rule:** complete the snippet with **≥ 80% accuracy**
- Pass a level to unlock the next; complete a tier to unlock the next tier
- Progress persists in `localStorage`
- **Free Play** mode keeps the original timed/practice experience (15s / 30s / 60s / 120s / custom)

### Scoring

- **WPM** = correct characters ÷ 5 ÷ elapsed minutes
- **CPM** = correct characters ÷ elapsed minutes
- **Accuracy** = correct ÷ total typed × 100
- All statistics are computed from real typing — nothing is hardcoded

---

## UI Themes

Pick your accent from the top-bar swatch menu — all applied live via CSS variables:

- 🟡 **Gold** (default)
- 🟢 **Green**
- 🔵 **Blue**
- 🔴 **Red**
- ⚫ **Black** (monochrome, no glows)
- 🪟 **Transparent** (frosted-glass surfaces)

Choice persists across sessions.

---

## Tech Stack

- [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- Pure CSS — no UI framework
- [Firebase](https://firebase.google.com/) — Google sign-in
- [Spotify Embed](https://developer.spotify.com/documentation/embeds) — music player
- JetBrains Mono + Space Grotesk (Google Fonts)

### Architecture

Game logic is decoupled from UI:

```
src/
├── components/          # arcade sections, HUD, auth, theme picker
├── devtype/             # DevType module
│   ├── TypingEngine.js  # headless typing state machine
│   ├── Timer.js         # self-correcting countdown
│   ├── ScoreManager.js  # WPM/CPM/accuracy computation
│   ├── CodeSnippetManager.js
│   └── levels.js        # 40-level progression data
├── data/                # words, snippets, math, bug banks
└── context/             # auth context
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure Firebase (optional — for Google sign-in)
#    Create src/.env from the template below and add your API key

# 3. Run the dev server
npm run dev

# 4. Production build
npm run build
```

### Environment setup

Create `src/.env` (never commit it):

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXX
```

Enable **Google** as a sign-in provider in the Firebase Console and add your dev URL to **Authorized domains**.

> Note: Vite reads `.env` from `./src` (see `vite.config.js`). `VITE_`-prefixed values are exposed to the client — that's expected for Firebase config; protect data with Firestore/Auth security rules, not API keys.

---

## Controls

- **Desktop:** just start typing — the timer begins on your first keystroke. Backspace works, pasting is blocked while playing.
- **Mobile:** tap the input field, use the on-screen keyboard. Layout is fully responsive (Android included — `100dvh`, scrollable tabs, wrapping HUD).
- **Start / Retry:** press `Enter` or click the START button.

---

## License

MIT — do whatever you want, just keep typing fast. ⌨️
