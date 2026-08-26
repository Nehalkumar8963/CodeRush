import { useState } from 'react'
import GameEngine from './GameEngine.jsx'
import DifficultyPicker from './DifficultyPicker.jsx'
import { generateMath } from '../data/math.js'

const INTRO = (
  <>
    solve the falling equations — type the answer.
    <br />
    <b>3 lives</b> · <b>60s</b>
  </>
)

export default function MathSection({ active }) {
  const [difficulty, setDifficulty] = useState('medium')
  return (
    <>
      <div className="section-head">
        <div className="section-title">
          <b style={{ color: 'var(--yellow)' }}>Math</b> Attack
        </div>
        <DifficultyPicker value={difficulty} onChange={setDifficulty} />
      </div>
      <GameEngine
        items={() => generateMath(difficulty)}
        difficulty={difficulty}
        active={active}
        mode="math"
        intro={INTRO}
      />
    </>
  )
}
