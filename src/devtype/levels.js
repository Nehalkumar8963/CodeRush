// Level progression data for DevType — 4 tiers × 10 levels.
// Each level has a fixed snippet (language varies per level) and a time limit.
// Pass rule: complete the snippet with accuracy >= 80%.

export const TIERS = [
  { id: 'easy', label: 'Easy', time: 90 },
  { id: 'medium', label: 'Medium', time: 120 },
  { id: 'hard', label: 'Hard', time: 150 },
  { id: 'elite', label: 'Elite', time: 180 },
]

const L = (num, title, lang, code) => ({ num, title, lang, code })

export const LEVELS = {
  easy: [
    L(1, 'hello world', 'Python', `def greet(name):
    print("Hello, " + name + "!")
    print("Welcome to CodeRush.")

greet("dev")`),
    L(2, 'variables', 'JavaScript', `let score = 100;
const player = "coder";
let level = 3;

console.log(player + " is on level " + level);
console.log("score: " + score);`),
    L(3, 'simple card', 'HTML/CSS', `<div class="card">
  <h2>Profile</h2>
  <p>name: dev</p>
  <button>Edit</button>
</div>

<style>
.card {
  padding: 20px;
  background: #111;
  border-radius: 10px;
}
</style>`),
    L(4, 'main method', 'Java', `public class Main {
  public static void main(String[] args) {
    int age = 25;
    System.out.println("age = " + age);
    System.out.println("ready!");
  }
}`),
    L(5, 'counting loop', 'Python', `total = 0

for i in range(1, 11):
    total += i
    print(i)

print("total =", total)`),
    L(6, 'double it', 'JavaScript', `function double(x) {
  return x * 2;
}

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(double);

console.log(doubled);`),
    L(7, 'std out', 'C++', `#include <iostream>
using namespace std;

int main() {
  string name = "dev";
  int points = 42;
  cout << name << " has " << points << " points" << endl;
  return 0;
}`),
    L(8, 'fmt print', 'Go', `package main

import "fmt"

func main() {
    name := "coder"
    level := 7
    fmt.Printf("%s reached level %d\\n", name, level)
}`),
    L(9, 'typed user', 'TypeScript', `interface Player {
  name: string;
  score: number;
  active: boolean;
}

const p: Player = {
  name: "dev",
  score: 900,
  active: true,
};

console.log(p.name, p.score);`),
    L(10, 'foreach loop', 'C#', `using System;

int[] scores = { 10, 20, 30, 40 };
int total = 0;

foreach (int s in scores)
{
    total += s;
}

Console.WriteLine("total: " + total);`),
  ],
  medium: [
    L(11, 'fizzbuzz', 'Python', `def fizzbuzz(n):
    for i in range(1, n + 1):
        if i % 15 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)

fizzbuzz(15)`),
    L(12, 'map filter', 'JavaScript', `const nums = [1, 2, 3, 4, 5, 6];

const evens = nums
  .filter((n) => n % 2 === 0)
  .map((n) => n * 10);

console.log(evens);`),
    L(13, 'simple class', 'Java', `public class Car {
  private String model;
  private int speed;

  public Car(String model) {
    this.model = model;
    this.speed = 0;
  }

  public void accelerate() {
    speed += 10;
  }
}`),
    L(14, 'vector loop', 'C++', `#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> v = {4, 8, 15, 16};
  int sum = 0;

  for (int x : v) {
    sum += x;
  }

  cout << "sum: " << sum << endl;
  return 0;
}`),
    L(15, 'generics', 'TypeScript', `function first<T>(items: T[]): T | undefined {
  return items[0];
}

const nums = first([1, 2, 3]);
const name = first(["a", "b"]);

console.log(nums, name);`),
    L(16, 'goroutine', 'Go', `package main

import "fmt"

func printLoop(label string) {
    for i := 0; i < 3; i++ {
        fmt.Println(label, i)
    }
}

func main() {
    go printLoop("worker")
    printLoop("main")
}`),
    L(17, 'match result', 'Rust', `fn main() {
    let score = 85;

    let grade = match score {
        90..=100 => "A",
        80..=89 => "B",
        70..=79 => "C",
        _ => "F",
    };

    println!("grade = {}", grade);
}`),
    L(18, 'dictionary', 'Python', `users = {
    "alice": 28,
    "bob": 34,
    "carol": 22,
}

for name, age in users.items():
    print(f"{name} is {age} years old")`),
    L(19, 'async fetch', 'JavaScript', `async function loadData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.items;
  } catch (err) {
    console.error(err.message);
    return [];
  }
}`),
    L(20, 'linq query', 'C#', `using System;
using System.Linq;

var names = new[] { "ann", "bob", "cara", "dan" };

var result = names
    .Where(n => n.Length > 2)
    .Select(n => n.ToUpper())
    .OrderBy(n => n);

Console.WriteLine(string.Join(", ", result));`),
  ],
  hard: [
    L(21, 'debounce', 'TypeScript', `function debounce(fn: Function, wait: number = 250) {
  let timer: number | undefined;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

const save = debounce(() => console.log("saved"), 300);`),
    L(22, 'quicksort', 'Python', `def quicksort(items):
    if len(items) <= 1:
        return items
    pivot = items[len(items) // 2]
    left = [x for x in items if x < pivot]
    middle = [x for x in items if x == pivot]
    right = [x for x in items if x > pivot]
    return quicksort(left) + middle + quicksort(right)

print(quicksort([5, 2, 9, 1, 7]))`),
    L(23, 'binary search', 'Java', `public static int search(int[] arr, int target) {
  int low = 0;
  int high = arr.length - 1;

  while (low <= high) {
    int mid = (low + high) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }

  return -1;
}`),
    L(24, 'recursion', 'C++', `#include <iostream>
using namespace std;

int fibonacci(int n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
  cout << fibonacci(10) << endl;
  return 0;
}`),
    L(25, 'memoize', 'JavaScript', `function memoize(fn) {
  const cache = new Map();

  return (key) => {
    if (cache.has(key)) return cache.get(key);
    const value = fn(key);
    cache.set(key, value);
    return value;
  };
}

const square = memoize((n) => n * n);`),
    L(26, 'select channels', 'Go', `package main

import (
    "fmt"
    "time"
)

func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() { time.Sleep(100 * time.Millisecond); ch1 <- "one" }()
    go func() { ch2 <- "two" }()

    select {
    case msg := <-ch1:
        fmt.Println(msg)
    case msg := <-ch2:
        fmt.Println(msg)
    }
}`),
    L(27, 'iterator chain', 'Rust', `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8];

    let total: i32 = numbers
        .iter()
        .filter(|n| *n % 2 == 0)
        .map(|n| n * 3)
        .sum();

    println!("total = {}", total);
}`),
    L(28, 'switch expression', 'C#', `public static string Grade(int score)
{
    return score switch
    {
        >= 90 => "A",
        >= 80 => "B",
        >= 70 => "C",
        >= 60 => "D",
        _ => "F"
    };
}`),
    L(29, 'decorator', 'Python', `import time

def timed(fn):
    def wrapper(*args):
        start = time.time()
        result = fn(*args)
        print(f"{fn.__name__} took {time.time() - start:.3f}s")
        return result
    return wrapper

@timed
def compute():
    return sum(range(1000))

compute()`),
    L(30, 'typed reduce', 'TypeScript', `type Result = { ok: true; value: number } | { ok: false };

function safeDivide(a: number, b: number): Result {
  if (b === 0) return { ok: false };
  return { ok: true, value: a / b };
}

const result = safeDivide(10, 2);
console.log(result.ok ? result.value : "error");`),
  ],
  elite: [
    L(31, 'lru cache', 'TypeScript', `class LRUCache<K, V> {
  private map = new Map<K, V>();

  constructor(private capacity: number) {}

  get(key: K): V | undefined {
    if (!this.map.has(key)) return undefined;
    const value = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  put(key: K, value: V) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      this.map.delete(this.map.keys().next().value);
    }
  }
}`),
    L(32, 'dijkstra', 'Python', `import heapq

def dijkstra(graph, start):
    dist = {node: float("inf") for node in graph}
    dist[start] = 0
    pq = [(0, start)]

    while pq:
        d, node = heapq.heappop(pq)
        if d > dist[node]:
            continue
        for neighbor, weight in graph[node]:
            nd = d + weight
            if nd < dist[neighbor]:
                dist[neighbor] = nd
                heapq.heappush(pq, (nd, neighbor))

    return dist`),
    L(33, 'streams', 'Java', `import java.util.*;
import java.util.stream.*;

public class Stats {
  public static void main(String[] args) {
    List<Integer> nums = List.of(3, 1, 4, 1, 5, 9, 2);

    double avg = nums.stream()
        .mapToInt(Integer::intValue)
        .average()
        .orElse(0.0);

    System.out.println("average: " + avg);
  }
}`),
    L(34, 'smart pointer', 'C++', `#include <iostream>
#include <memory>
using namespace std;

struct Resource {
  int id;
  Resource(int i) : id(i) {
    cout << "created " << id << endl;
  }
  ~Resource() {
    cout << "freed " << id << endl;
  }
};

int main() {
  unique_ptr<Resource> r = make_unique<Resource>(1);
  cout << "using resource " << r->id << endl;
  return 0;
}`),
    L(35, 'promise pool', 'JavaScript', `async function pool(urls, limit) {
  const results = [];
  const queue = [...urls];

  async function worker() {
    while (queue.length) {
      const url = queue.shift();
      const res = await fetch(url);
      results.push(res.status);
    }
  }

  const workers = Array.from({ length: limit }, () => worker());
  await Promise.all(workers);
  return results;
}`),
    L(36, 'worker select', 'Go', `package main

import (
    "fmt"
    "time"
)

func worker(id int, jobs <-chan int, done chan<- bool) {
    for j := range jobs {
        fmt.Printf("worker %d handling job %d\\n", id, j)
        time.Sleep(50 * time.Millisecond)
    }
    done <- true
}

func main() {
    jobs := make(chan int, 5)
    done := make(chan bool, 2)
    go worker(1, jobs, done)
    go worker(2, jobs, done)

    for i := 1; i <= 5; i++ {
        jobs <- i
    }
    close(jobs)
    <-done
    <-done
}`),
    L(37, 'lifetimes', 'Rust', `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() >= y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let a = String::from("rust");
    let b = String::from("code");
    let result = longest(&a, &b);
    println!("longest = {}", result);
}`),
    L(38, 'async task', 'C#', `using System;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        Task<string> first = FetchAsync("users");
        Task<string> second = FetchAsync("posts");

        string[] results = await Task.WhenAll(first, second);

        foreach (string r in results)
        {
            Console.WriteLine(r);
        }
    }

    static async Task<string> FetchAsync(string path)
    {
        await Task.Delay(100);
        return "loaded: " + path;
    }
}`),
    L(39, 'itertools', 'Python', `from itertools import accumulate, pairwise

def running_max(values):
    return list(accumulate(values, max))

def deltas(values):
    return [b - a for a, b in pairwise(values)]

nums = [3, 1, 4, 1, 5]
print(running_max(nums))
print(deltas(nums))`),
    L(40, 'result monad', 'TypeScript', `type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function map<T, U, E>(r: Result<T, E>, fn: (t: T) => U): Result<U, E> {
  return r.ok ? { ok: true, value: fn(r.value) } : r;
}

const parse = (s: string): Result<number, string> =>
  Number.isNaN(Number(s)) ? { ok: false, error: "nan" } : { ok: true, value: Number(s) };

console.log(map(parse("42"), (n) => n * 2));`),
  ],
}

export const PASS_ACCURACY = 80
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
