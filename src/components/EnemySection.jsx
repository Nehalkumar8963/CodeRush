import GameEngine from './GameEngine.jsx'
import { BUGS } from '../data/bugs.js'

const INTRO = (
  <>
    find the bug — type the corrected version to destroy it.
    <br />
    <b>3 lives</b> · <b>60s</b>
  </>
)

export default function EnemySection({ active }) {
  return (
    <>
      <div className="section-head">
        <div className="section-title">
          <b style={{ color: 'var(--red)' }}>Enemy</b> — Spot the Bug
        </div>
      </div>
      <GameEngine
        items={BUGS.words.easy}
        difficulty="easy"
        active={active}
        mode="enemy"
        intro={INTRO}
      />
    </>
  )
}
