import { useMemo } from 'react'
import { CHAR_CORRECT, CHAR_ERROR } from './TypingEngine.js'

export default function TypingUI({ text, statuses, position }) {
  const lines = useMemo(() => {
    const result = []
    let buffer = []

    const flush = () => {
      if (buffer.length) {
        result.push(buffer)
        buffer = []
      }
    }

    for (let i = 0; i < text.length; i++) {
      if (text[i] === '\n') {
        flush()
      } else {
        buffer.push({ pos: i, ch: text[i], status: statuses[i] })
      }
    }
    flush()
    return result
  }, [text, statuses])

  return (
    <div className="dev-code" aria-label="code challenge">
      <div className="dev-code-scroll">
        {lines.map((line, li) => (
          <div key={li} className="dev-line">
            {line.map(({ pos, ch, status }) => (
              <span
                key={pos}
                className={
                  'dev-char' +
                  (status === CHAR_CORRECT ? ' correct' : status === CHAR_ERROR ? ' error' : '') +
                  (pos === position ? ' cursor' : '')
                }
              >
                {ch === ' ' ? '\u00a0' : ch}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
