import { useCallback, useEffect, useRef, useState } from 'react'
import HUD from './HUD.jsx'
import GameOverOverlay from './GameOverOverlay.jsx'

const DIFF = {
  easy: { speed: [70, 90], spawn: 2600, max: 3 },
  normal: { speed: [50, 66], spawn: 2100, max: 4 },
  medium: { speed: [38, 52], spawn: 1750, max: 6 },
  hard: { speed: [26, 40], spawn: 1500, max: 8 },
}

const ACCENTS = {
  code: 'var(--blue)',
  enemy: 'var(--red)',
  math: 'var(--yellow)',
}

const DEFAULT_INTRO = (
  <>
    type the falling words before they reach the bottom.
    <br />
    <b>3 lives</b> · <b>60s</b> on the clock
  </>
)

const GAME_SECONDS = 60
const CHAR_RATIO = 0.6

let nextId = 1

export default function GameEngine({ items, difficulty, active, mode, intro }) {
  const [phase, setPhase] = useState('ready') // ready | playing | over
  const [words, setWords] = useState([])
  const [buffer, setBuffer] = useState('')
  const [stats, setStats] = useState({
    score: 0,
    combo: 0,
    bestCombo: 0,
    lives: 3,
    timeLeft: GAME_SECONDS,
    wpm: 0,
    acc: 100,
  })

  const wrapRef = useRef(null)
  const inputRef = useRef(null)
  const wordsRef = useRef([])
  const nodesRef = useRef(new Map())
  const statsRef = useRef({
    score: 0,
    combo: 0,
    bestCombo: 0,
    lives: 3,
    timeLeft: GAME_SECONDS,
    correctKeys: 0,
    totalKeys: 0,
    correctChars: 0,
    startTime: 0,
  })
  const phaseRef = useRef('ready')
  const bufferRef = useRef('')
  const lastFrameRef = useRef(0)
  const lastSpawnRef = useRef(0)
  const pauseStartRef = useRef(0)
  const rafRef = useRef(0)
  const itemsRef = useRef(items)
  const activeRef = useRef(active)
  itemsRef.current = items
  activeRef.current = active

  const syncStats = useCallback(() => {
    const s = statsRef.current
    const elapsedMin = (performance.now() - s.startTime) / 60000
    const wpm = elapsedMin > 0.02 ? Math.round(s.correctChars / 5 / elapsedMin) : 0
    const acc = s.totalKeys > 0 ? Math.round((s.correctKeys / s.totalKeys) * 100) : 100
    setStats({
      score: s.score,
      combo: s.combo,
      bestCombo: s.bestCombo,
      lives: s.lives,
      timeLeft: s.timeLeft,
      wpm,
      acc,
    })
  }, [])

  const setBufferBoth = useCallback((v) => {
    bufferRef.current = v
    setBuffer(v)
  }, [])

  const resetGame = useCallback(() => {
    wordsRef.current = []
    setWords([])
    nodesRef.current.clear()
    bufferRef.current = ''
    setBuffer('')
    lastSpawnRef.current = 0
    lastFrameRef.current = 0
    pauseStartRef.current = 0
    statsRef.current = {
      score: 0,
      combo: 0,
      bestCombo: 0,
      lives: 3,
      timeLeft: GAME_SECONDS,
      correctKeys: 0,
      totalKeys: 0,
      correctChars: 0,
      startTime: 0,
    }
    syncStats()
  }, [syncStats])

  useEffect(() => {
    resetGame()
    phaseRef.current = 'ready'
    setPhase('ready')
  }, [difficulty, mode, resetGame])

  const pickItem = useCallback(() => {
    const pool = itemsRef.current
    if (typeof pool === 'function') return pool()
    if (!pool.length) return null
    return pool[Math.floor(Math.random() * pool.length)]
  }, [])

  const spawnWord = useCallback(
    (now) => {
      const wrap = wrapRef.current
      if (!wrap) return
      const picked = pickItem()
      if (picked == null) return
      const label = typeof picked === 'string' ? picked : picked.text
      const matchText =
        picked && typeof picked === 'object' && picked.solution ? picked.solution : label
      const W = wrap.clientWidth
      const fontSize = Math.min(20, Math.max(12, W / (label.length * CHAR_RATIO) - 4))
      const width = label.length * CHAR_RATIO * fontSize

      let x = 10
      for (let attempt = 0; attempt < 6; attempt++) {
        const cand = 10 + Math.random() * Math.max(10, W - width - 20)
        const collides = wordsRef.current.some(
          (w) => w.y < 70 && Math.abs(w.x - cand) < Math.min(w.width, width) * 0.9,
        )
        if (!collides) {
          x = cand
          break
        }
      }

      const cfg = DIFF[difficulty]
      const speedRange = mode === 'enemy' ? [20, 32] : cfg.speed
      const word = {
        id: nextId++,
        label,
        matchText,
        x,
        y: -30,
        width,
        fontSize: Math.round(fontSize),
        speed: speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]),
        typed: 0,
        done: false,
      }
      wordsRef.current = [...wordsRef.current, word]
      setWords(wordsRef.current)
      lastSpawnRef.current = now
    },
    [difficulty, pickItem],
  )

  const startGame = useCallback(() => {
    resetGame()
    statsRef.current.startTime = performance.now()
    phaseRef.current = 'playing'
    setPhase('playing')
    spawnWord(performance.now())
  }, [resetGame, spawnWord])

  const finishGame = useCallback(() => {
    phaseRef.current = 'over'
    setPhase('over')
  }, [])

  const removeWord = useCallback((id) => {
    wordsRef.current = wordsRef.current.filter((w) => w.id !== id)
    nodesRef.current.delete(id)
    setWords(wordsRef.current)
  }, [])

  const completeWord = useCallback(
    (word) => {
      const s = statsRef.current
      s.combo += 1
      if (s.combo > s.bestCombo) s.bestCombo = s.combo
      const points = Math.round((10 + word.matchText.length * 2) * (1 + s.combo * 0.15))
      s.score += points
      word.done = true
      setWords([...wordsRef.current])
      setTimeout(() => removeWord(word.id), 240)
      syncStats()
    },
    [removeWord, syncStats],
  )

  const missWord = useCallback(
    (word) => {
      const s = statsRef.current
      s.lives -= 1
      s.combo = 0
      removeWord(word.id)
      const buf = bufferRef.current
      if (buf && !wordsRef.current.some((w) => !w.done && w.matchText.startsWith(buf))) {
        setBufferBoth('')
      }
      const wrap = wrapRef.current
      if (wrap) {
        wrap.classList.remove('shake')
        void wrap.offsetWidth
        wrap.classList.add('shake')
        setTimeout(() => wrap.classList.remove('shake'), 350)
      }
      syncStats()
      if (s.lives <= 0) finishGame()
    },
    [finishGame, removeWord, setBufferBoth, syncStats],
  )

  const flashError = useCallback((word) => {
    const node = nodesRef.current.get(word.id)
    if (!node) return
    node.classList.remove('error-flash')
    void node.offsetWidth
    node.classList.add('error-flash')
    setTimeout(() => node.classList.remove('error-flash'), 200)
  }, [])

  const processValue = useCallback(
    (value) => {
      const prev = bufferRef.current
      const s = statsRef.current
      const live = wordsRef.current.filter((w) => !w.done)

      if (value === prev) return

      const fullMatch = live.find((w) => w.matchText === value)

      if (fullMatch) {
        const gained = fullMatch.matchText.length - fullMatch.typed
        s.correctChars += gained
        s.correctKeys += gained
        s.totalKeys += gained
        for (const w of live) w.typed = 0
        completeWord(fullMatch)
        setBufferBoth('')
        return
      }

      if (value.length < prev.length) {
        // backspace: accept if still a valid prefix, otherwise clear
        if (live.some((w) => w.matchText.startsWith(value))) {
          for (const w of live) w.typed = w.matchText.startsWith(value) ? value.length : 0
          setBufferBoth(value)
        } else {
          for (const w of live) w.typed = 0
          setBufferBoth('')
        }
        setWords([...wordsRef.current])
        return
      }

      // typed more characters
      if (live.some((w) => w.matchText.startsWith(value))) {
        s.correctKeys += value.length - prev.length
        s.correctChars += value.length - prev.length
        s.totalKeys += value.length - prev.length
        for (const w of live) w.typed = w.matchText.startsWith(value) ? value.length : 0
        setBufferBoth(value)
      } else {
        // wrong keystroke — snap back to previous buffer
        s.totalKeys += Math.max(1, value.length - prev.length)
        const targets = live.filter((w) => w.typed > 0 && w.matchText.startsWith(prev))
        if (targets.length) {
          targets.forEach(flashError)
        } else {
          let deepest = null
          for (const w of live) if (!deepest || w.y > deepest.y) deepest = w
          if (deepest) flashError(deepest)
        }
        setBufferBoth(prev)
        if (inputRef.current) inputRef.current.value = prev
      }
      setWords([...wordsRef.current])
    },
    [completeWord, flashError, setBufferBoth],
  )

  const handleInput = useCallback(
    (e) => {
      const value = e.target.value
      if (phaseRef.current === 'ready') {
        startGame()
        if (inputRef.current) inputRef.current.value = ''
        return
      }
      if (phaseRef.current !== 'playing') return
      processValue(value)
    },
    [processValue, startGame],
  )

  // focus management — keep the input focused while this game is the active tab
  useEffect(() => {
    if (active && (phase === 'ready' || phase === 'playing')) {
      inputRef.current && inputRef.current.focus()
    }
  }, [phase, active])

  useEffect(() => {
    const isInteractive = (el) =>
      el &&
      typeof el.closest === 'function' &&
      (el.closest('button') ||
        el.closest('a') ||
        el.closest('input') ||
        el.closest('select') ||
        el.closest('textarea'))
    const onFocus = (e) => {
      if (
        activeRef.current &&
        (phaseRef.current === 'ready' || phaseRef.current === 'playing') &&
        !isInteractive(e.target)
      ) {
        inputRef.current && inputRef.current.focus()
      }
    }
    const onPointerDown = (e) => {
      if (!activeRef.current || phaseRef.current !== 'playing') return
      if (isInteractive(e.target)) return
      setTimeout(() => {
        if (activeRef.current && phaseRef.current === 'playing') {
          inputRef.current && inputRef.current.focus()
        }
      }, 0)
    }
    document.addEventListener('focusin', onFocus)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('focusin', onFocus)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  // Enter to start / retry
  useEffect(() => {
    const onKey = (e) => {
      if (
        active &&
        e.key === 'Enter' &&
        (phaseRef.current === 'ready' || phaseRef.current === 'over')
      ) {
        startGame()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, startGame])

  // main loop
  useEffect(() => {
    if (!active || phase !== 'playing') return

    if (pauseStartRef.current) {
      const pauseDur = performance.now() - pauseStartRef.current
      pauseStartRef.current = 0
      statsRef.current.startTime += pauseDur
      lastSpawnRef.current += pauseDur
      lastFrameRef.current = 0
    }

    const tick = (now) => {
      if (!lastFrameRef.current) lastFrameRef.current = now
      const dt = Math.min((now - lastFrameRef.current) / 1000, 0.1)
      lastFrameRef.current = now

      const wrap = wrapRef.current
      const deathY = wrap ? wrap.clientHeight - 64 : 500

      for (const w of wordsRef.current) {
        if (w.done) continue
        w.y += w.speed * dt
        const node = nodesRef.current.get(w.id)
        if (node) {
          node.style.transform = `translate(${w.x}px, ${w.y}px)`
          const danger = w.y + w.fontSize + 64 > deathY
          node.classList.toggle('danger', danger)
        }
        if (w.y + w.fontSize + 6 > deathY) {
          missWord(w)
        }
      }

      const s = statsRef.current
      s.timeLeft = Math.max(0, GAME_SECONDS - (now - s.startTime) / 1000)

      const cfg = DIFF[difficulty]
      if (
        now - lastSpawnRef.current > cfg.spawn &&
        wordsRef.current.filter((w) => !w.done).length < cfg.max
      ) {
        spawnWord(now)
      }

      syncStats()

      if (s.timeLeft <= 0) {
        finishGame()
        return
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      if (phaseRef.current === 'playing') {
        pauseStartRef.current = performance.now()
      }
    }
  }, [active, phase, difficulty, missWord, spawnWord, syncStats, finishGame])

  const focusInput = useCallback(() => {
    if (phaseRef.current !== 'over') {
      inputRef.current && inputRef.current.focus()
    }
  }, [])

  const accent = ACCENTS[mode] || 'var(--green)'

  return (
    <div className="section">
      <HUD stats={stats} accent={accent} />
      <div className="game-wrap cli-console" ref={wrapRef} onClick={focusInput}>
        <div className="deathline" />
        <div className="fx-layer" aria-hidden="true" />
        {words.map((w) => (
          <span
            key={w.id}
            ref={(el) => {
              if (el) nodesRef.current.set(w.id, el)
              else nodesRef.current.delete(w.id)
            }}
            className={
              'falling-word mode-' +
              mode +
              (w.done ? ' pop' : '') +
              (w.typed > 0 ? ' active' : '')
            }
            style={{ fontSize: w.fontSize }}
          >
            {w.matchText === w.label ? (
              <>
                <span className="done">{w.label.slice(0, w.typed)}</span>
                <span className="next">{w.label.slice(w.typed)}</span>
              </>
            ) : (
              <>
                <span className="label">{w.label}</span>
                {w.typed > 0 && (
                  <span className="done"> = {w.matchText.slice(0, w.typed)}</span>
                )}
              </>
            )}
          </span>
        ))}

        {phase === 'ready' && (
          <div className="start-panel">
            <div className="start-sub">{intro || DEFAULT_INTRO}</div>
            <button className="btn" onClick={startGame}>
              Start
            </button>
          </div>
        )}

        {phase === 'over' && (
          <GameOverOverlay stats={stats} accent={accent} onRetry={startGame} />
        )}
      </div>

      <div className={'input-bar' + (phase === 'playing' ? ' live' : '')}>
        <span className="input-prompt" style={{ color: accent }}>
          ❯
        </span>
        <input
          ref={inputRef}
          className="type-input"
          value={buffer}
          onChange={handleInput}
          placeholder={
            phase === 'playing' ? 'type here...' : phase === 'ready' ? 'press any key to start...' : 'press enter to retry'
          }
          disabled={phase === 'over'}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
