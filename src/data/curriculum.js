// All lessons and quizzes defined here
// Add new modules/lessons by extending this array

export const curriculum = [
  {
    id: 'module-1',
    title: 'Hello Python!',
    emoji: '👋',
    color: '#FF6B35',
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'What is Python?',
        xp: 10,
        content: `
# What is Python? 🐍

Python is a **programming language** — a way to talk to computers!

When you write Python code, the computer reads it and does what you tell it to do. It's like giving instructions to a robot! 🤖

Python was created by **Guido van Rossum** in 1991. He named it after the comedy show **Monty Python** — not the snake! 😄

## Why Python is awesome:
- 🟢 Easy to read — it looks almost like English!
- 🌍 Used by NASA, Google, YouTube, and Netflix
- 🎮 You can build games, websites, and robots!

Let's write your **very first program!** Click ▶ Run Code below!
        `,
        starterCode: `# This is your first Python program!
# Lines starting with # are called comments - Python ignores them

print("Hello, World!")
print("My name is Python!")
print("Nice to meet you! 😊")`,
        solution: `print("Hello, World!")
print("My name is Python!")
print("Nice to meet you! 😊")`,
        quiz: {
          id: 'quiz-1-1',
          questions: [
            {
              q: 'What does the print() function do in Python?',
              options: ['It prints on paper 🖨️', 'It shows text on screen 💻', 'It deletes code 🗑️', 'It makes the computer sleep 😴'],
              answer: 1,
            },
            {
              q: 'What symbol starts a comment in Python?',
              options: ['// double slash', '/* star slash', '# hashtag', '-- double dash'],
              answer: 2,
            },
          ],
        },
      },
      {
        id: 'lesson-1-2',
        title: 'Variables — Storing Things!',
        xp: 15,
        content: `
# Variables — Like Magic Boxes! 📦

A **variable** is like a labelled box where you can store things.

\`\`\`
name = "Arjun"
age = 12
\`\`\`

Here, we made two boxes:
- One called **name** holding the text "Arjun"
- One called **age** holding the number 12

## Rules for naming variables:
- ✅ \`my_score\`, \`player_name\`, \`age\`
- ❌ \`2score\` (can't start with a number)
- ❌ \`my score\` (no spaces!)

Try changing the name and age below and run it! 👇
        `,
        starterCode: `# Change these to YOUR name and age!
name = "Arjun"
age = 12
city = "Hyderabad"

print("My name is", name)
print("I am", age, "years old")
print("I live in", city)`,
        solution: `name = "Arjun"
age = 12
city = "Hyderabad"

print("My name is", name)
print("I am", age, "years old")
print("I live in", city)`,
        quiz: {
          id: 'quiz-1-2',
          questions: [
            {
              q: 'Which variable name is correct in Python?',
              options: ['2myname', 'my name', 'my_name', 'my-name'],
              answer: 2,
            },
            {
              q: 'What will print("Age:", 12) show on screen?',
              options: ['"Age:", 12', 'Age: 12', 'age 12', 'Error!'],
              answer: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'module-2',
    title: 'Numbers & Math',
    emoji: '🔢',
    color: '#2EC4B6',
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'Python as a Calculator',
        xp: 15,
        content: `
# Python is a Super Calculator! 🧮

Python can do all kinds of math — and much more than your school calculator!

| Symbol | Operation | Example |
|--------|-----------|---------|
| + | Add | 5 + 3 = 8 |
| - | Subtract | 10 - 4 = 6 |
| * | Multiply | 6 * 7 = 42 |
| / | Divide | 15 / 3 = 5.0 |
| ** | Power | 2 ** 10 = 1024 |
| % | Remainder | 17 % 5 = 2 |

The **%** operator is called **modulo** — it gives you what's left over after dividing!

Try the code below and experiment with your own math! 🎯
        `,
        starterCode: `# Python Calculator!
print("Addition:", 5 + 3)
print("Subtraction:", 100 - 37)
print("Multiplication:", 6 * 7)
print("Division:", 22 / 7)
print("Power:", 2 ** 10)
print("Remainder:", 17 % 5)

# Try your own!
my_age = 12
years_to_18 = 18 - my_age
print("Years to 18:", years_to_18)`,
        solution: `# Python Calculator!
print("Addition:", 5 + 3)
print("Subtraction:", 100 - 37)
print("Multiplication:", 6 * 7)
print("Division:", 22 / 7)
print("Power:", 2 ** 10)
print("Remainder:", 17 % 5)

my_age = 12
years_to_18 = 18 - my_age
print("Years to 18:", years_to_18)`,
        quiz: {
          id: 'quiz-2-1',
          questions: [
            {
              q: 'What does 2 ** 8 equal in Python?',
              options: ['16', '64', '256', '128'],
              answer: 2,
            },
            {
              q: 'What does 10 % 3 give you?',
              options: ['3', '1', '0', '3.33'],
              answer: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'module-3',
    title: 'If & Else',
    emoji: '🤔',
    color: '#9B5DE5',
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'Making Decisions',
        xp: 20,
        content: `
# Making Decisions with If! 🤔

Real programs need to make decisions. That's what **if/else** is for!

\`\`\`python
age = 12
if age >= 18:
    print("You can vote! 🗳️")
else:
    print("Not old enough yet 😅")
\`\`\`

**Important:** Notice the **indentation** (spaces before print). Python uses spaces to know what's inside the if block. Always use 4 spaces!

## Comparison Operators:
| Symbol | Meaning |
|--------|---------|
| == | Equal to |
| != | Not equal |
| > | Greater than |
| < | Less than |
| >= | Greater than or equal |
| <= | Less than or equal |
        `,
        starterCode: `score = 75

if score >= 90:
    print("🌟 Excellent! A grade!")
elif score >= 70:
    print("😊 Good job! B grade!")
elif score >= 50:
    print("📚 Keep studying! C grade")
else:
    print("💪 Don't give up! Try again!")

print("Your score was:", score)`,
        quiz: {
          id: 'quiz-3-1',
          questions: [
            {
              q: 'What does == mean in Python?',
              options: ['Assign a value', 'Check if two things are equal', 'Greater than', 'Not equal'],
              answer: 1,
            },
            {
              q: 'How many spaces should you indent inside an if block?',
              options: ['2 spaces', '3 spaces', '4 spaces', 'Doesn\'t matter'],
              answer: 2,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'module-4',
    title: 'Loops',
    emoji: '🔄',
    color: '#06D6A0',
    lessons: [
      {
        id: 'lesson-4-1',
        title: 'For Loops',
        xp: 25,
        content: `
# For Loops — Do It Again! 🔄

Imagine writing \`print("Hello")\` 100 times. That's painful! 😫

Loops let you **repeat code** easily!

\`\`\`python
for i in range(5):
    print("Hello!", i)
\`\`\`

This prints Hello! five times — with i going from 0 to 4.

**range(n)** generates numbers from 0 to n-1.
**range(1, 6)** generates numbers from 1 to 5.
**range(1, 10, 2)** generates 1, 3, 5, 7, 9 (step of 2)!

You can also loop through **lists**:
\`\`\`python
fruits = ["mango", "banana", "apple"]
for fruit in fruits:
    print("I love", fruit)
\`\`\`
        `,
        starterCode: `# Print a multiplication table!
number = 5

print(f"--- {number} times table ---")
for i in range(1, 11):
    result = number * i
    print(f"{number} x {i} = {result}")`,
        quiz: {
          id: 'quiz-4-1',
          questions: [
            {
              q: 'What does range(3) produce?',
              options: ['1, 2, 3', '0, 1, 2, 3', '0, 1, 2', '1, 2'],
              answer: 2,
            },
            {
              q: 'How many times will this loop run: for i in range(2, 8)?',
              options: ['8 times', '6 times', '7 times', '2 times'],
              answer: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'module-5',
    title: 'Functions',
    emoji: '⚙️',
    color: '#FFD166',
    lessons: [
      {
        id: 'lesson-5-1',
        title: 'Creating Your Own Functions',
        xp: 30,
        content: `
# Functions — Your Own Commands! ⚙️

A **function** is a block of reusable code that you define once and use many times!

\`\`\`python
def greet(name):
    print("Hello,", name, "! 👋")

greet("Priya")
greet("Arjun")
\`\`\`

**def** means you're defining a function.
The word after def is the function's **name**.
Words in brackets are called **parameters** — inputs to the function.

Functions can also **return** values:
\`\`\`python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8
\`\`\`
        `,
        starterCode: `def calculate_area(length, width):
    area = length * width
    return area

def greet_student(name, score):
    print(f"Hey {name}! 👋")
    if score >= 80:
        print("Amazing work! 🌟")
    else:
        print("Keep going! 💪")

# Call the functions!
room_area = calculate_area(10, 8)
print("Room area:", room_area, "square meters")

greet_student("Priya", 92)
greet_student("Arjun", 65)`,
        quiz: {
          id: 'quiz-5-1',
          questions: [
            {
              q: 'What keyword is used to create a function in Python?',
              options: ['function', 'define', 'def', 'create'],
              answer: 2,
            },
            {
              q: 'What does the return statement do?',
              options: ['Prints a value', 'Ends the program', 'Sends a value back from the function', 'Starts a loop'],
              answer: 2,
            },
          ],
        },
      },
    ],
  },
]

// Flatten all lessons for easy lookup
export const allLessons = curriculum.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id, moduleTitle: m.title })))

export function getLessonById(id) {
  return allLessons.find(l => l.id === id)
}

export function getModuleById(id) {
  return curriculum.find(m => m.id === id)
}

export const totalLessons = allLessons.length
