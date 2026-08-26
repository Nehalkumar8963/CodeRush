import { useState } from 'react'
import GameEngine from './GameEngine.jsx'
import DifficultyPicker from './DifficultyPicker.jsx'
import { SNIPPETS } from '../data/snippets.js'

export default function CodingPractice({ active }) {
  const [difficulty, setDifficulty] = useState('easy')
  return (
    <>
      <div className="section-head">
        <div className="section-title">
          <b>Coding</b> Practice
        </div>
        <DifficultyPicker value={difficulty} onChange={setDifficulty} options={['easy', 'medium']} />
      </div>
      <GameEngine
        items={SNIPPETS[difficulty]}
        difficulty={difficulty}
        active={active}
        mode="code"
      />
    </>
  )
}
