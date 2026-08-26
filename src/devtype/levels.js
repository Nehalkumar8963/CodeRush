// DevType level progression — small, realistic code snippets ordered
// from beginner to advanced. Each level must be typed exactly.

export const LEVELS = [
  // ---- Tier 1: basics ----
  { num: 1, title: 'hello world', lang: 'JavaScript', code: `console.log("Hello, world!");` },
  { num: 2, title: 'variables', lang: 'JavaScript', code: `let score = 100;
let name = "dev";
console.log(name, score);` },
  { num: 3, title: 'simple function', lang: 'JavaScript', code: `function double(x) {
  return x * 2;
}` },
  { num: 4, title: 'conditionals', lang: 'JavaScript', code: `if (age >= 18) {
  console.log("adult");
} else {
  console.log("minor");
}` },
  { num: 5, title: 'loops', lang: 'JavaScript', code: `let total = 0;
for (let i = 1; i <= 10; i++) {
  total += i;
}` },
  // ---- Tier 2: arrays & objects ----
  { num: 6, title: 'arrays', lang: 'JavaScript', code: `const fruits = ["apple", "banana"];
fruits.push("cherry");
console.log(fruits.length);` },
  { num: 7, title: 'objects', lang: 'JavaScript', code: `const user = {
  name: "CodeRush",
  age: 3,
};
console.log(user.name);` },
  { num: 8, title: 'map & filter', lang: 'JavaScript', code: `const nums = [1, 2, 3, 4];
const doubled = nums.map(n => n * 2);
console.log(doubled);` },
  { num: 9, title: 'python basics', lang: 'Python', code: `def greet(name):
    return f"Hello {name}"` },
  { num: 10, title: 'python loops', lang: 'Python', code: `total = 0
for i in range(1, 11):
    total += i
print(total)` },
  // ---- Tier 3: intermediate ----
  { num: 11, title: 'typescript types', lang: 'TypeScript', code: `interface User {
  name: string;
  age: number;
}
const u: User = { name: "dev", age: 30 };` },
  { num: 12, title: 'async await', lang: 'JavaScript', code: `async function fetchUser() {
  const res = await fetch("/api/user");
  return res.json();
}` },
  { num: 13, title: 'destructuring', lang: 'JavaScript', code: `const [first, second] = [1, 2];
const { name, age } = user;
console.log(first, name);` },
  { num: 14, title: 'sql query', lang: 'SQL', code: `SELECT * FROM users
WHERE age > 18
ORDER BY name;` },
  { num: 15, title: 'java main', lang: 'Java', code: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello");
  }
}` },
  // ---- Tier 4: advanced ----
  { num: 16, title: 'closures', lang: 'JavaScript', code: `function makeCounter() {
  let count = 0;
  return () => ++count;
}` },
  { num: 17, title: 'recursion', lang: 'Python', code: `def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)` },
  { num: 18, title: 'go routines', lang: 'Go', code: `func main() {
  go printLoop("worker")
  printLoop("main")
}` },
  { num: 19, title: 'rust ownership', lang: 'Rust', code: `fn main() {
  let s = String::from("hello");
  println!("{}", s);
}` },
  { num: 20, title: 'final challenge', lang: 'TypeScript', code: `type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };` },
]

export const STORAGE_KEY = 'coderush-devtype-progress'

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // storage unavailable — progress is session-only
  }
}
