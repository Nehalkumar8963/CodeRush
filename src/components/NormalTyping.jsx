import { useState } from 'react'
import GameEngine from './GameEngine.jsx'
import DifficultyPicker from './DifficultyPicker.jsx'
import { WORDS } from '../data/words.js'

export default function NormalTyping({ active }) {
  const [difficulty, setDifficulty] = useState('normal')
  return (
    <>
      <div className="section-head">
        <div className="section-title">
          <b>Normal</b> Typing
        </div>
        <DifficultyPicker value={difficulty} onChange={setDifficulty} />
      </div>
      <GameEngine
        items={WORDS[difficulty]}
        difficulty={difficulty}
        active={active}
        mode="words"
      />
    </>
  )
}
