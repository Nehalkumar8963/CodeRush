import { useState } from 'react'
import GameEngine from './GameEngine.jsx'
import DifficultyPicker from './DifficultyPicker.jsx'
import { BUGS } from '../data/bugs.js'

const INTRO = (
  <>
    each falling item has <b>one bug</b> — type the corrected version to destroy it.
    <br />
    typing the buggy text as-is won't work · wrong key = error · missed item = <b>-1 life</b> ·{' '}
    <b>3 lives</b> · <b>60s</b>
  </>
)

export default function EnemySection({ active }) {
  const [difficulty, setDifficulty] = useState('medium')
  const [kind, setKind] = useState('words')

  return (
    <>
      <div className="section-head">
        <div className="section-title">
          <b style={{ color: 'var(--red)' }}>Enemy</b> — Spot the Bug
        </div>
        <div className="head-controls">
          <div className="diff-picker">
            <button
              className={'diff-btn' + (kind === 'words' ? ' active-enemy' : '')}
              onClick={() => setKind('words')}
            >
              Words
            </button>
            <button
              className={'diff-btn' + (kind === 'code' ? ' active-enemy' : '')}
              onClick={() => setKind('code')}
            >
              Code
            </button>
          </div>
          <DifficultyPicker value={difficulty} onChange={setDifficulty} />
        </div>
      </div>
      <GameEngine
        items={BUGS[kind][difficulty]}
        difficulty={difficulty}
        active={active}
        mode="enemy"
        intro={INTRO}
      />
    </>
  )
}
