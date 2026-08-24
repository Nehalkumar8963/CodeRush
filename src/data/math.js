const ri = (min, max) => min + Math.floor(Math.random() * (max - min + 1))
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export function generateMath(difficulty) {
  if (difficulty === 'easy') {
    const kind = pick(['add', 'sub'])
    if (kind === 'add') {
      const a = ri(2, 30)
      const b = ri(2, 30)
      return { text: `${a} + ${b}`, solution: String(a + b) }
    }
    let a = ri(5, 30)
    const b = ri(2, a)
    return { text: `${a} - ${b}`, solution: String(a - b) }
  }

  if (difficulty === 'medium') {
    const kind = pick(['mul', 'chain', 'mix'])
    if (kind === 'mul') {
      const a = ri(3, 12)
      const b = ri(3, 12)
      return { text: `${a} \u00d7 ${b}`, solution: String(a * b) }
    }
    if (kind === 'chain') {
      const a = ri(5, 25)
      const b = ri(2, 15)
      const c = ri(2, Math.min(a + b, 20))
      return { text: `${a} + ${b} - ${c}`, solution: String(a + b - c) }
    }
    const a = ri(3, 9)
    const b = ri(2, 9)
    const c = ri(2, 20)
    return { text: `${a} \u00d7 ${b} + ${c}`, solution: String(a * b + c) }
  }

  // hard
  const kind = pick(['mulmul', 'paren', 'square', 'mulsub'])
  if (kind === 'mulmul') {
    const a = ri(3, 12)
    const b = ri(2, 9)
    const c = ri(2, 12)
    const d = ri(2, 9)
    return { text: `${a} \u00d7 ${b} + ${c} \u00d7 ${d}`, solution: String(a * b + c * d) }
  }
  if (kind === 'paren') {
    const a = ri(3, 15)
    const b = ri(3, 15)
    const c = ri(2, 9)
    return { text: `(${a} + ${b}) \u00d7 ${c}`, solution: String((a + b) * c) }
  }
  if (kind === 'square') {
    const a = ri(3, 12)
    const b = ri(2, 20)
    return { text: `${a}\u00b2 + ${b}`, solution: String(a * a + b) }
  }
  const a = ri(5, 15)
  const b = ri(3, 12)
  const c = ri(2, Math.min(a * b - 2, 25))
  return { text: `${a} \u00d7 ${b} - ${c}`, solution: String(a * b - c) }
}
