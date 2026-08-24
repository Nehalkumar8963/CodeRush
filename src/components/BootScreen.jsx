import { useEffect, useState } from 'react'

const LINES = [
  'CodeRush BIOS v1.0.0',
  'memory ok ... 64kb',
  'typing core ........ loaded',
  'falling-word engine . loaded',
  'code challenge ..... loaded',
  'math attack ........ loaded',
  'bug scanner ........ loaded',
  'audio module ....... ready',
  '',
  'type [any key] to boot into the terminal',
]

export default function BootScreen({ onBoot }) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (shown >= LINES.length) return
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 200 : 90)
    return () => clearTimeout(t)
  }, [shown])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Backspace') return
      if (e.key.length === 1 || e.key === 'Enter' || e.key === ' ') {
        onBoot()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onBoot])

  const ready = shown >= LINES.length

  return (
    <div className="boot-screen">
      <div className="boot-inner">
        {LINES.slice(0, shown).map((l, i) => (
          <div key={i} className={'boot-line' + (l.startsWith('type') ? ' boot-prompt-line' : '')}>
            {l || '\u00a0'}
          </div>
        ))}
        {ready ? <span className="term-cursor blink" /> : <span className="term-cursor" />}
      </div>
    </div>
  )
}
