import { useCallback, useEffect, useRef, useState } from 'react'
import { createEngine } from './TypingEngine.js'
import { createTimer } from './Timer.js'
import { computeScore } from './ScoreManager.js'
import { getRandomSnippet, LANGUAGES } from './CodeSnippetManager.js'
import LanguageSelector from './LanguageSelector.jsx'
import TypingUI from './TypingUI.jsx'
import TypingResults from './TypingResults.jsx'
import { TIERS, LEVELS, PASS_ACCURACY, loadProgress, saveProgress } from './levels.js'

const TIME_OPTIONS = [
  { value: 15, label: '15s' },
  { value: 30, label: '30s' },
  { value: 60, label: '60s' },
  { value: 120, label: '120s' },
]

const MODES = [
  { id: 'timed', label: 'Timed' },
  { id: 'practice', label: 'Practice' },
]

function tierUnlocked(tierIdx, progress) {
  if (tierIdx === 0) return true
  const prev = TIERS[tierIdx - 1]
  return LEVELS[prev.id].every((lvl) => progress[lvl.num] === true)
}

function levelState(num, tierIdx, progress) {
  if (progress[num]) return 'passed'
  const currentTierLevels = LEVELS[TIERS[tierIdx].id]
  const idx = currentTierLevels.findIndex((l) => l.num === num)
  const isFirstOfTier = idx === 0
  const prevInTier = idx > 0 ? currentTierLevels[idx - 1] : null
  const prevPassed = prevInTier ? progress[prevInTier.num] === true : true
  const prevTierDone = tierIdx === 0 || LEVELS[TIERS[tierIdx - 1].id].every((l) => progress[l.num])
  const isNext = prevPassed && prevTierDone
  return isNext ? 'next' : 'locked'
}

