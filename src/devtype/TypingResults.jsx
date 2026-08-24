export default function TypingResults({
  result,
  levelMode,
  levelPassed,
  onTryAgain,
  onNextLevel,
  onChangeLanguage,
  onChangeTime,
  onPractice,
}) {
  return (
    <div className="dev-results-overlay">
      <div className="dev-results">
        {levelMode && (
          <div className={'dev-level-result' + (levelPassed ? ' passed' : ' failed')}>
            {levelPassed ? 'Level Complete ✓' : 'Level Failed — accuracy below 80%'}
          </div>
        )}
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
            <div className="dev-stat-num">{result.correct}</div>
            <div className="dev-stat-label">Correct</div>
          </div>
          <div className="dev-stat">
            <div className="dev-stat-num red">{result.errors}</div>
            <div className="dev-stat-label">Errors</div>
          </div>
          <div className="dev-stat">
            <div className="dev-stat-num gold">{result.score}</div>
            <div className="dev-stat-label">Score</div>
          </div>
          <div className="dev-stat">
            <div className="dev-stat-num">{result.timeSeconds}s</div>
            <div className="dev-stat-label">Time</div>
          </div>
        </div>
        <div className="dev-results-meta">
          <span>
            Language: <b>{result.language}</b>
          </span>
          <span>
            Mode: <b>{result.mode === 'practice' ? 'Practice' : 'Timed'}</b>
          </span>
          <span>
            Completion: <b>{result.completion}%</b>
          </span>
          <span>
            CPM: <b>{result.cpm}</b>
          </span>
        </div>
        <div className="dev-results-actions">
          {levelMode ? (
            <>
              {levelPassed && (
                <button className="dev-btn primary" onClick={onNextLevel}>
                  Next Level
                </button>
              )}
              <button className="dev-btn" onClick={onTryAgain}>
                Retry Level
              </button>
              <button className="dev-btn" onClick={onChangeTime}>
                All Levels
              </button>
            </>
          ) : (
            <>
              <button className="dev-btn primary" onClick={onTryAgain}>
                Try Again
              </button>
              <button className="dev-btn" onClick={onChangeLanguage}>
                Change Language
              </button>
              <button className="dev-btn" onClick={onChangeTime}>
                Change Time
              </button>
              <button className="dev-btn" onClick={onPractice}>
                Practice Mode
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
