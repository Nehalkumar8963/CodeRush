// TypingEngine — headless typing state machine, independent of UI.
// Tracks progress through a snippet string, correct/error counts and
// per-character status for rendering.

export const CHAR_UNSEEN = 0
export const CHAR_CORRECT = 1
export const CHAR_ERROR = 2

export function createEngine() {
  return {
    text: '',
    statuses: [],
    position: 0,
    correct: 0,
    errors: 0,
    totalTyped: 0,
    complete: false,
    startedAt: 0,
    finishedAt: 0,
    // number of times a wrong key was pressed (for keystroke-level accuracy)
    wrongKeystrokes: 0,
    reset(text) {
      this.text = text
      this.statuses = new Array(text.length).fill(CHAR_UNSEEN)
      this.position = 0
      this.correct = 0
      this.errors = 0
      this.totalTyped = 0
      this.complete = false
      this.startedAt = 0
      this.finishedAt = 0
      this.wrongKeystrokes = 0
    },
    get elapsedMs() {
      if (!this.startedAt) return 0
      const end = this.finishedAt || Date.now()
      return Math.max(0, end - this.startedAt)
    },
    markStarted() {
      if (!this.startedAt) this.startedAt = Date.now()
    },
    markFinished() {
      if (!this.finishedAt) this.finishedAt = Date.now()
      this.complete = true
    },
    get charAt() {
      return this.position < this.text.length ? this.text[this.position] : ''
    },
    isDone() {
      return this.position >= this.text.length
    },
    /**
     * Handle one character typed (or backspace). Returns 'complete' when the
     * snippet is fully typed, otherwise null.
     */
    handleChar(ch) {
      if (this.complete) return null
      if (ch === '\u0008') {
        // backspace
        if (this.position === 0) return null
        const prevPos = this.position - 1
        if (this.statuses[prevPos] === CHAR_CORRECT) {
          this.correct -= 1
        } else if (this.statuses[prevPos] === CHAR_ERROR) {
          this.errors -= 1
        }
        this.statuses[prevPos] = CHAR_UNSEEN
        this.position = prevPos
        return null
      }

      this.markStarted()
      const expected = this.charAt
      this.totalTyped += 1

      if (ch === expected) {
        this.statuses[this.position] = CHAR_CORRECT
        this.correct += 1
        this.position += 1
      } else {
        this.statuses[this.position] = CHAR_ERROR
        this.errors += 1
        this.wrongKeystrokes += 1
        this.position += 1
      }

      if (this.isDone()) {
        this.markFinished()
        return 'complete'
      }
      return null
    },
  }
}