export default function TypingGame({ active }) {
  // free play state
  const [freeMode, setFreeMode] = useState(false)
  const [mode, setMode] = useState('timed')
  const [timeLimit, setTimeLimit] = useState(30)
  const [customTime, setCustomTime] = useState('')
  const [language, setLanguage] = useState('typescript')

  // level state
  const [progress, setProgress] = useState(() => loadProgress())
  const [currentLevel, setCurrentLevel] = useState(null) // { tier, level, snippet }
  const [levelPassed, setLevelPassed] = useState(false)

  // shared game state
  const [snippet, setSnippet] = useState(null)
  const [statuses, setStatuses] = useState([])
  const [position, setPosition] = useState(0)
  const [remaining, setRemaining] = useState(null)
  const [uiState, setUiState] = useState('setup') // setup | running | results
  const [result, setResult] = useState(null)
  const [mobileInput, setMobileInput] = useState('')
  const [hasError, setHasError] = useState(false)

  const engineRef = useRef(createEngine())
  const timerRef = useRef(createTimer())
  const uiStateRef = useRef('setup')
  const mobileRef = useRef(null)
  const mobileValRef = useRef('')
  const activeRef = useRef(active)
  const modeRef = useRef(mode)
  const timeLimitRef = useRef(timeLimit)
  const roundLimitRef = useRef(null)
  const roundModeRef = useRef('timed')
  const snippetRef = useRef(null)
  const currentLevelRef = useRef(null)
  const isMobile = typeof window !== 'undefined' && 'ontouchstart' in window

  activeRef.current = active
  modeRef.current = mode
  timeLimitRef.current = timeLimit
  snippetRef.current = snippet
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
      const computed = computeScore(e, roundModeRef.current, roundLimitRef.current)
      computed.language = lang

      const lvl = currentLevelRef.current
      if (lvl) {
        const passed = e.complete && computed.accuracy >= PASS_ACCURACY
        setLevelPassed(passed)
        if (passed) markLevelPassed(lvl.level.num)
      }

      setResult(computed)
      setMobileInput('')
    },
    [markLevelPassed],
  )

  const startRound = useCallback(
    (lang, modeArg, limitArg, lvl) => {
      const nextSnippet = lvl
        ? { title: `${lvl.tier.label} ${lvl.level.num} — ${lvl.level.title}`, code: lvl.level.code, lang: lvl.level.lang }
        : getRandomSnippet(lang)
      currentLevelRef.current = lvl
      const e = engineRef.current
      e.reset(nextSnippet.code)
      syncFromEngine()

      roundLimitRef.current = limitArg
      roundModeRef.current = modeArg

      const t = timerRef.current
      t.stop()
      if (modeArg === 'timed') {
        t.setLimit(limitArg)
        t.onTick = (secs) => setRemaining(secs)
        t.onExpire = () => finish(lvl ? lvl.level.lang : lang)
      } else {
        t.setLimit(null)
        t.onTick = null
        t.onExpire = null
      }

      uiStateRef.current = 'running'
      setUiState('running')
      setResult(null)
      setRemaining(modeArg === 'timed' ? limitArg : null)
      setSnippet(nextSnippet)
      setHasError(false)
      setLevelPassed(false)
      mobileValRef.current = ''
      setMobileInput('')
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

      if (modeRef.current === 'timed' && !t.running && e.position === 0) {
        t.start()
      }

      const outcome = e.handleChar(ch)
      setHasError(e.wrongKeystrokes > 0)

      if (outcome === 'complete') {
        syncFromEngine()
        const lvl = currentLevelRef.current
        finish(lvl ? lvl.level.lang : snippetRef.current.language)
        return
      }
      syncFromEngine()
    },
    [finish, syncFromEngine],
  )

  // desktop keyboard capture
  useEffect(() => {
    if (!active || isMobile) return

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
      if (e.key.length === 1) {
        e.preventDefault()
        handleChar(e.key)
      }
    }

    window.addEventListener('keydown', onKeyDown, { passive: false })
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, isMobile, handleChar])

  // mobile hidden input + focus watcher
  useEffect(() => {
    if (!isMobile) return
    let focusAt = Date.now()
    let startedByKey = false

    const onFocus = () => {
      focusAt = Date.now()
    }
    const onBlur = () => {
      if (Date.now() - focusAt < 800) {
        startedByKey = true
      }
    }
    const el = mobileRef.current
    if (el) {
      el.addEventListener('focus', onFocus)
      el.addEventListener('blur', onBlur)
    }

    const onKeyDown = (e) => {
      if (!active) return
      if (e.target !== mobileRef.current) {
        if (startedByKey && uiStateRef.current === 'running') {
          mobileRef.current && mobileRef.current.focus()
        }
        startedByKey = false
        return
      }
      startedByKey = false
      if (e.key === 'Backspace') {
        e.preventDefault()
        handleChar('\u0008')
      } else if (e.key.length === 1) {
        e.preventDefault()
        handleChar(e.key)
      }
    }
    window.addEventListener('keydown', onKeyDown, { passive: false })
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (el) {
        el.removeEventListener('focus', onFocus)
        el.removeEventListener('blur', onBlur)
      }
    }
  }, [isMobile, active, handleChar])

  const handleMobileChange = (e) => {
    const value = e.target.value
    const prev = mobileValRef.current
    const prevLen = prev.length

    if (value.length > prevLen) {
      for (let i = prevLen; i < value.length; i++) {
        handleChar(value[i])
      }
    } else if (value.length < prevLen) {
      for (let i = 0; i < prevLen - value.length; i++) {
        handleChar('\u0008')
      }
    }

    mobileValRef.current = value
    setMobileInput('')
  }

  const handlePaste = (e) => {
    if (uiStateRef.current === 'running') {
      e.preventDefault()
    }
  }

  const langLabel = (id) => {
    const l = LANGUAGES.find((x) => x.id === id)
    return l ? l.label : id
  }

  // ---- level actions ----
  const startLevel = (tier, level) => {
    setCurrentLevel({ tier, level })
    startRound(level.lang, 'timed', tier.time, { tier, level })
  }

  const nextLevel = () => {
    const lvl = currentLevelRef.current
    if (!lvl) return backToLevels()
    const tierIdx = TIERS.findIndex((t) => t.id === lvl.tier.id)
    const list = LEVELS[lvl.tier.id]
    const idx = list.findIndex((l) => l.num === lvl.level.num)
    const next = list[idx + 1]
    if (next) {
      startLevel(lvl.tier, next)
    } else {
      backToLevels()
    }
  }

  const backToLevels = () => {
    uiStateRef.current = 'setup'
    setUiState('setup')
    setCurrentLevel(null)
  }

  // ---- free play actions ----
  const tryAgain = () => {
    if (currentLevelRef.current) {
      startLevel(currentLevelRef.current.tier, currentLevelRef.current.level)
    } else {
      startRound(language, mode, mode === 'timed' ? timeLimit : null)
    }
  }
  const changeLanguage = () => {
    uiStateRef.current = 'setup'
    setUiState('setup')
  }
  const changeTime = () => {
    uiStateRef.current = 'setup'
    setUiState('setup')
  }
  const goPractice = () => {
    setMode('practice')
    startRound(language, 'practice', null)
  }

  const startFromSetup = () => {
    const limit =
      mode === 'timed' ? (customTime ? Math.min(600, parseInt(customTime, 10) || 30) : timeLimit) : null
    startRound(language, mode, limit)
  }

  // ---- render ----

  if (uiState === 'setup' && !freeMode) {
    return (
      <div className="devtype">
        <div className="dev-levels">
          <div className="dev-setup-title">
            Code Levels
            <button className="dev-pill free-toggle" onClick={() => setFreeMode(true)}>
              Free Play
            </button>
          </div>

          {TIERS.map((tier, tierIdx) => {
            const unlocked = tierUnlocked(tierIdx, progress)
            const passedCount = LEVELS[tier.id].filter((l) => progress[l.num]).length
            return (
              <div key={tier.id} className={'dev-tier' + (unlocked ? '' : ' locked')}>
                <div className="dev-tier-head">
                  <span className="dev-tier-label">{tier.label}</span>
                  <span className="dev-tier-progress-text">
                    {passedCount}/{LEVELS[tier.id].length}
                  </span>
                  <div className="dev-tier-bar">
                    <div
                      className="dev-tier-bar-fill"
                      style={{ width: `${(passedCount / LEVELS[tier.id].length) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="dev-level-grid">
                  {LEVELS[tier.id].map((lvl) => {
                    const state = unlocked ? levelState(lvl.num, tierIdx, progress) : 'locked'
                    return (
                      <button
                        key={lvl.num}
                        className={'dev-level-btn ' + state}
                        disabled={state === 'locked'}
                        onClick={() => startLevel(tier, lvl)}
                        title={`${lvl.title} — ${lvl.lang}`}
                      >
                        <span className="dev-level-num">{lvl.num}</span>
                        <span className="dev-level-name">{lvl.title}</span>
                        <span className="dev-level-lang">{lvl.lang}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="devtype">
      {uiState === 'setup' && (
        <div className="dev-setup">
          <div className="dev-setup-title">
            Free Play
            <button className="dev-pill free-toggle" onClick={() => setFreeMode(false)}>
              Levels
            </button>
          </div>

          <div className="dev-mode-row">
            {MODES.map((m) => (
              <button
                key={m.id}
                className={'dev-pill' + (mode === m.id ? ' active' : '')}
                onClick={() => setMode(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>

          {mode === 'timed' && (
            <>
              <div className="dev-time-row">
                {TIME_OPTIONS.map((t) => (
                  <button
                    key={t.value}
                    className={
                      'dev-pill' + (timeLimit === t.value && !customTime ? ' active' : '')
                    }
                    onClick={() => {
                      setCustomTime('')
                      setTimeLimit(t.value)
                    }}
                  >
                    {t.label}
                  </button>
                ))}
                <button
                  className={'dev-pill' + (customTime ? ' active' : '')}
                  onClick={() => setCustomTime(customTime || '45')}
                >
                  Custom
                </button>
              </div>
              {customTime && (
                <div className="dev-custom-row">
                  <input
                    className="dev-custom-input"
                    type="number"
                    min="5"
                    max="600"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    placeholder="seconds"
                  />
                  <span className="dev-custom-note">seconds</span>
                </div>
              )}
            </>
          )}

          <LanguageSelector value={language} onChange={setLanguage} />

          <button className="dev-btn primary big" onClick={startFromSetup}>
            Start Typing
          </button>
        </div>
      )}

      {(uiState === 'running' || uiState === 'results') && snippet && (
        <div className="dev-play">
          <div className="dev-play-top">
            <div className="dev-chip">
              <span className="dev-chip-label">
                {currentLevel ? `${currentLevel.tier.label} · ${currentLevel.level.num}` : langLabel(language)}
              </span>
              <span className="dev-chip-title">{snippet.title}</span>
            </div>
            <div className={'dev-timer' + (remaining != null && remaining <= 10 ? ' low' : '')}>
              {remaining != null ? remaining : 'practice'}
            </div>
          </div>

          <div className="dev-live-stats cli-stats">
            <span>
              wpm <b>{uiState === 'running' ? computeLiveWpm(engineRef.current) : result?.wpm}</b>
            </span>
            <span>
              cpm <b>{uiState === 'running' ? computeLiveCpm(engineRef.current) : result?.cpm}</b>
            </span>
            <span>
              acc <b>{uiState === 'running' ? computeLiveAcc(engineRef.current) : result?.accuracy}%</b>
            </span>
            <span>
              pos <b>{position}</b>
            </span>
            <span>
              len <b>{snippet.code.length}</b>
            </span>
            <span>
              err <b className="red">{engineRef.current.errors}</b>
            </span>
          </div>

          <TypingUI text={snippet.code} statuses={statuses} position={position} />

          {uiState === 'running' && (
            <div
              className={'dev-input-row' + (hasError ? ' shake' : '')}
              onAnimationEnd={() => setHasError(false)}
            >
              {isMobile ? (
                <div className="cli-mobile-input-wrap">
                  <span className="input-prompt">❯</span>
                  <input
                    ref={mobileRef}
                    className="dev-mobile-input"
                    value={mobileInput}
                    onChange={handleMobileChange}
                    onPaste={handlePaste}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder="tap here and type..."
                  />
                </div>
              ) : (
                <div className="dev-hint cli-hint">
                  <span className="input-prompt">❯</span> start typing — timer runs on your first
                  keystroke
                </div>
              )}
            </div>
          )}

          {uiState === 'results' && result && (
            <TypingResults
              result={result}
              levelMode={!!currentLevel}
              levelPassed={levelPassed}
              onTryAgain={tryAgain}
              onNextLevel={nextLevel}
              onChangeLanguage={changeLanguage}
              onChangeTime={changeTime}
              onPractice={goPractice}
            />
          )}
        </div>
      )}
    </div>
  )
}

function computeLiveWpm(e) {
  const mins = e.elapsedMs / 60000
  return mins > 0.01 ? Math.round(e.correct / 5 / mins) : 0
}

function computeLiveCpm(e) {
  const mins = e.elapsedMs / 60000
  return mins > 0.01 ? Math.round(e.correct / mins) : 0
}

function computeLiveAcc(e) {
  return e.totalTyped > 0 ? Math.round((e.correct / e.totalTyped) * 100) : 100
}
