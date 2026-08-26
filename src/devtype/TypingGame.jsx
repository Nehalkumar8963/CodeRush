import { useCallback, useEffect, useRef, useState } from 'react'
import { createEngine } from './TypingEngine.js'
import { createTimer } from './Timer.js'
import { computeScore } from './ScoreManager.js'
import { LEVELS, loadProgress, saveProgress } from './levels.js'

export default function TypingGame({ active }) {
  const [progress, setProgress] = useState(() => loadProgress())
  const [currentLevel, setCurrentLevel] = useState(null) // level object
  const [uiState, setUiState] = useState('setup') // setup | running | results
  const [statuses, setStatuses] = useState([])
  const [position, setPosition] = useState(0)
  const [remaining, setRemaining] = useState(null)
  const [result, setResult] = useState(null)
  const [levelPassed, setLevelPassed] = useState(false)
  const [errorFlash, setErrorFlash] = useState(false)

  const engineRef = useRef(createEngine())
  const timerRef = useRef(createTimer())
  const uiStateRef = useRef('setup')
  const activeRef = useRef(active)
  const currentLevelRef = useRef(null)

  activeRef.current = active
  currentLevelRef.current = currentLevel

  const syncFromEngine = useCallback(() => {
    const e = engineRef.current
    setStatuses(e.statuses.slice())
    setPosition(e.position)
  }, [])

  const markLevelPassed = useCallback((num) => {
    setProgress((prev) => {
      if (prev[num]) return prev
      const next = { ...prev, [num]: true }
      saveProgress(next)
      return next
    })
  }, [])

  const finish = useCallback(
    (lang) => {
      if (uiStateRef.current === 'results') return
      uiStateRef.current = 'results'
      setUiState('results')
      const e = engineRef.current
      e.markFinished()
      timerRef.current.stop()
      const computed = computeScore(e, 'timed', null)
      computed.language = lang

      const lvl = currentLevelRef.current
      if (lvl) {
        const passed = e.complete && computed.accuracy >= 85
        setLevelPassed(passed)
        if (passed) markLevelPassed(lvl.num)
      }

      setResult(computed)
    },
    [markLevelPassed],
  )

  const startRound = useCallback(
    (lvl) => {
      const e = engineRef.current
      e.reset(lvl.code)
      syncFromEngine()

      const t = timerRef.current
      t.stop()
      t.setLimit(lvl.time || 120)
      t.onTick = (secs) => setRemaining(secs)
      t.onExpire = () => finish(lvl.lang)

      uiStateRef.current = 'running'
      setUiState('running')
      setResult(null)
      setRemaining(lvl.time || 120)
      setLevelPassed(false)
    },
    [finish, syncFromEngine],
  )

  useEffect(() => {
    return () => {
      timerRef.current.destroy()
    }
  }, [])

  const handleChar = useCallback(
    (ch) => {
      if (uiStateRef.current !== 'running') return
      const e = engineRef.current
      const t = timerRef.current

      if (!t.running && e.position === 0) {
        t.start()
      }

      const outcome = e.handleChar(ch)

      if (outcome === 'error') {
        setErrorFlash(true)
        setTimeout(() => setErrorFlash(false), 200)
      }

      if (outcome === 'complete') {
        syncFromEngine()
        const lvl = currentLevelRef.current
        finish(lvl ? lvl.lang : '')
        return
      }
      syncFromEngine()
    },
    [finish, syncFromEngine],
  )

  // desktop keyboard capture
  useEffect(() => {
    if (!active) return

    const onKeyDown = (e) => {
      if (uiStateRef.current !== 'running') return
      const tag = e.target && e.target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.ctrlKey || e.metaKey || e.altKey) return

      if (e.key === 'Backspace') {
        e.preventDefault()
        handleChar('\u0008')
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        handleChar('\n')
        return
      }
      if (e.key.length === 1) {
        e.preventDefault()
        handleChar(e.key)
      }
    }

    window.addEventListener('keydown', onKeyDown, { passive: false })
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, handleChar])

  const startLevel = (lvl) => {
    setCurrentLevel(lvl)
    startRound(lvl)
  }

  const nextLevel = () => {
    const lvl = currentLevelRef.current
    if (!lvl) return backToLevels()
    const idx = LEVELS.findIndex((l) => l.num === lvl.num)
    const next = LEVELS[idx + 1]
    if (next) {
      startLevel(next)
    } else {
      backToLevels()
    }
  }

  const backToLevels = () => {
    uiStateRef.current = 'setup'
    setUiState('setup')
    setCurrentLevel(null)
  }

  const retryLevel = () => {
    const lvl = currentLevelRef.current
    if (lvl) startLevel(lvl)
  }

  const passedCount = LEVELS.filter((l) => progress[l.num]).length
  const firstUnlocked = LEVELS.find((l) => !progress[l.num]) || LEVELS[LEVELS.length - 1]

  // ---------- render ----------

  if (uiState === 'setup') {
    return (
      <div className="devtype">
        <div className="dev-setup">
          <div className="dev-setup-title">
            Code Levels
            <span className="dev-progress">
              {passedCount} / {LEVELS.length}
            </span>
          </div>

          <div className="dev-progress-bar">
            <div
              className="dev-progress-fill"
              style={{ width: `${(passedCount / LEVELS.length) * 100}%` }}
            />
          </div>

          <div className="dev-level-grid">
            {LEVELS.map((lvl) => {
              const passed = progress[lvl.num]
              const isNext = lvl.num === firstUnlocked.num
              return (
                <button
                  key={lvl.num}
                  className={
                    'dev-level-btn' + (passed ? ' passed' : '') + (isNext && !passed ? ' next' : '')
                  }
                  disabled={!passed && !isNext}
                  onClick={() => startLevel(lvl)}
                  title={`${lvl.title} — ${lvl.lang}`}
                >
                  <span className="dev-level-num">{String(lvl.num).padStart(2, '0')}</span>
                  <span className="dev-level-name">{lvl.title}</span>
                  <span className="dev-level-lang">{lvl.lang}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const lvl = currentLevel

  return (
    <div className="devtype">
      <div className="dev-play">
        <div className="dev-play-top">
          <div className="dev-chip">
            <span className="dev-chip-label">
              {String(lvl.num).padStart(2, '0')} · {lvl.lang}
            </span>
            <span className="dev-chip-title">{lvl.title}</span>
          </div>
          <div className={'dev-timer' + (remaining != null && remaining <= 10 ? ' low' : '')}>
            {remaining != null ? remaining : '--'}
          </div>
        </div>

        <div className="dev-live-stats cli-stats">
          <span>
            wpm <b>{computeLiveWpm(engineRef.current)}</b>
          </span>
          <span>
            acc <b>{computeLiveAcc(engineRef.current)}%</b>
          </span>
          <span>
            pos <b>{position}</b>
          </span>
          <span>
            len <b>{lvl.code.length}</b>
          </span>
          <span>
            err <b className="red">{engineRef.current.errors}</b>
          </span>
        </div>

        <div className="dev-code" aria-label="code challenge">
          <div className="dev-code-scroll">
            {lvl.code.split('\n').map((line, li) => {
              let offset = 0
              for (let i = 0; i < li; i++) {
                offset += lvl.code.split('\n')[i].length + 1
              }
              return (
                <div key={li} className="dev-line">
                  <span className="dev-line-num">{li + 1}</span>
                  {line.split('').map((ch, ci) => {
                    const pos = offset + ci
                    const status = statuses[pos]
                    return (
                      <span
                        key={pos}
                        className={
                          'dev-char' +
                          (status === 1 ? ' correct' : status === 2 ? ' error' : '') +
                          (pos === position ? ' cursor' : '') +
                          (errorFlash && pos === position ? ' error-flash' : '')
                        }
                      >
                        {ch === ' ' ? '\u00a0' : ch}
                      </span>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        {uiState === 'running' && (
          <div className="dev-input-row">
            <div className="dev-hint cli-hint">
              <span className="input-prompt">❯</span> start typing — timer runs on your first
              keystroke
            </div>
          </div>
        )}

        {uiState === 'results' && result && (
          <div className="dev-results-overlay">
            <div className="dev-results">
              <div className={'dev-level-result' + (levelPassed ? ' passed' : ' failed')}>
                {levelPassed
                  ? 'Level Complete ✓'
                  : 'Level Failed — accuracy below 85%'}
              </div>
              <div className="dev-results-title">Results</div>
              <div className="dev-results-grid">
                <div className="dev-stat">
                  <div className="dev-stat-num gold">{result.wpm}</div>
                  <div className="dev-stat-label">WPM</div>
                </div>
                <div className="dev-stat">
                  <div className="dev-stat-num">{result.accuracy}%</div>
                  <div className="dev-stat-label">Accuracy</div>
                </div>
                <div className="dev-stat">
                  <div className="dev-stat-num red">{result.errors}</div>
                  <div className="dev-stat-label">Errors</div>
                </div>
              </div>
              <div className="dev-results-meta">
                <span>
                  Language: <b>{result.language}</b>
                </span>
                <span>
                  Completion: <b>{result.completion}%</b>
                </span>
                <span>
                  Time: <b>{result.timeSeconds}s</b>
                </span>
              </div>
              <div className="dev-results-actions">
                {levelPassed && (
                  <button className="dev-btn primary" onClick={nextLevel}>
                    Next Level
                  </button>
                )}
                <button className="dev-btn" onClick={retryLevel}>
                  Retry
                </button>
                <button className="dev-btn" onClick={backToLevels}>
                  All Levels
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function computeLiveWpm(e) {
  const mins = e.elapsedMs / 60000
  return mins > 0.01 ? Math.round(e.correct / 5 / mins) : 0
}

function computeLiveAcc(e) {
  return e.totalTyped > 0 ? Math.round((e.correct / e.totalTyped) * 100) : 100
}
