# Taste
- Prefers black/dark UI aesthetics for web apps. Confidence: 0.85
- Dislikes green accent colors in UI — explicitly asked to remove all green and make the UI black (accent was swapped to gold). Confidence: 0.8
- Prefers a fully monochrome UI (black/white/gray only) with no color accents — has repeatedly asked to remove all color and keep only black, most recently re-confirmed after a developer-tool redesign ("remove all colors keep only black"), superseding green/gold accent directions. Confidence: 0.9
- Prefers maximalist, feature-rich UI layouts over sparse/minimal ones (explicitly favors bold decorative shells: ambient glow orbs, gradient backgrounds), and wants the maximalism to be monochrome black/white/gray — not colored. Confidence: 0.8
- Communicates tersely in short, all-caps, imperative messages — both when reporting problems ("TYPING IS NOT WORKING") and when issuing commands ("RUN", "RUN TYPE WEBSITE", "STOP ALL THE WEBPROJECTS"). Confidence: 0.9
- Prefers modular architecture with game/domain logic decoupled from UI (separate logical modules such as engine, timer, scoring, and results). Confidence: 0.8
- Prefers headless/UI-independent logic modules with clear responsibilities: a pure typing engine (per-character state, correct/error/backspace handling), a self-correcting countdown timer, and a score manager that derives stats from real typing data — with callback hooks (onTick/onExpire) wired in the UI layer. Confidence: 0.7
- Prefers avoiding unnecessary dependencies. Confidence: 0.7
- Prefers strongly typed code (TypeScript). Confidence: 0.7
- Prefers original UI designs over copying a reference site verbatim. Confidence: 0.7
- Prefers responsive, mobile-first layouts that work on phone screens (including Android) — handling mobile viewport quirks like `100dvh` and `viewport-fit=cover`, with scrollable nav/tab rows and wrapping HUD/stats on narrow screens. Confidence: 0.8
- Prefers yellow/gold accent color for important UI elements within dark themes, but this was superseded by an explicit "no color" monochrome (black/white/gray) request — treat any colored accent (including gold) as unwanted in the current UI. Confidence: 0.6
- Prefers all game/typing metrics computed from real input data rather than hardcoded or fake values. Confidence: 0.6
- Prefers reusing existing components/styles where appropriate and verifying the build plus end-to-end behavior before declaring a feature done. Confidence: 0.6
- Prefers storing API keys/secrets in .env files rather than hardcoding them in source. Confidence: 0.8
- Keeps only true secrets (e.g. API keys) in .env files; non-secret config values (auth domain, project ID, storage bucket, messaging sender ID, app ID, measurement ID) are hardcoded directly in the source/config file. Confidence: 0.7
- Prefers Firebase for backend services (e.g. Google auth) in web projects. Confidence: 0.7
- Prefers Google (OAuth) sign-in only, without email/password authentication. Confidence: 0.7
- Prefers minimal client-side form validation — disables native browser validation (e.g. required/minLength/noValidate) and lets the backend/service surface errors instead of blocking submissions. Confidence: 0.6
- Prefers polished profile UI: a top-bar profile pill (avatar with initial fallback + caret) opening a dropdown with avatar, name, email, and sign-out, closable via backdrop click. Confidence: 0.6
- Uses GitHub for version control and expects the agent to handle committing and pushing the project. Confidence: 0.6
- Prefers a CMD/CLI terminal-style interface (command-line/console aesthetic) for the typing game UI — including terminal chrome like a boot sequence, window title bar, prompt symbols (`❯`), blinking cursor, scanlines, and a status-bar HUD. Confidence: 0.85
- Prefers game overlays (start/instruction screens) to never obstruct gameplay — start panels should unmount completely once play begins rather than floating over the game area. Confidence: 0.85
- Prefers a dedicated fixed input/command bar at the bottom of the gameplay screen that never overlaps the content/falling-word area. Confidence: 0.7
- Prefers a modern, clean game UI aesthetic — dark surfaces, smooth animations, depth, spacing, and modern typography — and dislikes dated/flat "old HTML game" looks; applies this in pure monochrome, using gray/white status differentiation instead of color accents. Confidence: 0.7
- Prefers compact futuristic HUD stat chips: small uppercase labels above large glowing numeric values with consistent spacing, timer prominent in the top-right. Confidence: 0.6
- Prefers clearly distinct visual states for game entities (e.g., normal / targeted / correctly typed / missed / danger). Confidence: 0.6

