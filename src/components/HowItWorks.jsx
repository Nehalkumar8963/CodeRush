const MODES = [
  {
    title: 'Normal',
    accent: 'var(--green)',
    tagline: 'falling words',
    lines: [
      'English words fall from the sky toward a red danger line.',
      'Type any falling word and it explodes for points.',
      'A wrong key flashes red and counts as an error.',
      'A word that crosses the line costs you one of your 3 lives.',
      'Longer combos multiply your score.',
    ],
  },
  {
    title: 'Code',
    accent: 'var(--blue)',
    tagline: 'falling code',
    lines: [
      'Real code tokens fall instead of words.',
      'Type every character exactly — brackets, symbols, spaces and all.',
      'Same rules as Normal: 3 lives, 60 seconds, combo multipliers.',
      'Great for building muscle memory for syntax.',
    ],
  },
  {
    title: 'Math',
    accent: 'var(--yellow)',
    tagline: 'solve falling equations',
    lines: [
      'Equations like 12 × 7 or (3 + 4) × 5 fall from the top.',
      'Type the answer — digits only — to destroy them.',
      'Hard mode adds squares, parentheses and mixed operations.',
      'Sharpens both typing and mental math.',
    ],
  },
  {
    title: 'Enemy',
    accent: 'var(--red)',
    tagline: 'spot the bug',
    lines: [
      'Each falling item has exactly one bug baked in.',
      'Words: a misspelling (recieve → receive).',
      'Code: a syntax error (const x = = 5; → const x = 5;).',
      'Typing the buggy text does nothing — type the fix to destroy it.',
    ],
  },
  {
    title: 'DevType',
    accent: 'var(--yellow)',
    tagline: 'code typing challenge',
    lines: [
      'Type an entire code snippet in a real editor-style panel.',
      'Pick a language, a mode (Timed or Practice) and a time limit.',
      'The timer starts on your first keystroke.',
      'Get live WPM, CPM and accuracy, then a full results report.',
    ],
  },
  {
    title: 'Music',
    accent: 'var(--blue)',
    tagline: 'soundtrack',
    lines: [
      'Play lofi or focus playlists through the Spotify embed.',
      'Paste any Spotify track, playlist or album link.',
      'The player keeps playing while you switch to other sections.',
    ],
  },
]

const BASICS = [
  { k: 'Difficulty', v: 'Easy / Medium / Normal / Hard change fall speed, spawn rate and word length.' },
  { k: 'Timer', v: 'Every arcade round runs for 60 seconds. DevType lets you pick 15s–120s or custom.' },
  { k: 'Lives', v: 'You start with 3 lives. A falling item crossing the bottom line costs one.' },
  { k: 'Scoring', v: 'Points grow with word length and your combo multiplier. WPM and accuracy are computed from real typing.' },
  { k: 'Combo', v: 'Every destroyed item raises your combo. Missing one resets it to zero.' },
]

export default function HowItWorks() {
  return (
    <div className="how-section">
      <div className="how-header">
        <div className="how-title">
          How <em>CodeRush</em> Works
        </div>
        <div className="how-sub">six modes, one idea — type fast, don't let anything hit the line</div>
      </div>

      <div className="how-basics">
        {BASICS.map((b) => (
          <div key={b.k} className="how-basic">
            <span className="how-basic-k">{b.k}</span>
            <span className="how-basic-v">{b.v}</span>
          </div>
        ))}
      </div>

      <div className="how-grid">
        {MODES.map((m) => (
          <div key={m.title} className="how-card">
            <div className="how-card-head">
              <span className="how-card-title">{m.title}</span>
              <span className="how-card-tag" style={{ color: m.accent }}>
                {m.tagline}
              </span>
            </div>
            <ul className="how-card-list">
              {m.lines.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
