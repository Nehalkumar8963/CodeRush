import { useState } from 'react'

const SP_PRESETS = [
  { id: '37i9dQZF1DWZeKCadgRdKQ', type: 'playlist', label: 'lofi beats' },
  { id: '37i9dQZF1DX3YSRoSdA634', type: 'playlist', label: 'chill hits' },
  { id: '37i9dQZF1DX4WYpdgoIcn6', type: 'playlist', label: 'coding focus' },
]

function parseSpotify(input) {
  const raw = input.trim()
  if (!raw) return null
  let m = raw.match(/^spotify:(track|playlist|album|episode|show):([A-Za-z0-9]+)/)
  if (m) return { type: m[1], id: m[2] }
  m = raw.match(/open\.spotify\.com\/(?:intl-[a-z]{2}\/)?(track|playlist|album|episode|show)\/([A-Za-z0-9]+)/)
  if (m) return { type: m[1], id: m[2] }
  return null
}

export default function MusicPlayer() {
  const [sp, setSp] = useState({ type: SP_PRESETS[0].type, id: SP_PRESETS[0].id })
  const [input, setInput] = useState('')

  const apply = () => {
    const parsed = parseSpotify(input)
    if (parsed) setSp(parsed)
    setInput('')
  }

  return (
    <div className="music-section">
      <div className="preset-row">
        {SP_PRESETS.map((p) => (
          <button
            key={p.id}
            className={'preset' + (sp.id === p.id ? ' active' : '')}
            onClick={() => setSp({ type: p.type, id: p.id })}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="music-input-row">
        <input
          className="music-input"
          placeholder="paste a spotify link or uri (track / playlist / album)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && apply()}
        />
        <button className="btn small" onClick={apply}>
          Load
        </button>
      </div>
      <div className="embed-box">
        <iframe
          key={sp.type + sp.id}
          src={`https://open.spotify.com/embed/${sp.type}/${sp.id}?utm_source=generator&theme=0`}
          title="Spotify player"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>
  )
}
