import { LANGUAGES } from '../devtype/CodeSnippetManager.js'

export default function LanguageSelector({ value, onChange, disabled }) {
  return (
    <div className="dev-lang-select">
      <label className="dev-label">Language</label>
      <select
        className="dev-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {LANGUAGES.map((l) => (
          <option key={l.id} value={l.id}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  )
}
