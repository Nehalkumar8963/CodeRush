// CodeSnippetManager — local snippet database.
// Add a language by adding a key here; snippets are picked at random so
// repeated games do not always show the same code.

export const LANGUAGES = [
  { id: 'typescript', label: 'TypeScript' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'csharp', label: 'C#' },
  { id: 'go', label: 'Go' },
  { id: 'rust', label: 'Rust' },
  { id: 'htmlcss', label: 'HTML/CSS' },
]

const SNIPPETS = {
  typescript: [
    {
      title: 'factorial.ts',
      code: `function factorial(n: number): number {
  if (n < 0) return -1;
  if (n === 0) return 1;

  let result = 1;

  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  return result;
}`,
    },
    {
      title: 'debounce.ts',
      code: `function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait: number = 250
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}`,
    },
    {
      title: 'user.ts',
      code: `interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

class Account {
  private users: User[] = [];

  add(user: User): void {
    this.users.push(user);
  }

  findById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }
}`,
    },
  ],
  javascript: [
    {
      title: 'debounce.js',
      code: `function debounce(fn, wait = 250) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}`,
    },
    {
      title: 'fetch.js',
      code: `async function loadUsers(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}`,
    },
    {
      title: 'flatten.js',
      code: `function flatten(array) {
  return array.reduce((acc, item) => {
    if (Array.isArray(item)) {
      acc.push(...flatten(item));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}`,
    },
  ],
  python: [
    {
      title: 'fizzbuzz.py',
      code: `def fizzbuzz(n):
    for i in range(1, n + 1):
        if i % 15 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)`,
    },
    {
      title: 'quicksort.py',
      code: `def quicksort(items):
    if len(items) <= 1:
        return items
    pivot = items[len(items) // 2]
    left = [x for x in items if x < pivot]
    middle = [x for x in items if x == pivot]
    right = [x for x in items if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
    },
    {
      title: 'fibonacci.py',
      code: `def fibonacci(n):
    memo = {0: 0, 1: 1}

    def fib(k):
        if k not in memo:
            memo[k] = fib(k - 1) + fib(k - 2)
        return memo[k]

    return fib(n)`,
    },
  ],
  java: [
    {
      title: 'FizzBuzz.java',
      code: `public class FizzBuzz {
  public static void main(String[] args) {
    for (int i = 1; i <= 100; i++) {
      if (i % 15 == 0) {
        System.out.println("FizzBuzz");
      } else if (i % 3 == 0) {
        System.out.println("Fizz");
      } else if (i % 5 == 0) {
        System.out.println("Buzz");
      } else {
        System.out.println(i);
      }
    }
  }
}`,
    },
    {
      title: 'BinarySearch.java',
      code: `public static int binarySearch(int[] arr, int target) {
  int low = 0;
  int high = arr.length - 1;

  while (low <= high) {
    int mid = (low + high) / 2;
    if (arr[mid] == target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}`,
    },
    {
      title: 'Person.java',
      code: `public class Person {
  private String name;
  private int age;

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public String getName() {
    return name;
  }

  public int getAge() {
    return age;
  }
}`,
    },
  ],
  cpp: [
    {
      title: 'vector.cpp',
      code: `#include <iostream>
#include <vector>

int main() {
  std::vector<int> numbers = {1, 2, 3, 4, 5};
  int sum = 0;

  for (int n : numbers) {
    sum += n;
  }

  std::cout << "Sum: " << sum << std::endl;
  return 0;
}`,
    },
    {
      title: 'fib.cpp',
      code: `#include <iostream>

int fib(int n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

int main() {
  std::cout << fib(10) << std::endl;
  return 0;
}`,
    },
    {
      title: 'map.cpp',
      code: `#include <iostream>
#include <map>

int main() {
  std::map<std::string, int> ages;
  ages["alice"] = 30;
  ages["bob"] = 25;

  for (const auto& pair : ages) {
    std::cout << pair.first << ": " << pair.second << std::endl;
  }

  return 0;
}`,
    },
  ],
  csharp: [
    {
      title: 'Linq.cs',
      code: `using System;
using System.Linq;

var numbers = new[] { 1, 2, 3, 4, 5, 6 };

var evens = numbers
    .Where(n => n % 2 == 0)
    .Select(n => n * 10)
    .ToArray();

Console.WriteLine(string.Join(", ", evens));`,
    },
    {
      title: 'Async.cs',
      code: `using System;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        string result = await FetchAsync("https://api.dev/data");
        Console.WriteLine(result);
    }

    static Task<string> FetchAsync(string url)
    {
        return Task.FromResult("ok");
    }
}`,
    },
    {
      title: 'Switch.cs',
      code: `public static string Describe(int score)
{
    return score switch
    {
        >= 90 => "Excellent",
        >= 75 => "Good",
        >= 50 => "Pass",
        _ => "Fail"
    };
}`,
    },
  ],
  go: [
    {
      title: 'main.go',
      code: `package main

import "fmt"

func main() {
    messages := make(chan string, 2)
    messages <- "hello"
    messages <- "world"

    fmt.Println(<-messages)
    fmt.Println(<-messages)
}`,
    },
    {
      title: 'defer.go',
      code: `package main

import "fmt"

func readFile(path string) error {
    file, err := os.Open(path)
    if err != nil {
        return err
    }
    defer file.Close()

    fmt.Println("file opened:", path)
    return nil
}`,
    },
    {
      title: 'struct.go',
      code: `package main

import "fmt"

type Point struct {
    X int
    Y int
}

func (p Point) Magnitude() int {
    return p.X*p.X + p.Y*p.Y
}

func main() {
    p := Point{X: 3, Y: 4}
    fmt.Println(p.Magnitude())
}`,
    },
  ],
  rust: [
    {
      title: 'match.rs',
      code: `fn main() {
    let number = 7;

    let result = match number {
        1 => "one",
        2 | 3 | 5 | 7 => "prime",
        10..=20 => "in range",
        _ => "other",
    };

    println!("{}", result);
}`,
    },
    {
      title: 'iter.rs',
      code: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let total: i32 = numbers
        .iter()
        .filter(|n| *n % 2 == 0)
        .map(|n| n * 2)
        .sum();

    println!("total = {}", total);
}`,
    },
    {
      title: 'struct.rs',
      code: `struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle { width: 30, height: 50 };
    println!("area = {}", rect.area());
}`,
    },
  ],
  htmlcss: [
    {
      title: 'card.html',
      code: `<div class="card">
  <h2 class="card-title">Hello World</h2>
  <p class="card-text">A minimal card layout.</p>
  <button class="card-btn">Learn More</button>
</div>

<style>
.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border-radius: 12px;
  background: #111;
  max-width: 320px;
}
</style>`,
    },
    {
      title: 'grid.html',
      code: `<div class="grid">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
</div>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.item {
  padding: 20px;
  background: #222;
  text-align: center;
}
</style>`,
    },
    {
      title: 'button.html',
      code: `<button class="btn">Hover Me</button>

<style>
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: #ffd54a;
  color: #000;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}
</style>`,
    },
  ],
}

export function getSnippets(languageId) {
  return SNIPPETS[languageId] || []
}

export function getRandomSnippet(languageId, excludeTitle = null) {
  const pool = getSnippets(languageId)
  const candidates = pool.length > 1 && excludeTitle
    ? pool.filter((s) => s.title !== excludeTitle)
    : pool
  return candidates[Math.floor(Math.random() * candidates.length)]
}
