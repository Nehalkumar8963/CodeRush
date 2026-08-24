import { useEffect, useRef, useState } from 'react'

const THEMES = [
  { id: 'gold', label: 'Gold', color: '#d4af37' },
  { id: 'green', label: 'Green', color: '#00ff9d' },
  { id: 'blue', label: 'Blue', color: '#4d9fff' },
  { id: 'red', label: 'Red', color: '#ff3b5c' },
  { id: 'black', label: 'Black', color: '#e8e8e8' },
  { id: 'transparent', label: 'Transparent', color: 'linear-gradient(135deg, #d4af37, #7f8cff, #00d4ff)' },
]

const STORAGE_KEY = 'coderush-theme'

export function applyTheme(id) {
  document.documentElement.dataset.theme = id
}

export function getSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'gold'
  } catch {
    return 'gold'
  }
}

export default function ThemePicker() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(getSavedTheme)
  const ref = useRef(null)

  useEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // storage unavailable
    }
  }, [theme])

  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const active = THEMES.find((t) => t.id === theme)

  return (
    <div className="theme-picker" ref={ref}>
      <button
        className="theme-toggle"
        onClick={() => setOpen((o) => !o)}
        title="UI theme"
      >
        <span
          className="theme-swatch"
          style={{ background: active.color, boxShadow: `0 0 10px ${active.color}` }}
        />
        <span className="theme-caret">▾</span>
      </button>

      {open && (
        <div className="theme-menu">
          <div className="theme-menu-title">UI Theme</div>
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={'theme-option' + (t.id === theme ? ' active' : '')}
              onClick={() => {
                setTheme(t.id)
                setOpen(false)
              }}
            >
              <span className="theme-swatch" style={{ background: t.color }} />
              <span className="theme-label">{t.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
