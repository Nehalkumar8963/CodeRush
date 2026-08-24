// Timer — headless countdown. Started only when typing begins (practice mode
// has no countdown). Uses a self-correcting interval so drift is negligible.

export function createTimer() {
  return {
    limit: null, // seconds or null = practice (no limit)
    remaining: 0,
    running: false,
    intervalId: null,
    onTick: null,
    onExpire: null,
    startAt: 0,
    setLimit(seconds) {
      this.limit = seconds
      this.remaining = seconds
    },
    start() {
      if (this.running || !this.limit) return
      this.running = true
      this.startAt = Date.now()
      this.intervalId = setInterval(() => {
        const elapsed = (Date.now() - this.startAt) / 1000
        this.remaining = Math.max(0, this.limit - elapsed)
        if (this.onTick) this.onTick(Math.ceil(this.remaining))
        if (this.remaining <= 0) {
          this.stop()
          if (this.onExpire) this.onExpire()
        }
      }, 100)
    },
    stop() {
      this.running = false
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    reset() {
      this.stop()
      if (this.limit != null) this.remaining = this.limit
    },
    destroy() {
      this.stop()
    },
  }
}
