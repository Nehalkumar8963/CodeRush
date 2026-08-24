const LABELS = {
  easy: { text: 'Easy', cls: 'active-easy' },
  medium: { text: 'Medium', cls: 'active-medium' },
  normal: { text: 'Normal', cls: 'active-normal' },
  hard: { text: 'Hard', cls: 'active-hard' },
}

export default function DifficultyPicker({ value, onChange }) {
  return (
    <div className="diff-picker">
      {['easy', 'medium', 'normal', 'hard'].map((d) => (
        <button
          key={d}
          className={'diff-btn' + (value === d ? ' ' + LABELS[d].cls : '')}
          onClick={() => onChange(d)}
        >
          {LABELS[d].text}
        </button>
      ))}
    </div>
  )
}
