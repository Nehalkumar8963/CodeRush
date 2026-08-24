export default function GameOverOverlay({ stats, accent, onRetry }) {
  return (
    <div className="overlay">
      <div className="overlay-title" style={{ color: accent }}>
        Game Over
      </div>
      <div className="overlay-sub">
        round complete — here's your run
      </div>
      <div className="stats-grid">
        <div className="stat-box green">
          <div className="num">{stats.score.toLocaleString()}</div>
          <div className="cap">Score</div>
        </div>
        <div className="stat-box yellow">
          <div className="num">{stats.wpm}</div>
          <div className="cap">WPM</div>
        </div>
        <div className="stat-box blue">
          <div className="num">{stats.acc}%</div>
          <div className="cap">Accuracy</div>
        </div>
        <div className="stat-box">
          <div className="num">x{stats.bestCombo}</div>
          <div className="cap">Best Combo</div>
        </div>
      </div>
      <button className="btn" onClick={onRetry}>
        Retry
      </button>
    </div>
  )
}
