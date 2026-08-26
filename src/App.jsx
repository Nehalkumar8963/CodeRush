import { useState } from 'react'
import NormalTyping from './components/NormalTyping.jsx'
import CodingPractice from './components/CodingPractice.jsx'
import MathSection from './components/MathSection.jsx'
import EnemySection from './components/EnemySection.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import TypingGame from './devtype/TypingGame.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import AuthButton from './components/AuthButton.jsx'

const TABS = [
  { id: 'normal', label: 'Normal' },
  { id: 'code', label: 'Code' },
  { id: 'math', label: 'Math' },
  { id: 'enemy', label: 'Enemy' },
  { id: 'devtype', label: 'DevType' },
  { id: 'how', label: 'How It Works' },
  { id: 'music', label: 'Music' },
]

export default function App() {
  const [tab, setTab] = useState('normal')

  return (
    <div className="app">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <header className="topbar">
        <div className="logo">
          Code<em>Rush</em>
        </div>
        <nav className="tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={'tab' + (tab === t.id ? ' active' : '')}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <AuthButton />
      </header>

      <main className="section" style={{ display: tab === 'normal' ? 'flex' : 'none' }}>
        <NormalTyping active={tab === 'normal'} />
      </main>

      <main className="section" style={{ display: tab === 'code' ? 'flex' : 'none' }}>
        <CodingPractice active={tab === 'code'} />
      </main>

      <main className="section" style={{ display: tab === 'math' ? 'flex' : 'none' }}>
        <MathSection active={tab === 'math'} />
      </main>

      <main className="section" style={{ display: tab === 'enemy' ? 'flex' : 'none' }}>
        <EnemySection active={tab === 'enemy'} />
      </main>

      <main className="section" style={{ display: tab === 'devtype' ? 'flex' : 'none' }}>
        <TypingGame active={tab === 'devtype'} />
      </main>

      <main className="section" style={{ display: tab === 'how' ? 'flex' : 'none' }}>
        <HowItWorks />
      </main>

      <main className="section" style={{ display: tab === 'music' ? 'flex' : 'none' }}>
        <MusicPlayer />
      </main>

      <button
        className={'mini-player' + (tab === 'music' ? ' playing' : '')}
        onClick={() => setTab('music')}
        title="music"
      >
        <span className="bar">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="dot" />
        music
      </button>
    </div>
  )
}
