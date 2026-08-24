export default function HUD({ stats, accent }) {
  const low = stats.timeLeft <= 10
  return (
    <div className="hud">
      <div className="hud-group">
        <div className="hud-stat">
          <span className="hud-label">Score</span>
          <span className="hud-value">{stats.score.toLocaleString()}</span>
        </div>
        <div className="hud-divider" />
        <div className="hud-stat">
          <span className="hud-label">WPM</span>
          <span className="hud-value wpm">{stats.wpm}</span>
        </div>
        <div className="hud-divider" />
        <div className="hud-stat">
          <span className="hud-label">Accuracy</span>
          <span className="hud-value">{stats.acc}%</span>
        </div>
        <div className="hud-divider" />
        <div className="hud-stat">
          <span className="hud-label">Combo</span>
          <span className="hud-value combo">x{stats.combo}</span>
        </div>
      </div>

      <div className="hud-right">
        <div className="hud-lives" title="lives">
          {[0, 1, 2].map((i) => (
            <span key={i} className={'life' + (i < stats.lives ? '' : ' lost')} />
          ))}
        </div>
        <div className="hud-timer-box">
          <span className="hud-label">Time</span>
          <span className={'hud-value timer' + (low ? ' low' : '')}>
            {Math.ceil(stats.timeLeft)}
          </span>
        </div>
      </div>
    </div>
  )
}