- Prefers GitHub-facing documentation: a README covering project overview, features, tech stack, setup/env config, and controls. Confidence: 0.6



- Refines the CLI/terminal preference: wants a premium "command interface" (glass input bar, `❯` prompt, animated cursor, focus glow) but explicitly avoids a literal terminal-emulator look. Confidence: 0.7
- Prefers deep, atmospheric backgrounds (near-black base, blurred light blobs, faint dot/grid texture) over flat black areas, but wants them fully monochrome — removed green/cyan color tints when asked for black/white-only. Confidence: 0.75

- Prefers real layout refactoring over piling an extra CSS layer on top of an existing UI during redesigns. Confidence: 0.7
- Prefers a VS Code/IDE-style application shell for the UI: title bar with menus, tab bar, breadcrumbs, activity bar, explorer sidebar, editor area with line-number gutter and minimap, and a status bar carrying live stats — superseding the earlier CLI/terminal-style interface preference. Confidence: 0.85
d content). Confidence: 0.85

- Prefers a developer-tool/documentation aesthetic for the UI: dark charcoal background, thin 1px borders, structured rectangular sections, dense-but-clean information layout, monospace typography, small uppercase labels, subtle gray/white text, minimal glow, and precise alignment — a "serious developer product" rather than a neon game. Supersedes the earlier VS Code-shell and CLI/terminal interface preferences. Confidence: 0.9
- Prefers green as the accent color for active/emphasis states (active nav items, correct characters, focus borders) in the developer-tool UI, but this was again superseded by an explicit "remove all colors keep only black" monochrome request — treat green accents as unwanted going forward. Confidence: 0.55
- Avoids decorative excess: neon effects, glassmorphism, thick glowing borders, giant rounded cards, huge empty black areas, old horizontal rules, giant centered game text, cartoon gaming UI, and excessive animations. Confidence: 0.8
- Prefers dark gray/charcoal surfaces rather than pure black. Confidence: 0.6
- When given a reference screenshot, treats it as the primary visual reference but recreates its design philosophy rather than copying it verbatim. Confidence: 0.65
- Prefers the typing input styled as a developer command prompt: thin border, dark background, monospace font, green cursor, green focus border, comfortably tall, and permanently separated from the falling-word area so it never covers words. Confidence: 0.75
- Prefers redesigns to preserve underlying game mechanics and functionality, changing only the frontend presentation and layout. Confidence: 0.7
- Rejected the developer-tool/documentation redesign and asked to reset all UI changes back to the original "normal website" — indicating that aesthetic direction (and its green accent) was not what they wanted. Supersedes the developer-tool aesthetic and green-accent preferences. Confidence: 0.7
- Re-confirmed the developer-tool/documentation aesthetic as the target UI direction via an explicit, detailed redesign spec (dark charcoal background, thin 1px borders, structured rectangular sections, dense-but-clean layout, monospace typography, small uppercase labels, green accent for active states, command-prompt typing input) — superseding the earlier "reset to normal website" rejection. Confidence: 0.85
- Prefers falling words styled as code tokens (e.g. function, const, return, async, await, interface): light gray/white normally, green when targeted, subtle warning near danger, brief green highlight when correct, brief red highlight when missed — clean technical typography without giant glowing words. Confidence: 0.7
- Again rejected the developer-tool/documentation redesign — immediately after it was re-applied, issued "undo it, reset all changes" (twice) to revert back to the original website, indicating the developer-tool aesthetic and its green accent were still not what they wanted. Supersedes the earlier "re-confirmed developer-tool aesthetic" learning. Confidence: 0.75
- Uses a frequent undo/reset workflow: issues short "undo/reset all changes" commands and expects the agent to restore UI changes to the last commit via `git restore` while leaving pre-existing uncommitted changes (e.g. .gitignore, README, .commandcode/) untouched. Confidence: 0.7
- Prefers typing-game difficulty to come from word density/spawn pressure rather than falling speed — harder modes should fall slower (with more simultaneous words and faster spawning) instead of faster. Confidence: 0.75
- Prefers streamlined game sections with fewer choices: removes mode and difficulty pickers in favor of locking a section to a single default (easy) mode. Confidence: 0.7
- Prefers removing theme/customization controls from the UI — asked to remove the theme picker button entirely, keeping a single fixed theme rather than exposing a theme switcher. Confidence: 0.6
- Prefers Enemy (spot-the-bug) mode items to fall slowly (e.g. 20–32 px/s) regardless of the difficulty table, keeping it a relaxed/easy-feeling mode. Confidence: 0.7
- Prefers typing practice to present content one item at a time (a single active word or a single code line) with automatic advance on completion, rather than displaying a large paragraph to type through. Confidence: 0.8
- Prefers code practice to render like a lightweight code editor: line numbers, current-line highlight, completed-line opacity reduction, monospace font, and per-character error highlighting. Confidence: 0.8
- Prefers a level-by-level progression structure for the DevType code-practice section (curated levels unlocked/passed in sequence, with a progress overview), superseding the earlier "no levels/progression" preference for practice modes. Confidence: 0.75
- Prefers levels gated on both completion and a high accuracy threshold (e.g. pass only when finished at 85%+ accuracy), with a retry/next-level flow on results. Confidence: 0.6
- Prefers progress persisted to localStorage so completed code-practice levels stay unlocked across sessions. Confidence: 0.6
- Prefers practice/training modes kept free of gamification and progression systems (no levels, XP, challenges, quizzes, or code-completion/bug-fixing tasks); the intended flow is "choose → practice → type → improve". Confidence: 0.75
- Prefers non-destructive typing error handling: highlight only the incorrect character, keep the cursor in place, and allow correction without wiping the current word/line. Confidence: 0.7
- In the DevType typing engine, prefers wrong keystrokes to not register at all — a non-matching character does not advance the cursor or render an error character; it only increments the error/keystroke counters, so progress requires typing the exact next character. Confidence: 0.7
- Prefers red as the error/incorrect-input indication color: wants wrong keystrokes to flash red in the typing UI, even within the otherwise monochrome black/white/gray aesthetic (an explicit exception to the no-color preference). Confidence: 0.7
- Prefers a compact developer-style practice HUD showing WPM, accuracy, characters, and time (plus language and line position in code practice). Confidence: 0.6
- Re-asserted green as the accent color for the developer-tool aesthetic in the DevType practice-mode spec (dark charcoal, thin borders, compact typography, monospace, green accent, minimal animations), despite earlier monochrome flip-flopping. Confidence: 0.55
- Prefers complete feature removal when dropping something: deletes the source directory, strips all references (imports, nav tabs, help/docs mentions), and verifies the build passes — no dead code left behind. Confidence: 0.6
- Prefers concise start-screen intro text: short one-line descriptions (with just the key stats like lives and time) rather than verbose multi-sentence instructions, applied consistently across game modes. Confidence: 0.7
- Prefers minimal start panels with no title/branding — removes the game title (e.g. "CodeRush") from the start screen, leaving only the brief intro and action button. Confidence: 0.6
- Prefers modal/overlay dialogs (e.g. the sign-in box) centered on the viewport rather than offset or trapped within a container. Confidence: 0.5
- Develops in a Windows environment (paths like `D:\...`); shell commands must be Windows-compatible — avoid Unix-only tools such as `head`/`ls`, and use `dir`, `2>nul`, and backslash paths instead. Confidence: 0.85
- Prefers surgical, root-cause bug fixes that preserve existing functionality and UI — fixes should be made in place without redesigning the interface or touching unrelated working logic (e.g. accuracy, combo, timer, progress, highlighting). Confidence: 0.6
