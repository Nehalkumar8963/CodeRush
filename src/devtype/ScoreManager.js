// ScoreManager — computes statistics from real typing data.

export function computeScore(engine, mode, timeLimitSeconds) {
  const elapsedMs = engine.elapsedMs
  const elapsedMinutes = elapsedMs / 60000

  const wpm =
    elapsedMinutes > 0.01 ? Math.round((engine.correct / 5) / elapsedMinutes) : 0

  const cpm = elapsedMinutes > 0.01 ? Math.round(engine.correct / elapsedMinutes) : 0

  const accuracy =
    engine.totalTyped > 0 ? Math.round((engine.correct / engine.totalTyped) * 100) : 100

  const completion =
    engine.text.length > 0
      ? Math.round((engine.position / engine.text.length) * 100)
      : 0

  const raw = wpm * (accuracy / 100) * 10 + completion * 2
  const score = Math.round(Math.max(0, raw))

  return {
    wpm,
    cpm,
    accuracy,
    correct: engine.correct,
    errors: engine.errors,
    typed: engine.totalTyped,
    completion,
    score,
    timeSeconds: Math.round(elapsedMs / 1000),
    language: '',
    mode,
    timeLimitSeconds: timeLimitSeconds || null,
  }
}
