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



