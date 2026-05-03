// Comprehensive Python curriculum — fully rewritten
// HTML uses classes: lesson-title, lesson-intro, analogy-box, tip-box, warn-box,
// code-block, quiz-section, quiz-q, quiz-opts, qopt (onclick qa(this,bool)), qcode

export const LESSONS = [

// ─────────────────────────────────────────────
// SECTION 1 — FOUNDATIONS
// ─────────────────────────────────────────────

{
  id: 'lesson-0',
  title: 'What is Python?',
  starter: `# Python is running right here in your browser!
print("Hello, Python!")
print("Python was created in 1991")
print("It's one of the most popular languages in the world")`,
  content: `
<h2 class="lesson-title">What is Python?</h2>
<p class="lesson-intro">Python is a programming language — a precise way of giving instructions to a computer. It was created by <strong>Guido van Rossum</strong> and first released in 1991. Today it powers everything from Instagram and YouTube to NASA simulations and AI research.</p>

<div class="analogy-box">
  <strong>Think of it like this:</strong> A computer is incredibly fast but also incredibly dumb — it only does exactly what you tell it. Python is how you tell it. It's one of the clearest, most readable languages ever designed.
</div>

<h3>What Python is used for</h3>
<ul>
  <li><strong>Web development</strong> — Django and Flask power millions of sites</li>
  <li><strong>Data science & AI</strong> — NumPy, Pandas, TensorFlow, PyTorch</li>
  <li><strong>Automation</strong> — scripting repetitive tasks, file handling</li>
  <li><strong>Game development</strong> — Pygame and more</li>
  <li><strong>Scientific computing</strong> — used in physics, biology, finance</li>
</ul>

<h3>Why Python specifically?</h3>
<ul>
  <li>Reads almost like English — far less noise than C++ or Java</li>
  <li>Vast ecosystem of libraries — someone has likely already solved your problem</li>
  <li>Cross-platform — same code runs on Windows, Mac, Linux</li>
  <li>Interpreted — run code instantly without a separate compile step</li>
</ul>

<div class="tip-box">
  <strong>On this platform</strong> — you don't need to install anything. Python runs directly in your browser using a technology called Pyodide. Every lesson has a live editor — use it.
</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>Who created Python?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">Linus Torvalds</button>
      <button class="qopt" onclick="qa(this,true)">Guido van Rossum</button>
      <button class="qopt" onclick="qa(this,false)">James Gosling</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>Python is used in which fields?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">Only web development</button>
      <button class="qopt" onclick="qa(this,false)">Only games</button>
      <button class="qopt" onclick="qa(this,true)">AI, web, science, automation and more</button>
    </div>
  </div>
</div>
`,
},

{
  id: 'lesson-1',
  title: 'print() — Output & Syntax',
  starter: `# print() shows output on screen
print("Hello, World!")

# You can print multiple things
print("Python", "is", "great")

# Printing numbers
print(42)
print(3.14)

# Using sep and end
print("one", "two", "three", sep=" | ")
print("no newline here", end=" ")
print("<- same line")`,
  content: `
<h2 class="lesson-title">print() — Output & Syntax</h2>
<p class="lesson-intro"><code>print()</code> is Python's built-in function for displaying output. It's usually the first thing you learn, but there's more to it than just <code>print("hello")</code>.</p>

<h3>Basic usage</h3>
<div class="code-block">print("Hello, World!")</div>

<p>You can print strings (text in quotes), numbers, or variables:</p>
<div class="code-block">print("text")   # a string
print(42)        # an integer
print(3.14)      # a float</div>

<h3>Printing multiple values</h3>
<p>Pass multiple arguments separated by commas — Python adds a space between them by default:</p>
<div class="code-block">print("Score:", 100, "points")</div>

<h3>sep and end</h3>
<p>Control how values are separated and what goes at the end of the line:</p>
<div class="code-block">print("a", "b", "c", sep="-")       # a-b-c
print("loading", end="...")          # no newline
print("done")                        # loading...done</div>

<h3>Python indentation</h3>
<p>Unlike most languages, Python uses <strong>indentation (spaces) to define blocks of code</strong>, not curly braces. This is enforced — wrong indentation is a syntax error.</p>
<div class="code-block">if True:
    print("indented correctly")  # 4 spaces

# This would crash:
# if True:
# print("bad indentation")</div>

<div class="tip-box"><strong>Standard:</strong> always use 4 spaces for indentation. Never mix tabs and spaces.</div>

<div class="warn-box"><strong>Strings must be quoted.</strong> <code>print(hello)</code> tries to find a variable called <code>hello</code>. <code>print("hello")</code> prints the text hello. These are very different.</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>What does this print? <span class="qcode">print("x", "y", sep="-")</span></p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">x y</button>
      <button class="qopt" onclick="qa(this,true)">x-y</button>
      <button class="qopt" onclick="qa(this,false)">xy</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>Python uses ___ to define code blocks.</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">Curly braces {}</button>
      <button class="qopt" onclick="qa(this,true)">Indentation (spaces)</button>
      <button class="qopt" onclick="qa(this,false)">Parentheses ()</button>
    </div>
  </div>
</div>
`,
},

{
  id: 'lesson-2',
  title: 'Comments',
  starter: `# This is a single-line comment
print("Comments help explain your code")

# You can comment out code to disable it temporarily
# print("this won't run")

x = 10  # inline comment after code

# Multi-line comments use triple quotes (technically a string, not assigned)
"""
This is a multi-line
comment block.
Python ignores it.
"""
print("done")`,
  content: `
<h2 class="lesson-title">Comments</h2>
<p class="lesson-intro">Comments are notes in your code that Python completely ignores when running. They exist for humans — you, your teammates, or future-you who has forgotten what the code does.</p>

<h3>Single-line comments</h3>
<p>Start with <code>#</code>. Everything after it on that line is ignored.</p>
<div class="code-block"># This entire line is a comment
print("Hello")  # This part is a comment; the print still runs</div>

<h3>Disabling code</h3>
<p>Commenting out code is a common debugging technique:</p>
<div class="code-block">print("this runs")
# print("this is disabled")
print("this runs too")</div>

<h3>Multi-line comments</h3>
<p>Python has no dedicated multi-line comment syntax. Two approaches:</p>
<div class="code-block"># Option 1: multiple # lines
# This is line one
# This is line two

# Option 2: triple-quoted string (not assigned to variable)
"""
This block is technically a string literal
but since nothing uses it, Python ignores it.
Commonly used as multi-line comments.
"""</div>

<div class="tip-box">
  <strong>Good comments explain WHY, not WHAT.</strong><br>
  Bad: <code># add 1 to x</code><br>
  Good: <code># compensate for zero-based indexing</code>
</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>Which line starts a comment in Python?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">// This is a comment</button>
      <button class="qopt" onclick="qa(this,true)"># This is a comment</button>
      <button class="qopt" onclick="qa(this,false)">/* This is a comment */</button>
    </div>
  </div>
</div>
`,
},

{
  id: 'lesson-3',
  title: 'Variables',
  starter: `# Assigning variables
name = "Priya"
age = 15
score = 98.5
is_active = True

print(name, "is", age, "years old")
print("Score:", score)

# Variables can be reassigned
age = 16
print("Next year:", age)

# Multiple assignment
x = y = z = 0
print(x, y, z)

a, b, c = 1, 2, 3
print(a, b, c)`,
  content: `
<h2 class="lesson-title">Variables</h2>
<p class="lesson-intro">A variable is a named container for storing a value. In Python, you create a variable simply by assigning to it — no declaration, no type annotation required (though you can add one).</p>

<h3>Creating variables</h3>
<div class="code-block">name = "Arjun"     # string
age  = 17          # integer
gpa  = 9.2         # float
active = True      # boolean</div>

<p>The <code>=</code> sign is the <strong>assignment operator</strong>. It means "store the right-hand value into the left-hand name." It does not mean "equal to" — that's <code>==</code>.</p>

<h3>Naming rules</h3>
<ul>
  <li>Must start with a letter or underscore: <code>name</code>, <code>_private</code></li>
  <li>Can contain letters, digits, underscores: <code>user_1</code>, <code>total_score</code></li>
  <li>Case-sensitive: <code>Name</code> and <code>name</code> are different variables</li>
  <li>Cannot be a reserved keyword: <code>if</code>, <code>for</code>, <code>return</code>, etc.</li>
</ul>

<div class="tip-box"><strong>Python convention:</strong> use <code>snake_case</code> for variable names — all lowercase with underscores between words. <code>total_score</code> not <code>totalScore</code>.</div>

<h3>Reassigning variables</h3>
<p>Variables are not fixed. You can reassign to any type at any time:</p>
<div class="code-block">x = 10
print(x)   # 10
x = "now a string"
print(x)   # now a string</div>

<h3>Multiple assignment</h3>
<div class="code-block">a, b, c = 1, 2, 3      # unpack
x = y = z = 0          # same value to all

# Swap two values cleanly
a, b = b, a</div>

<h3>Checking a variable's type</h3>
<div class="code-block">x = 42
print(type(x))   # &lt;class 'int'&gt;</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>Which variable name is valid Python?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">2score</button>
      <button class="qopt" onclick="qa(this,false)">my-score</button>
      <button class="qopt" onclick="qa(this,true)">my_score</button>
      <button class="qopt" onclick="qa(this,false)">my score</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>What does <code>=</code> do in Python?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">Checks if two values are equal</button>
      <button class="qopt" onclick="qa(this,true)">Assigns a value to a variable</button>
      <button class="qopt" onclick="qa(this,false)">Compares two variables</button>
    </div>
  </div>
</div>
`,
},

{
  id: 'lesson-4',
  title: 'Data Types',
  starter: `# Python's core data types
x = 10          # int
y = 3.14        # float
name = "Python" # str
flag = True     # bool
nothing = None  # NoneType

# Check types
print(type(x))
print(type(y))
print(type(name))
print(type(flag))
print(type(nothing))

# Type affects operations
print(10 + 3)     # 13 (int addition)
print("10" + "3") # 103 (string concatenation!)`,
  content: `
<h2 class="lesson-title">Data Types</h2>
<p class="lesson-intro">Every value in Python has a type. The type determines what operations are valid and how the value behaves. Python infers the type automatically based on what you assign.</p>

<h3>Core built-in types</h3>
<table>
  <tr><th>Type</th><th>Example</th><th>Description</th></tr>
  <tr><td><code>int</code></td><td><code>42</code>, <code>-7</code>, <code>0</code></td><td>Whole numbers, any size</td></tr>
  <tr><td><code>float</code></td><td><code>3.14</code>, <code>-0.5</code>, <code>1e10</code></td><td>Decimal numbers</td></tr>
  <tr><td><code>str</code></td><td><code>"hello"</code>, <code>'world'</code></td><td>Text (sequence of characters)</td></tr>
  <tr><td><code>bool</code></td><td><code>True</code>, <code>False</code></td><td>Boolean — only two values</td></tr>
  <tr><td><code>NoneType</code></td><td><code>None</code></td><td>Absence of a value</td></tr>
</table>

<h3>Checking the type</h3>
<div class="code-block">print(type(42))      # &lt;class 'int'&gt;
print(type("hi"))    # &lt;class 'str'&gt;
print(type(True))    # &lt;class 'bool'&gt;</div>

<h3>Why types matter</h3>
<p>The same operator does different things on different types:</p>
<div class="code-block">print(5 + 3)       # 8     — addition
print("5" + "3")   # 53    — concatenation
print(True + 1)    # 2     — bool is 1 under the hood</div>

<div class="warn-box">Mixing incompatible types causes a <code>TypeError</code>. You cannot add a number and a string directly: <code>10 + "hello"</code> will crash.</div>

<h3>Dynamic typing</h3>
<p>Python is dynamically typed — a variable's type can change when you reassign it. This is flexible but requires care.</p>
<div class="code-block">x = 100       # int
x = "hello"   # now str — no error in Python</div>

<div class="tip-box"><strong>None</strong> is Python's way of saying "no value here." It's not zero, not an empty string — it's the explicit absence of a value. Functions that don't return anything return <code>None</code> implicitly.</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>What is the type of <code>3.14</code>?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">int</button>
      <button class="qopt" onclick="qa(this,true)">float</button>
      <button class="qopt" onclick="qa(this,false)">str</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>What does <code>"5" + "3"</code> produce?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">8</button>
      <button class="qopt" onclick="qa(this,true)">"53"</button>
      <button class="qopt" onclick="qa(this,false)">TypeError</button>
    </div>
  </div>
</div>
`,
},

// ─────────────────────────────────────────────
// SECTION 2 — NUMBERS & STRINGS
// ─────────────────────────────────────────────

{
  id: 'lesson-5',
  title: 'Numbers & Operators',
  starter: `# Arithmetic operators
print(10 + 3)   # 13
print(10 - 3)   # 7
print(10 * 3)   # 30
print(10 / 3)   # 3.333...  (always float)
print(10 // 3)  # 3         (floor division)
print(10 % 3)   # 1         (modulo / remainder)
print(2 ** 10)  # 1024      (power)

# Operator precedence (PEMDAS)
print(2 + 3 * 4)    # 14, not 20
print((2 + 3) * 4)  # 20

# Augmented assignment
x = 10
x += 5   # same as x = x + 5
print(x)`,
  content: `
<h2 class="lesson-title">Numbers & Operators</h2>
<p class="lesson-intro">Python has two main numeric types: <code>int</code> for whole numbers and <code>float</code> for decimals. Arithmetic works as expected, with a few important details worth knowing.</p>

<h3>Arithmetic operators</h3>
<table>
  <tr><th>Operator</th><th>Name</th><th>Example</th><th>Result</th></tr>
  <tr><td><code>+</code></td><td>Addition</td><td><code>7 + 3</code></td><td><code>10</code></td></tr>
  <tr><td><code>-</code></td><td>Subtraction</td><td><code>7 - 3</code></td><td><code>4</code></td></tr>
  <tr><td><code>*</code></td><td>Multiplication</td><td><code>7 * 3</code></td><td><code>21</code></td></tr>
  <tr><td><code>/</code></td><td>Division</td><td><code>7 / 2</code></td><td><code>3.5</code></td></tr>
  <tr><td><code>//</code></td><td>Floor division</td><td><code>7 // 2</code></td><td><code>3</code></td></tr>
  <tr><td><code>%</code></td><td>Modulo</td><td><code>7 % 3</code></td><td><code>1</code></td></tr>
  <tr><td><code>**</code></td><td>Exponentiation</td><td><code>2 ** 8</code></td><td><code>256</code></td></tr>
</table>

<div class="tip-box"><strong>Division always returns float</strong> in Python 3: <code>6 / 2</code> gives <code>3.0</code>, not <code>3</code>. Use <code>//</code> if you need an integer result.</div>

<h3>Modulo — the remainder operator</h3>
<p>Modulo (<code>%</code>) gives the remainder after division. Hugely useful:</p>
<div class="code-block">17 % 5   # 2  (17 = 3×5 + 2)
10 % 2   # 0  (even number check — remainder is 0)
15 % 4   # 3</div>

<h3>Operator precedence</h3>
<p>Python follows standard math order: exponents → multiply/divide → add/subtract. Use parentheses to override.</p>
<div class="code-block">2 + 3 * 4      # 14  (multiply first)
(2 + 3) * 4   # 20  (parens first)</div>

<h3>Augmented assignment</h3>
<div class="code-block">x = 10
x += 3    # x = x + 3  → 13
x -= 2    # x = x - 2  → 11
x *= 2    # x = x * 2  → 22
x //= 4   # x = x // 4 → 5</div>

<h3>Useful number functions</h3>
<div class="code-block">abs(-7)        # 7    — absolute value
round(3.567, 2) # 3.57 — round to 2 decimal places
max(3, 7, 1)   # 7
min(3, 7, 1)   # 1
sum([1,2,3,4]) # 10</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>What is <code>17 % 5</code>?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">3</button>
      <button class="qopt" onclick="qa(this,true)">2</button>
      <button class="qopt" onclick="qa(this,false)">3.4</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>What does <code>7 / 2</code> return in Python 3?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">3</button>
      <button class="qopt" onclick="qa(this,true)">3.5</button>
      <button class="qopt" onclick="qa(this,false)">4</button>
    </div>
  </div>
</div>
`,
},

{
  id: 'lesson-6',
  title: 'Strings',
  starter: `# Creating strings
s1 = "double quotes"
s2 = 'single quotes'
s3 = """triple quotes
span multiple
lines"""

print(s1)
print(s3)

# String operations
name = "Python"
print(len(name))        # length
print(name[0])          # first character
print(name[-1])         # last character
print(name[0:3])        # slicing

# Repetition
print("ha" * 3)

# Check membership
print("Py" in name)`,
  content: `
<h2 class="lesson-title">Strings</h2>
<p class="lesson-intro">A string is an ordered sequence of characters. In Python, strings are <strong>immutable</strong> — once created, you can't change individual characters in place, but you can always create new strings from existing ones.</p>

<h3>Creating strings</h3>
<div class="code-block">s = "double quotes work"
s = 'single quotes too'
s = """triple quotes
span multiple lines"""</div>

<h3>Escape characters</h3>
<table>
  <tr><th>Sequence</th><th>Meaning</th></tr>
  <tr><td><code>\\n</code></td><td>Newline</td></tr>
  <tr><td><code>\\t</code></td><td>Tab</td></tr>
  <tr><td><code>\\'</code></td><td>Literal single quote</td></tr>
  <tr><td><code>\\"</code></td><td>Literal double quote</td></tr>
  <tr><td><code>\\\\</code></td><td>Literal backslash</td></tr>
</table>

<h3>Indexing and slicing</h3>
<p>Strings are sequences — each character has an index starting at 0.</p>
<div class="code-block">s = "Python"
#    P  y  t  h  o  n
#    0  1  2  3  4  5
#   -6 -5 -4 -3 -2 -1  (negative from end)

print(s[0])     # P
print(s[-1])    # n
print(s[0:3])   # Pyt  (up to but not including 3)
print(s[2:])    # thon (from index 2 to end)
print(s[:3])    # Pyt  (from start to 3)
print(s[::2])   # Pto  (every 2nd character)
print(s[::-1])  # nohtyP (reversed)</div>

<h3>String concatenation and repetition</h3>
<div class="code-block">greeting = "Hello" + ", " + "World!"  # concatenation
laugh = "ha" * 3                       # "hahaha"</div>

<h3>f-strings (formatted string literals)</h3>
<p>The cleanest way to embed values in strings — prefix with <code>f</code>:</p>
<div class="code-block">name = "Arjun"
age = 17
print(f"My name is {name} and I am {age} years old")
print(f"Next year I'll be {age + 1}")
print(f"Pi is roughly {3.14159:.2f}")  # format to 2 decimal places</div>

<div class="tip-box"><strong>Use f-strings</strong> whenever you need to insert variables into text. They're readable, fast, and support expressions inside the curly braces.</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>What does <code>"Python"[2:5]</code> return?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">Pyt</button>
      <button class="qopt" onclick="qa(this,true)">tho</button>
      <button class="qopt" onclick="qa(this,false)">thon</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>Which is the correct f-string syntax?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">"Hello {name}"</button>
      <button class="qopt" onclick="qa(this,true)">f"Hello {name}"</button>
      <button class="qopt" onclick="qa(this,false)">format("Hello {name}")</button>
    </div>
  </div>
</div>
`,
},

{
  id: 'lesson-7',
  title: 'String Methods',
  starter: `s = "  Hello, Python World!  "

# Case methods
print(s.upper())
print(s.lower())
print(s.title())

# Whitespace
print(s.strip())   # removes leading/trailing spaces
print(s.lstrip())  # left only
print(s.rstrip())  # right only

# Search and replace
print(s.find("Python"))
print(s.replace("Python", "Coder"))
print("hello" in s.lower())

# Split and join
csv = "apple,banana,mango"
fruits = csv.split(",")
print(fruits)
print(" | ".join(fruits))`,
  content: `
<h2 class="lesson-title">String Methods</h2>
<p class="lesson-intro">Python strings come with a rich set of built-in methods. Since strings are objects, you call these with dot notation: <code>string.method()</code>. Calling a method on a string never modifies the original — it always returns a new string.</p>

<h3>Case conversion</h3>
<div class="code-block">s = "hello world"
s.upper()     # "HELLO WORLD"
s.lower()     # "hello world"
s.title()     # "Hello World"
s.capitalize() # "Hello world"
s.swapcase()  # "HELLO WORLD" → "hello world"</div>

<h3>Stripping whitespace</h3>
<div class="code-block">s = "   hello   "
s.strip()    # "hello"  — both sides
s.lstrip()   # "hello   " — left only
s.rstrip()   # "   hello" — right only</div>

<h3>Searching</h3>
<div class="code-block">s = "the quick brown fox"
s.find("quick")    # 4   — index of first match (-1 if not found)
s.count("o")       # 2   — how many times
s.startswith("the") # True
s.endswith("fox")   # True
"quick" in s        # True</div>

<h3>Replace and split</h3>
<div class="code-block">s = "I love Python"
s.replace("love", "use")  # "I use Python"

csv = "a,b,c,d"
csv.split(",")             # ["a", "b", "c", "d"]
",".join(["a","b","c"])   # "a,b,c"</div>

<h3>Checking content</h3>
<div class="code-block">"123".isdigit()    # True  — all digits
"abc".isalpha()    # True  — all letters
"abc123".isalnum() # True  — letters and digits
"  ".isspace()     # True  — only whitespace</div>

<div class="tip-box"><strong>Chaining methods:</strong> since each method returns a new string, you can chain them:<br>
<code>"  HELLO  ".strip().lower()</code> → <code>"hello"</code></div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>What does <code>"  hi  ".strip()</code> return?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,true)">"hi"</button>
      <button class="qopt" onclick="qa(this,false)">"  hi  "</button>
      <button class="qopt" onclick="qa(this,false)">"hi  "</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>What does <code>"cat,dog,fish".split(",")</code> return?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">"cat dog fish"</button>
      <button class="qopt" onclick="qa(this,true)">["cat", "dog", "fish"]</button>
      <button class="qopt" onclick="qa(this,false)">["cat,dog,fish"]</button>
    </div>
  </div>
</div>
`,
},

{
  id: 'lesson-8',
  title: 'Type Casting',
  starter: `# Converting between types
print(int(3.9))       # 3  (truncates, doesn't round)
print(int("42"))      # 42
print(float(7))       # 7.0
print(float("3.14"))  # 3.14
print(str(100))       # "100"
print(bool(0))        # False
print(bool("hi"))     # True

# Common pattern: getting a number from input
# (In real Python: x = int(input("Enter: ")))
# Here we simulate it:
user_input = "25"
age = int(user_input)
print(f"In 5 years you'll be {age + 5}")`,
  content: `
<h2 class="lesson-title">Type Casting</h2>
<p class="lesson-intro">Type casting (or type conversion) means converting a value from one type to another. Python provides built-in functions for this: <code>int()</code>, <code>float()</code>, <code>str()</code>, <code>bool()</code>.</p>

<h3>Converting to int</h3>
<div class="code-block">int(3.9)     # 3   — truncates decimal, does NOT round
int("42")    # 42  — string "42" to integer 42
int(True)    # 1
int(False)   # 0</div>

<div class="warn-box"><code>int("3.14")</code> raises a <code>ValueError</code> — you can't convert a decimal string directly to int. Do <code>int(float("3.14"))</code> instead.</div>

<h3>Converting to float</h3>
<div class="code-block">float(7)       # 7.0
float("3.14")  # 3.14
float("1e3")   # 1000.0</div>

<h3>Converting to str</h3>
<div class="code-block">str(42)      # "42"
str(3.14)    # "3.14"
str(True)    # "True"</div>

<h3>Converting to bool</h3>
<p>Everything in Python has a truth value. The falsy values are:</p>
<div class="code-block">bool(0)      # False
bool(0.0)    # False
bool("")     # False — empty string
bool([])     # False — empty list
bool(None)   # False

# Everything else is True
bool(1)      # True
bool("hi")   # True
bool([1,2])  # True</div>

<h3>Why this matters — user input</h3>
<p>The <code>input()</code> function always returns a string, so you must cast when you need a number:</p>
<div class="code-block">age = int(input("Enter your age: "))
price = float(input("Enter price: "))
# Without int(), "10" + 5 would crash</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>What does <code>int(7.9)</code> return?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,true)">7</button>
      <button class="qopt" onclick="qa(this,false)">8</button>
      <button class="qopt" onclick="qa(this,false)">7.9</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>Which value is falsy in Python?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">"False"</button>
      <button class="qopt" onclick="qa(this,true)">0</button>
      <button class="qopt" onclick="qa(this,false)">-1</button>
    </div>
  </div>
</div>
`,
},

// ─────────────────────────────────────────────
// SECTION 3 — CONTROL FLOW
// ─────────────────────────────────────────────

{
  id: 'lesson-9',
  title: 'if / elif / else',
  starter: `score = 78

if score >= 90:
    print("A grade — excellent!")
elif score >= 75:
    print("B grade — good work")
elif score >= 60:
    print("C grade — passing")
else:
    print("Below passing — let's improve")

# Comparison operators
x, y = 10, 20
print(x == y)   # False — equal
print(x != y)   # True  — not equal
print(x < y)    # True  — less than
print(x >= 10)  # True  — greater than or equal

# Logical operators
age = 17
has_id = True
if age >= 18 and has_id:
    print("entry allowed")
else:
    print("entry denied")`,
  content: `
<h2 class="lesson-title">if / elif / else</h2>
<p class="lesson-intro">Conditional statements let your program make decisions — execute different code depending on whether a condition is true or false. This is one of the two most fundamental building blocks of programming (the other being loops).</p>

<h3>Basic if statement</h3>
<div class="code-block">if condition:
    # runs if condition is True
    do_something()</div>

<h3>if / elif / else</h3>
<div class="code-block">temperature = 35

if temperature > 40:
    print("Extremely hot")
elif temperature > 30:
    print("Hot")
elif temperature > 20:
    print("Warm")
else:
    print("Cool or cold")</div>

<p><code>elif</code> is short for "else if." Python checks conditions top-to-bottom and executes only the first matching block. <code>else</code> catches everything that didn't match.</p>

<h3>Comparison operators</h3>
<table>
  <tr><th>Operator</th><th>Meaning</th></tr>
  <tr><td><code>==</code></td><td>Equal to</td></tr>
  <tr><td><code>!=</code></td><td>Not equal to</td></tr>
  <tr><td><code>&lt;</code></td><td>Less than</td></tr>
  <tr><td><code>&gt;</code></td><td>Greater than</td></tr>
  <tr><td><code>&lt;=</code></td><td>Less than or equal to</td></tr>
  <tr><td><code>&gt;=</code></td><td>Greater than or equal to</td></tr>
</table>

<h3>Logical operators</h3>
<div class="code-block">x and y   # True if BOTH are true
x or y    # True if AT LEAST ONE is true
not x     # True if x is False</div>

<h3>Chained comparisons</h3>
<p>Python allows mathematical-style chaining:</p>
<div class="code-block">age = 17
if 13 <= age <= 19:
    print("teenager")  # much cleaner than age >= 13 and age <= 19</div>

<h3>One-liner (ternary)</h3>
<div class="code-block">status = "adult" if age >= 18 else "minor"
result = max_val if x > y else y</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>If <code>x = 5</code>, what does <code>x == 5</code> return?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">5</button>
      <button class="qopt" onclick="qa(this,true)">True</button>
      <button class="qopt" onclick="qa(this,false)">None</button>
    </div>
  </div>
  <div class="quiz-q">
    <p><code>True and False</code> evaluates to?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,true)">False</button>
      <button class="qopt" onclick="qa(this,false)">True</button>
      <button class="qopt" onclick="qa(this,false)">None</button>
    </div>
  </div>
</div>
`,
},

{
  id: 'lesson-10',
  title: 'while Loops',
  starter: `# Basic while loop
count = 0
while count < 5:
    print(f"count = {count}")
    count += 1

print("Loop ended")

# break — exit early
n = 0
while True:   # infinite loop
    if n >= 3:
        break
    print(n)
    n += 1

# continue — skip rest of iteration
for i in range(8):
    if i % 2 == 0:
        continue   # skip even numbers
    print(i)`,
  content: `
<h2 class="lesson-title">while Loops</h2>
<p class="lesson-intro">A <code>while</code> loop repeats a block of code as long as its condition remains <code>True</code>. Use it when you don't know in advance how many times you need to loop.</p>

<h3>Basic syntax</h3>
<div class="code-block">while condition:
    # body — runs repeatedly while condition is True</div>

<div class="code-block">n = 1
while n <= 5:
    print(n)
    n += 1   # critical — must update the condition variable</div>

<div class="warn-box"><strong>Infinite loops</strong> — if your condition never becomes False, the loop never stops. Always make sure the loop body moves toward the exit condition.</div>

<h3>break — exit the loop early</h3>
<div class="code-block">while True:         # deliberately infinite
    user = input("Type 'quit' to stop: ")
    if user == "quit":
        break       # exits the loop immediately
    print(f"You typed: {user}")</div>

<h3>continue — skip to next iteration</h3>
<div class="code-block">i = 0
while i < 10:
    i += 1
    if i % 2 == 0:
        continue     # skip even numbers
    print(i)         # only prints odd numbers</div>

<h3>while-else</h3>
<p>Python's <code>while-else</code> is rarely seen but useful — the <code>else</code> block runs only if the loop completed normally (no <code>break</code>):</p>
<div class="code-block">n = 0
while n < 5:
    n += 1
else:
    print("Loop finished without break")</div>

<div class="tip-box">Use <code>while</code> when looping until an event or condition. Use <code>for</code> (next lesson) when iterating over a known sequence.</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>What does <code>break</code> do in a loop?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">Skips to the next iteration</button>
      <button class="qopt" onclick="qa(this,true)">Exits the loop immediately</button>
      <button class="qopt" onclick="qa(this,false)">Pauses the loop</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>How many times does this loop run? <span class="qcode">i = 0\nwhile i &lt; 4:\n    i += 1</span></p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">3</button>
      <button class="qopt" onclick="qa(this,true)">4</button>
      <button class="qopt" onclick="qa(this,false)">5</button>
    </div>
  </div>
</div>
`,
},

{
  id: 'lesson-11',
  title: 'for Loops',
  starter: `# Iterating over a list
fruits = ["apple", "mango", "banana"]
for fruit in fruits:
    print(fruit)

# range() — generates a sequence of numbers
for i in range(5):        # 0 1 2 3 4
    print(i)

for i in range(1, 11):    # 1 to 10
    print(i)

for i in range(0, 20, 3): # 0, 3, 6, 9, 12, 15, 18
    print(i)

# enumerate — get index and value together
for idx, fruit in enumerate(fruits):
    print(f"{idx}: {fruit}")

# Iterating over a string
for char in "Python":
    print(char)`,
  content: `
<h2 class="lesson-title">for Loops</h2>
<p class="lesson-intro">A <code>for</code> loop iterates over any iterable — a list, string, range, tuple, or any sequence. It's the most common loop in Python.</p>

<h3>Basic for loop</h3>
<div class="code-block">for item in iterable:
    # body runs once for each item</div>

<div class="code-block">languages = ["Python", "C++", "Rust"]
for lang in languages:
    print(lang)</div>

<h3>range()</h3>
<p><code>range()</code> generates integers on demand (memory-efficient):</p>
<div class="code-block">range(n)        # 0, 1, 2, ..., n-1
range(a, b)     # a, a+1, ..., b-1
range(a, b, s)  # a, a+s, a+2s, ... (step s)</div>

<div class="code-block">for i in range(5):         # 0 1 2 3 4
    print(i)

for i in range(1, 6):      # 1 2 3 4 5
    print(i)

for i in range(10, 0, -2): # 10 8 6 4 2 (countdown)
    print(i)</div>

<h3>enumerate — index + value</h3>
<div class="code-block">fruits = ["apple", "mango", "banana"]
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple
# 1: mango
# 2: banana</div>

<h3>zip — iterate two sequences together</h3>
<div class="code-block">names  = ["Alice", "Bob", "Carol"]
scores = [92, 85, 78]
for name, score in zip(names, scores):
    print(f"{name}: {score}")</div>

<h3>Nested loops</h3>
<div class="code-block">for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} × {j} = {i*j}")</div>

<div class="tip-box"><strong>List comprehension</strong> — a compact way to build lists with a for loop:<br>
<code>squares = [x**2 for x in range(10)]</code></div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>What does <code>range(2, 8, 2)</code> produce?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">2, 3, 4, 5, 6, 7</button>
      <button class="qopt" onclick="qa(this,true)">2, 4, 6</button>
      <button class="qopt" onclick="qa(this,false)">2, 4, 6, 8</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>What does <code>enumerate()</code> give you?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">Only the index</button>
      <button class="qopt" onclick="qa(this,false)">Only the value</button>
      <button class="qopt" onclick="qa(this,true)">Both the index and the value</button>
    </div>
  </div>
</div>
`,
},

// ─────────────────────────────────────────────
// SECTION 4 — DATA STRUCTURES
// ─────────────────────────────────────────────

{
  id: 'lesson-12',
  title: 'Lists',
  starter: `# Creating a list
scores = [88, 92, 75, 61, 95]
print(scores)
print(scores[0])     # first element
print(scores[-1])    # last element
print(scores[1:3])   # slicing

# Modifying
scores.append(100)
scores.insert(2, 99)
scores.remove(61)
popped = scores.pop()

print(scores)

# List operations
nums = [3, 1, 4, 1, 5, 9, 2, 6]
print(sorted(nums))       # sorted copy
print(min(nums), max(nums), sum(nums))
nums.sort()               # sort in place
nums.reverse()
print(nums)`,
  content: `
<h2 class="lesson-title">Lists</h2>
<p class="lesson-intro">A list is an ordered, mutable collection of items. It's the most versatile and commonly used data structure in Python. Items can be of any type and can be changed after creation.</p>

<h3>Creating lists</h3>
<div class="code-block">empty = []
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
nested = [[1, 2], [3, 4], [5, 6]]</div>

<h3>Accessing elements</h3>
<div class="code-block">fruits = ["apple", "banana", "cherry"]
fruits[0]    # "apple"   (first)
fruits[-1]   # "cherry"  (last)
fruits[1:3]  # ["banana", "cherry"]  (slicing)</div>

<h3>Modifying lists</h3>
<div class="code-block">fruits = ["apple", "banana"]

fruits.append("cherry")      # add to end
fruits.insert(1, "mango")    # insert at index
fruits[0] = "avocado"        # change element

fruits.remove("banana")      # remove by value (first match)
popped = fruits.pop()        # remove and return last
del fruits[0]                # delete by index</div>

<h3>Useful list operations</h3>
<div class="code-block">nums = [3, 1, 4, 1, 5]
len(nums)           # 5 — length
sum(nums)           # 14
min(nums)           # 1
max(nums)           # 5
nums.count(1)       # 2 — how many 1s
nums.index(4)       # 2 — index of 4
sorted(nums)        # [1, 1, 3, 4, 5] — new sorted list
nums.sort()         # sort in place
nums.reverse()      # reverse in place</div>

<h3>Checking membership</h3>
<div class="code-block">"apple" in fruits      # True
"grape" not in fruits  # True</div>

<h3>List comprehensions</h3>
<div class="code-block">squares = [x**2 for x in range(1, 6)]
# [1, 4, 9, 16, 25]

evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]</div>

<div class="tip-box">List comprehensions are more idiomatic and often faster than building a list with a for loop and <code>.append()</code>. Prefer them for simple transformations and filters.</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>What does <code>[1,2,3].append(4)</code> return?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">[1,2,3,4]</button>
      <button class="qopt" onclick="qa(this,true)">None (modifies in place)</button>
      <button class="qopt" onclick="qa(this,false)">4</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>What does <code>[-1]</code> indexing give you?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">An error</button>
      <button class="qopt" onclick="qa(this,false)">The first element</button>
      <button class="qopt" onclick="qa(this,true)">The last element</button>
    </div>
  </div>
</div>
`,
},

{
  id: 'lesson-13',
  title: 'Tuples & Sets',
  starter: `# Tuples — immutable ordered sequences
coords = (10, 20)
rgb = (255, 128, 0)
print(coords[0], coords[1])

# Tuple unpacking
x, y = coords
print(f"x={x}, y={y}")

# Single-element tuple needs trailing comma
single = (42,)
print(type(single))

# Sets — unordered, unique elements
tags = {"python", "coding", "python", "fun"}
print(tags)   # duplicates removed

tags.add("learning")
tags.discard("fun")

# Set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b)   # union
print(a & b)   # intersection
print(a - b)   # difference`,
  content: `
<h2 class="lesson-title">Tuples & Sets</h2>
<p class="lesson-intro">Beyond lists, Python offers two more core collection types: <strong>tuples</strong> (ordered and immutable) and <strong>sets</strong> (unordered, unique elements). Choosing the right type makes code clearer and more efficient.</p>

<h3>Tuples</h3>
<p>A tuple is like a list but <strong>immutable</strong> — once created, you cannot add, remove, or change elements.</p>
<div class="code-block">point = (3, 7)
rgb = (255, 0, 128)
empty = ()
single = (42,)   # trailing comma is required for single-element tuple</div>

<h3>Why use tuples?</h3>
<ul>
  <li>Faster than lists for read-only data</li>
  <li>Can be used as dictionary keys (lists cannot)</li>
  <li>Signals to the reader: "this data should not change"</li>
  <li>Functions often return multiple values as tuples</li>
</ul>

<h3>Tuple unpacking</h3>
<div class="code-block">x, y = (10, 20)          # unpack into variables
a, b, c = (1, 2, 3)
first, *rest = (1, 2, 3, 4)  # first=1, rest=[2,3,4]

# Common pattern — swap values
a, b = b, a</div>

<h3>Sets</h3>
<p>A set is an <strong>unordered collection with no duplicates</strong>. Use it when you care about membership and uniqueness, not order.</p>
<div class="code-block">colors = {"red", "blue", "green"}
colors.add("yellow")
colors.discard("red")    # remove if present (no error if missing)
colors.remove("blue")    # remove (raises KeyError if missing)
"green" in colors        # True — fast membership test</div>

<h3>Set operations (like math sets)</h3>
<div class="code-block">a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

a | b    # union: {1,2,3,4,5,6,7,8}
a & b    # intersection: {4,5}
a - b    # difference: {1,2,3}
a ^ b    # symmetric difference: {1,2,3,6,7,8}</div>

<div class="tip-box"><strong>Fast deduplication:</strong> <code>list(set(my_list))</code> removes all duplicates from a list instantly — though order is not preserved.</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>What happens when you try to change an element of a tuple?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,true)">TypeError — tuples are immutable</button>
      <button class="qopt" onclick="qa(this,false)">The element changes</button>
      <button class="qopt" onclick="qa(this,false)">Nothing happens</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>What does <code>{1,2,2,3,3,3}</code> produce?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">{1,2,2,3,3,3}</button>
      <button class="qopt" onclick="qa(this,true)">{1,2,3}</button>
      <button class="qopt" onclick="qa(this,false)">An error</button>
    </div>
  </div>
</div>
`,
},

{
  id: 'lesson-14',
  title: 'Dictionaries',
  starter: `# Creating a dictionary
student = {
    "name": "Arjun",
    "age": 17,
    "grade": "A",
    "scores": [92, 88, 95]
}

# Accessing values
print(student["name"])
print(student.get("age"))          # safe access
print(student.get("email", "N/A")) # with default

# Modifying
student["age"] = 18
student["city"] = "Hyderabad"
del student["grade"]

# Iterating
for key, value in student.items():
    print(f"{key}: {value}")

print(list(student.keys()))
print(list(student.values()))`,
  content: `
<h2 class="lesson-title">Dictionaries</h2>
<p class="lesson-intro">A dictionary stores key-value pairs. Think of it as a real dictionary — you look up a <em>key</em> (a word) to get its <em>value</em> (the definition). Dictionaries are extremely fast for lookups and are one of Python's most powerful data structures.</p>

<h3>Creating dictionaries</h3>
<div class="code-block">person = {
    "name": "Priya",
    "age": 17,
    "active": True
}
empty = {}
d = dict(name="Priya", age=17)  # alternative syntax</div>

<h3>Accessing values</h3>
<div class="code-block">person["name"]              # "Priya" (KeyError if missing)
person.get("name")          # "Priya" (None if missing)
person.get("email", "N/A")  # "N/A"  (custom default)</div>

<div class="tip-box">Prefer <code>.get()</code> over bracket access when the key might not exist — it avoids a crash.</div>

<h3>Modifying dictionaries</h3>
<div class="code-block">person["age"] = 18         # update existing
person["city"] = "Delhi"   # add new key
del person["active"]       # delete key
person.pop("city")         # remove and return value</div>

<h3>Iterating</h3>
<div class="code-block">for key in person:                  # keys only
    print(key)

for key, val in person.items():     # key-value pairs
    print(f"{key}: {val}")

for val in person.values():         # values only
    print(val)</div>

<h3>Useful methods</h3>
<div class="code-block">person.keys()     # dict_keys view
person.values()   # dict_values view
person.items()    # dict_items view (key, val) pairs
len(person)       # number of key-value pairs
"name" in person  # True — check key existence</div>

<h3>Nested dictionaries</h3>
<div class="code-block">school = {
    "class_10": {"students": 35, "avg_score": 82},
    "class_11": {"students": 28, "avg_score": 79},
}
print(school["class_10"]["avg_score"])  # 82</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>What does <code>d.get("x", 0)</code> return if key "x" doesn't exist?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">KeyError</button>
      <button class="qopt" onclick="qa(this,false)">None</button>
      <button class="qopt" onclick="qa(this,true)">0</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>Dictionaries are accessed by?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">Index number</button>
      <button class="qopt" onclick="qa(this,true)">Key</button>
      <button class="qopt" onclick="qa(this,false)">Position</button>
    </div>
  </div>
</div>
`,
},

// ─────────────────────────────────────────────
// SECTION 5 — FUNCTIONS & BEYOND
// ─────────────────────────────────────────────

{
  id: 'lesson-15',
  title: 'Functions',
  starter: `# Basic function
def greet(name):
    return f"Hello, {name}!"

print(greet("Priya"))
print(greet("World"))

# Default parameters
def power(base, exponent=2):
    return base ** exponent

print(power(3))      # 9  (3^2)
print(power(2, 10))  # 1024

# Keyword arguments
def describe(name, age, city="Unknown"):
    print(f"{name}, age {age}, from {city}")

describe("Arjun", 17, city="Hyderabad")
describe(age=15, name="Riya")

# Multiple return values
def min_max(nums):
    return min(nums), max(nums)

lo, hi = min_max([3, 1, 7, 2, 9])
print(lo, hi)`,
  content: `
<h2 class="lesson-title">Functions</h2>
<p class="lesson-intro">A function is a named, reusable block of code. Functions let you write logic once and call it many times — the foundation of organised, maintainable code. In Python, functions are defined with <code>def</code>.</p>

<h3>Defining and calling</h3>
<div class="code-block">def function_name(parameters):
    """Optional docstring."""
    # body
    return value     # optional</div>

<div class="code-block">def square(n):
    return n * n

result = square(5)   # 25
print(square(7))     # 49</div>

<h3>Parameters and arguments</h3>
<div class="code-block">def add(a, b):           # a and b are parameters
    return a + b

add(3, 4)              # 3 and 4 are arguments</div>

<h3>Default parameters</h3>
<div class="code-block">def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Priya")             # "Hello, Priya!"
greet("Arjun", "Namaste")  # "Namaste, Arjun!"</div>

<div class="warn-box">Default parameters must come <em>after</em> non-default ones. <code>def f(a=1, b)</code> is a syntax error.</div>

<h3>Keyword arguments</h3>
<div class="code-block">def register(name, age, city):
    print(f"{name}, {age}, {city}")

register(age=17, city="Delhi", name="Priya")  # order doesn't matter with keywords</div>

<h3>*args and **kwargs</h3>
<div class="code-block">def total(*args):          # collects any number of positional args as tuple
    return sum(args)

total(1, 2, 3, 4, 5)      # 15

def show(**kwargs):        # collects keyword args as dict
    for k, v in kwargs.items():
        print(f"{k}: {v}")

show(name="Priya", age=17)</div>

<h3>Multiple return values</h3>
<div class="code-block">def stats(nums):
    return min(nums), max(nums), sum(nums)/len(nums)

lo, hi, avg = stats([10, 20, 30, 40])</div>

<h3>Scope</h3>
<div class="code-block">x = 10             # global variable

def my_func():
    y = 20         # local variable — only exists inside the function
    print(x)       # can read globals
    print(y)

my_func()
# print(y)  # NameError — y doesn't exist outside the function</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>What does a function without a <code>return</code> statement return?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">0</button>
      <button class="qopt" onclick="qa(this,true)">None</button>
      <button class="qopt" onclick="qa(this,false)">An error</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>What does <code>*args</code> do in a function definition?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">Passes a list</button>
      <button class="qopt" onclick="qa(this,true)">Accepts any number of positional arguments</button>
      <button class="qopt" onclick="qa(this,false)">Makes the argument optional</button>
    </div>
  </div>
</div>
`,
},

{
  id: 'lesson-16',
  title: 'Lambda, map & filter',
  starter: `# Lambda — anonymous one-line function
square = lambda x: x ** 2
print(square(5))   # 25

add = lambda a, b: a + b
print(add(3, 4))   # 7

# map — apply function to each element
nums = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, nums))
print(doubled)

# filter — keep elements where function returns True
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)

# sorted with key
words = ["banana", "fig", "apple", "kiwi"]
print(sorted(words, key=lambda w: len(w)))   # by length
print(sorted(words, key=lambda w: w[-1]))    # by last letter`,
  content: `
<h2 class="lesson-title">Lambda, map & filter</h2>
<p class="lesson-intro">Python supports functional programming patterns with lambda expressions and built-in functions like <code>map()</code>, <code>filter()</code>, and <code>sorted()</code>. These let you write concise, expressive transformations on collections.</p>

<h3>Lambda expressions</h3>
<p>A lambda is an anonymous, one-expression function. Use it when you need a simple function without bothering to <code>def</code> one.</p>
<div class="code-block">lambda parameters: expression</div>

<div class="code-block">double = lambda x: x * 2
double(7)                    # 14

add = lambda a, b: a + b
add(3, 4)                    # 7

classify = lambda n: "even" if n % 2 == 0 else "odd"
classify(5)                  # "odd"</div>

<h3>map()</h3>
<p>Applies a function to every element of an iterable:</p>
<div class="code-block">nums = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, nums))
# [1, 4, 9, 16, 25]

names = ["priya", "arjun", "riya"]
titled = list(map(str.title, names))
# ["Priya", "Arjun", "Riya"]</div>

<h3>filter()</h3>
<p>Keeps only elements for which the function returns <code>True</code>:</p>
<div class="code-block">nums = [1, 2, 3, 4, 5, 6, 7, 8]
evens = list(filter(lambda x: x % 2 == 0, nums))
# [2, 4, 6, 8]

words = ["hi", "hello", "hey", "world"]
long_words = list(filter(lambda w: len(w) > 3, words))
# ["hello", "world"]</div>

<h3>sorted() with a key function</h3>
<div class="code-block">words = ["banana", "fig", "apple", "kiwi"]

sorted(words)                         # alphabetical
sorted(words, key=len)                # by length
sorted(words, key=lambda w: w[-1])    # by last character
sorted(words, reverse=True)           # reverse alphabetical</div>

<div class="tip-box">For simple transformations and filters, list comprehensions are often cleaner than <code>map()</code>/<code>filter()</code>. Use lambdas mainly as key functions in <code>sorted()</code>, <code>min()</code>, <code>max()</code>.</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>What does <code>list(map(lambda x: x*2, [1,2,3]))</code> return?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">[1,2,3]</button>
      <button class="qopt" onclick="qa(this,true)">[2,4,6]</button>
      <button class="qopt" onclick="qa(this,false)">12</button>
    </div>
  </div>
  <div class="quiz-q">
    <p><code>filter()</code> keeps elements where the function returns?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">Any value</button>
      <button class="qopt" onclick="qa(this,true)">True</button>
      <button class="qopt" onclick="qa(this,false)">None</button>
    </div>
  </div>
</div>
`,
},

{
  id: 'lesson-17',
  title: 'try / except — Error Handling',
  starter: `# Basic try/except
try:
    x = int("not a number")
except ValueError as e:
    print(f"ValueError: {e}")

# Multiple except blocks
def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Cannot divide by zero")
        return None
    except TypeError:
        print("Both arguments must be numbers")
        return None

print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide(10, "x"))

# finally — always runs
try:
    risky = 1 / 0
except ZeroDivisionError:
    print("Caught the error")
finally:
    print("This always runs")`,
  content: `
<h2 class="lesson-title">try / except — Error Handling</h2>
<p class="lesson-intro">Errors (exceptions) are unavoidable in real programs — invalid input, missing files, network failures. Python's <code>try/except</code> lets you handle these gracefully instead of crashing.</p>

<h3>Basic structure</h3>
<div class="code-block">try:
    # code that might fail
    risky_operation()
except SomeError:
    # what to do if it fails
    handle_it()</div>

<h3>Common exceptions</h3>
<table>
  <tr><th>Exception</th><th>Cause</th></tr>
  <tr><td><code>ValueError</code></td><td>Wrong value type: <code>int("abc")</code></td></tr>
  <tr><td><code>TypeError</code></td><td>Wrong type: <code>"a" + 1</code></td></tr>
  <tr><td><code>ZeroDivisionError</code></td><td><code>10 / 0</code></td></tr>
  <tr><td><code>IndexError</code></td><td>List index out of range</td></tr>
  <tr><td><code>KeyError</code></td><td>Dict key doesn't exist</td></tr>
  <tr><td><code>FileNotFoundError</code></td><td>File doesn't exist</td></tr>
  <tr><td><code>NameError</code></td><td>Variable not defined</td></tr>
</table>

<h3>Catching the error object</h3>
<div class="code-block">try:
    x = int("abc")
except ValueError as e:
    print(f"Error: {e}")   # Error: invalid literal for int() with base 10: 'abc'</div>

<h3>Multiple except blocks</h3>
<div class="code-block">try:
    result = data[key] / count
except KeyError:
    print("Key not found")
except ZeroDivisionError:
    print("Count is zero")
except Exception as e:
    print(f"Unexpected error: {e}")   # catch-all</div>

<h3>else and finally</h3>
<div class="code-block">try:
    result = int(user_input)
except ValueError:
    print("Not a number")
else:
    print(f"Success: {result}")    # runs only if NO exception
finally:
    print("This ALWAYS runs")      # cleanup code goes here</div>

<div class="tip-box"><strong>Don't catch everything blindly.</strong> A bare <code>except:</code> or <code>except Exception:</code> hides bugs. Catch only the specific exceptions you expect and know how to handle.</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>What exception does <code>10 / 0</code> raise?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">ValueError</button>
      <button class="qopt" onclick="qa(this,true)">ZeroDivisionError</button>
      <button class="qopt" onclick="qa(this,false)">TypeError</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>The <code>finally</code> block runs?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">Only when there's no error</button>
      <button class="qopt" onclick="qa(this,false)">Only when there is an error</button>
      <button class="qopt" onclick="qa(this,true)">Always, regardless of error</button>
    </div>
  </div>
</div>
`,
},

{
  id: 'lesson-18',
  title: 'Modules & the Standard Library',
  starter: `import math
import random
import datetime

# math module
print(math.pi)
print(math.sqrt(144))
print(math.floor(3.7))
print(math.ceil(3.2))
print(math.factorial(6))

# random module
print(random.randint(1, 100))
print(random.choice(["heads", "tails"]))
nums = [1, 2, 3, 4, 5]
random.shuffle(nums)
print(nums)

# datetime module
now = datetime.datetime.now()
print(now)
print(now.year, now.month, now.day)
print(now.strftime("%d %B %Y"))`,
  content: `
<h2 class="lesson-title">Modules & the Standard Library</h2>
<p class="lesson-intro">A module is a Python file containing reusable code. Python ships with an enormous <strong>standard library</strong> — hundreds of modules covering math, dates, files, networking, JSON, regular expressions, and much more. You don't need to install anything to use them.</p>

<h3>Importing modules</h3>
<div class="code-block">import math                    # import whole module
from math import sqrt, pi      # import specific names
import math as m               # alias
from datetime import datetime  # common pattern</div>

<h3>math — mathematical functions</h3>
<div class="code-block">import math
math.pi          # 3.14159...
math.e           # 2.71828...
math.sqrt(25)    # 5.0
math.floor(3.9)  # 3
math.ceil(3.1)   # 4
math.factorial(6) # 720
math.log(100, 10) # 2.0
math.sin(math.pi / 2)  # 1.0</div>

<h3>random — randomness</h3>
<div class="code-block">import random
random.randint(1, 10)           # random int between 1 and 10 inclusive
random.random()                  # float between 0.0 and 1.0
random.choice(["a","b","c"])    # random element
random.shuffle(my_list)          # shuffle in place
random.sample(my_list, k=3)     # 3 random unique elements</div>

<h3>datetime — dates and times</h3>
<div class="code-block">from datetime import datetime, date, timedelta

now = datetime.now()
print(now.year, now.month, now.day)
print(now.strftime("%d/%m/%Y"))   # formatted string

today = date.today()
birthday = date(2008, 5, 15)
delta = today - birthday
print(f"{delta.days} days old")</div>

<h3>os & sys — system interaction</h3>
<div class="code-block">import os
os.getcwd()              # current directory
os.listdir(".")          # list files
os.path.exists("file")  # check if file exists

import sys
sys.version              # Python version string</div>

<div class="tip-box"><strong>Third-party packages</strong> extend Python further — NumPy, Pandas, Requests, Flask, etc. Install them with <code>pip install package_name</code>. This platform includes many via Pyodide.</div>

<div class="quiz-section">
  <h4>Quick Check</h4>
  <div class="quiz-q">
    <p>What does <code>import math as m</code> do?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">Imports only the m function</button>
      <button class="qopt" onclick="qa(this,true)">Imports math and renames it m</button>
      <button class="qopt" onclick="qa(this,false)">Creates a new module called m</button>
    </div>
  </div>
  <div class="quiz-q">
    <p>Which generates a random integer from 1 to 10 inclusive?</p>
    <div class="quiz-opts">
      <button class="qopt" onclick="qa(this,false)">random.random(10)</button>
      <button class="qopt" onclick="qa(this,true)">random.randint(1, 10)</button>
      <button class="qopt" onclick="qa(this,false)">random.range(1, 10)</button>
    </div>
  </div>
</div>
`,
},

]

export const totalLessons = LESSONS.length
