// 19 lessons extracted from PQQQ.html
export const LESSONS = [
  {
    id: 'lesson-0',
    title: '🐍 What is Python?',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> A computer is incredibly powerful but completely dumb — it only does exactly what it is told. Python is how we give it friendly instructions that read almost like English!</div><p class="lesson-intro">Python was created by <strong>Guido van Rossum</strong> in 1991, named after the comedy show Monty Python's Flying Circus — not a snake! It is the <strong>#1 most popular language</strong> in the world for students and professionals alike.</p><div class="tip-box"><strong>🌍 Python powers:</strong> ChatGPT &amp; AI • Instagram • NASA &amp; SpaceX • Spotify • YouTube • Medical scan analysis</div><div class="analogy-box"><strong>🔤 Compare Hello World:</strong><br>Java: <code>System.out.println("Hello");</code><br>C++: <code>std::cout &lt;&lt; "Hello";</code><br>Python: <code>print("Hello")</code><br><br>Python wins on simplicity every time!</div><div class="tip-box"><strong>💡 Key facts:</strong><br>• Files end in <code>.py</code> &nbsp;• Completely FREE &nbsp;• Runs everywhere &nbsp;• PyQuest runs it in your browser!</div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. Who created Python?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">Bill Gates</button><button class="qopt" onclick="qa(this,true)">Guido van Rossum</button><button class="qopt" onclick="qa(this,false)">Elon Musk</button></div></div><div class="quiz-q"><p>2. Python was named after...</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">A snake</button><button class="qopt" onclick="qa(this,true)">A comedy TV show</button><button class="qopt" onclick="qa(this,false)">A scientist</button></div></div><div class="quiz-q"><p>3. Python files end in...</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">.txt</button><button class="qopt" onclick="qa(this,false)">.java</button><button class="qopt" onclick="qa(this,true)">.py</button></div></div></div>`,
    starter: `# Try Python!
print("Hello, World!")`,
  },
  {
    id: 'lesson-1',
    title: '🖨️ print() — Your Very First Command',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> <code>print()</code> is Python's megaphone 📢. Whatever you put inside the brackets gets displayed on the screen. Every programmer's first program uses print!</div><div class="code-block"><span class="fn">print</span>(<span class="str">"Hello, World!"</span>)     <span class="cmt"># Hello, World!</span>
<span class="fn">print</span>(<span class="str">"I love Python! 🐍"</span>)  <span class="cmt"># I love Python! 🐍</span>
<span class="fn">print</span>(<span class="num">42</span>)                <span class="cmt"># 42</span>
<span class="fn">print</span>(<span class="num">3.14</span>)              <span class="cmt"># 3.14</span>
<span class="fn">print</span>()                 <span class="cmt"># blank line</span></div><div class="tip-box"><strong>💡 Print multiple items with commas — Python adds a space:</strong></div><div class="code-block"><span class="fn">print</span>(<span class="str">"My name is"</span>, <span class="str">"Arjun"</span>)   <span class="cmt"># My name is Arjun</span>
<span class="fn">print</span>(<span class="str">"Age:"</span>, <span class="num">12</span>)             <span class="cmt"># Age: 12</span>
<span class="fn">print</span>(<span class="num">10</span> + <span class="num">20</span>)              <span class="cmt"># 30</span></div><div class="tip-box"><strong>🎨 Control the ending with end= :</strong></div><div class="code-block"><span class="fn">print</span>(<span class="str">"Hello"</span>, end=<span class="str">" "</span>)
<span class="fn">print</span>(<span class="str">"World!"</span>)    <span class="cmt"># Hello World! (same line)</span>
<span class="fn">print</span>(<span class="str">"A"</span>, <span class="str">"B"</span>, <span class="str">"C"</span>, sep=<span class="str">"-"</span>)  <span class="cmt"># A-B-C</span></div><div class="warn-box"><strong>⚠️ Most common mistake — forgetting brackets!</strong><br><code>print "hello"</code> → ❌ SyntaxError<br><code>print("hello")</code> → ✅ Correct</div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. What does <code>print("Hi", "there")</code> output?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">Hithere</button><button class="qopt" onclick="qa(this,true)">Hi there</button><button class="qopt" onclick="qa(this,false)">Hi,there</button></div></div><div class="quiz-q"><p>2. What does empty <code>print()</code> do?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">Error</button><button class="qopt" onclick="qa(this,true)">Prints a blank line</button><button class="qopt" onclick="qa(this,false)">Prints None</button></div></div><div class="quiz-q"><p>3. What does <code>print(5 + 3)</code> output?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">5 + 3</button><button class="qopt" onclick="qa(this,true)">8</button><button class="qopt" onclick="qa(this,false)">"8"</button></div></div></div>`,
    starter: `# Try print()
print("Hello!")
print("My name is Coder")`,
  },
  {
    id: 'lesson-2',
    title: '💬 Comments — Notes in Your Code',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> Comments are sticky notes 📝 in your code. Python completely ignores them — they exist purely for humans to understand what the code does.</div><div class="code-block"><span class="cmt"># Single line comment — Python ignores this</span>
<span class="fn">print</span>(<span class="str">"Hello!"</span>)  <span class="cmt"># inline comment</span>
<span class="cmt"># Step 1: Store the temperature</span>
temp = <span class="num">100</span></div><div class="tip-box"><strong>📝 Multi-line comments with triple quotes:</strong></div><div class="code-block"><span class="str">"""
Author: Arjun
Date: 2025
This program converts temperatures.
"""</span>
<span class="fn">print</span>(<span class="str">"Converting..."</span>)</div><div class="tip-box"><strong>💡 Temporarily disable code:</strong></div><div class="code-block">x = <span class="num">10</span>
<span class="cmt"># print(x * 2)   ← disabled</span>
<span class="fn">print</span>(x + <span class="num">5</span>)    <span class="cmt"># 15</span></div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. What symbol starts a comment?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">//</button><button class="qopt" onclick="qa(this,true)">#</button><button class="qopt" onclick="qa(this,false)">/*</button></div></div><div class="quiz-q"><p>2. Does Python run commented code?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">Yes</button><button class="qopt" onclick="qa(this,true)">No, it ignores them</button></div></div></div>`,
    starter: `# This is a comment
# Python ignores these lines
print("Comments are great!")`,
  },
  {
    id: 'lesson-3',
    title: '🗃️ Variables — Storing Information',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> A variable is a labelled storage box 📦. Give it a name, put something inside, and call it by name whenever you need it. You can change what is inside any time.</div><div class="code-block">name = <span class="str">"Priya"</span>         <span class="cmt"># text</span>
age = <span class="num">12</span>             <span class="cmt"># whole number</span>
height = <span class="num">1.52</span>        <span class="cmt"># decimal</span>
is_student = <span class="kw">True</span>   <span class="cmt"># True or False</span>
<span class="fn">print</span>(name)  <span class="cmt"># Priya</span>
<span class="fn">print</span>(age)   <span class="cmt"># 12</span></div><div class="tip-box"><strong>🔄 Variables can change:</strong></div><div class="code-block">score = <span class="num">0</span>
score = <span class="num">10</span>
score = score + <span class="num">5</span>
<span class="fn">print</span>(score)    <span class="cmt"># 15</span></div><div class="tip-box"><strong>📝 Naming rules:</strong><br>✅ <code>my_name</code> ✅ <code>score2</code> ✅ <code>playerScore</code><br>❌ <code>2score</code> (starts with number) ❌ <code>my name</code> (space) ❌ <code>for</code> (reserved word)</div><div class="code-block">x, y, z = <span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>   <span class="cmt"># multiple assignment</span>
<span class="fn">print</span>(x, y, z)       <span class="cmt"># 1 2 3</span></div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. Which name is valid?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">2name</button><button class="qopt" onclick="qa(this,false)">my name</button><button class="qopt" onclick="qa(this,true)">my_name</button></div></div><div class="quiz-q"><p>2. What prints?<br><code class="qcode">x = 5
x = x + 3
print(x)</code></p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">5</button><button class="qopt" onclick="qa(this,true)">8</button><button class="qopt" onclick="qa(this,false)">x+3</button></div></div><div class="quiz-q"><p>3. Can a variable change after being set?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,true)">Yes</button><button class="qopt" onclick="qa(this,false)">No</button></div></div></div>`,
    starter: `name = "Python"
age = 30
print(name)
print(age)`,
  },
  {
    id: 'lesson-4',
    title: '🔢 Data Types',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> Just like boxes come in different shapes for different things (shoe box, lunch box), Python has different types for different kinds of data.</div><div class="code-block"><span class="cmt"># str — text (always in quotes)</span>
name = <span class="str">"Rohan"</span>
<span class="cmt"># int — whole numbers</span>
age = <span class="num">13</span>
floors = <span class="num">-5</span>
<span class="cmt"># float — decimals</span>
height = <span class="num">1.65</span>
<span class="cmt"># bool — only True or False</span>
passed = <span class="kw">True</span>
<span class="fn">print</span>(<span class="fn">type</span>(name))    <span class="cmt"># &lt;class 'str'&gt;</span>
<span class="fn">print</span>(<span class="fn">type</span>(age))     <span class="cmt"># &lt;class 'int'&gt;</span>
<span class="fn">print</span>(<span class="fn">type</span>(height))  <span class="cmt"># &lt;class 'float'&gt;</span></div><div class="tip-box"><strong>🔄 Type Conversion:</strong></div><div class="code-block"><span class="fn">int</span>(<span class="str">"42"</span>)      <span class="cmt"># "42" → 42</span>
<span class="fn">float</span>(<span class="str">"3.14"</span>) <span class="cmt"># "3.14" → 3.14</span>
<span class="fn">str</span>(<span class="num">100</span>)      <span class="cmt"># 100 → "100"</span>
<span class="fn">int</span>(<span class="num">9.9</span>)      <span class="cmt"># 9.9 → 9 (truncates!)</span></div><div class="warn-box"><strong>⚠️ Cannot convert text that is not a number!</strong><br><code>int("hello")</code> → ❌ ValueError</div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. What type is <code>42</code>?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">str</button><button class="qopt" onclick="qa(this,true)">int</button><button class="qopt" onclick="qa(this,false)">float</button></div></div><div class="quiz-q"><p>2. What type is <code>"42"</code>?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,true)">str</button><button class="qopt" onclick="qa(this,false)">int</button><button class="qopt" onclick="qa(this,false)">bool</button></div></div><div class="quiz-q"><p>3. What does <code>int(7.9)</code> return?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">8</button><button class="qopt" onclick="qa(this,true)">7</button><button class="qopt" onclick="qa(this,false)">7.9</button></div></div></div>`,
    starter: `x = 42
y = 3.14
z = "Hello"
b = True
print(type(x))
print(type(y))
print(type(z))`,
  },
  {
    id: 'lesson-5',
    title: '➕ Operators — Python as a Calculator',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> Python is the world's most powerful calculator. It does everything your school calculator does — plus some extra secret operations that are incredibly useful in coding!</div><div class="code-block"><span class="fn">print</span>(<span class="num">10</span> + <span class="num">3</span>)    <span class="cmt"># 13   Addition</span>
<span class="fn">print</span>(<span class="num">10</span> - <span class="num">3</span>)    <span class="cmt"># 7    Subtraction</span>
<span class="fn">print</span>(<span class="num">10</span> * <span class="num">3</span>)    <span class="cmt"># 30   Multiplication</span>
<span class="fn">print</span>(<span class="num">10</span> / <span class="num">3</span>)    <span class="cmt"># 3.333 Division (always float!)</span>
<span class="fn">print</span>(<span class="num">10</span> // <span class="num">3</span>)   <span class="cmt"># 3    Floor Division (no decimal)</span>
<span class="fn">print</span>(<span class="num">10</span> % <span class="num">3</span>)    <span class="cmt"># 1    Modulo (REMAINDER)</span>
<span class="fn">print</span>(<span class="num">2</span> ** <span class="num">8</span>)    <span class="cmt"># 256  Exponent (2 to the power 8)</span></div><div class="tip-box"><strong>⭐ The % (Modulo) operator is magic in programming!</strong><br><code>10 % 3 = 1</code> because 3 goes into 10 three times (=9), leftover = 1.<br>Use it to: check even/odd (<code>n%2==0</code>), FizzBuzz, clock arithmetic.</div><div class="tip-box"><strong>🔧 Shortcut operators:</strong></div><div class="code-block">score = <span class="num">10</span>
score += <span class="num">5</span>   <span class="cmt"># = score + 5 → 15</span>
score -= <span class="num">3</span>   <span class="cmt"># = score - 3 → 12</span>
score *= <span class="num">2</span>   <span class="cmt"># = score * 2 → 24</span>
score **= <span class="num">2</span>  <span class="cmt"># = score ** 2 → 576</span></div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. What is <code>17 % 5</code>?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">3</button><button class="qopt" onclick="qa(this,true)">2</button><button class="qopt" onclick="qa(this,false)">4</button></div></div><div class="quiz-q"><p>2. What is <code>2 ** 10</code>?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">20</button><button class="qopt" onclick="qa(this,true)">1024</button><button class="qopt" onclick="qa(this,false)">200</button></div></div><div class="quiz-q"><p>3. What is <code>9 // 2</code>?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">4.5</button><button class="qopt" onclick="qa(this,true)">4</button><button class="qopt" onclick="qa(this,false)">5</button></div></div></div>`,
    starter: `a = 10
b = 3
print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a ** b)
print(a % b)`,
  },
  {
    id: 'lesson-6',
    title: '🔤 Strings — Working with Text',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> A string is like a necklace of character-beads, each with a position number (index) starting at 0. Count them, cut the necklace, reverse it — all with Python's string tools.</div><div class="code-block">a = <span class="str">"Hello"</span>           <span class="cmt"># double quotes</span>
b = <span class="str">'World'</span>           <span class="cmt"># single quotes — same thing!</span>
full = <span class="str">"Priya"</span> + <span class="str">" "</span> + <span class="str">"Reddy"</span>   <span class="cmt"># "Priya Reddy"</span>
laugh = <span class="str">"Ha"</span> * <span class="num">3</span>               <span class="cmt"># "HaHaHa"</span>
word = <span class="str">"Python"</span>
<span class="fn">print</span>(<span class="fn">len</span>(word))    <span class="cmt"># 6</span>
<span class="fn">print</span>(word[<span class="num">0</span>])     <span class="cmt"># P (first — index 0!)</span>
<span class="fn">print</span>(word[-<span class="num">1</span>])    <span class="cmt"># n (last)</span>
<span class="fn">print</span>(word[<span class="num">2</span>:<span class="num">5</span>])   <span class="cmt"># tho (slicing)</span>
<span class="fn">print</span>(word[::-<span class="num">1</span>])  <span class="cmt"># nohtyP (reversed!)</span></div><div class="tip-box"><strong>🛠️ String methods:</strong></div><div class="code-block">s = <span class="str">"hello world"</span>
<span class="fn">print</span>(s.upper())           <span class="cmt"># HELLO WORLD</span>
<span class="fn">print</span>(s.title())           <span class="cmt"># Hello World</span>
<span class="fn">print</span>(s.replace(<span class="str">"hello"</span>,<span class="str">"hi"</span>))  <span class="cmt"># hi world</span>
<span class="fn">print</span>(s.split())           <span class="cmt"># ["hello","world"]</span>
<span class="fn">print</span>(<span class="str">"world"</span> <span class="kw">in</span> s)        <span class="cmt"># True</span></div><div class="tip-box"><strong>🎨 f-strings — cleanest way to mix variables and text:</strong></div><div class="code-block">name = <span class="str">"Arjun"</span>; age = <span class="num">12</span>
<span class="fn">print</span>(<span class="str">f"I am {name}, age {age}"</span>)
<span class="fn">print</span>(<span class="str">f"Next year: {age+1}"</span>)
<span class="fn">print</span>(<span class="str">f"Pi: {3.14159:.2f}"</span>)   <span class="cmt"># Pi: 3.14</span></div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. What is <code>"Ha" * 3</code>?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">Ha3</button><button class="qopt" onclick="qa(this,true)">HaHaHa</button><button class="qopt" onclick="qa(this,false)">Ha Ha Ha</button></div></div><div class="quiz-q"><p>2. What is <code>"Python"[0]</code>?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,true)">P</button><button class="qopt" onclick="qa(this,false)">y</button><button class="qopt" onclick="qa(this,false)">1</button></div></div><div class="quiz-q"><p>3. What does <code>"hello".upper()</code> return?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,true)">HELLO</button><button class="qopt" onclick="qa(this,false)">Hello</button><button class="qopt" onclick="qa(this,false)">hello</button></div></div></div>`,
    starter: `name = "Python"
print(name.upper())
print(name.lower())
print(len(name))
print(name * 3)`,
  },
  {
    id: 'lesson-7',
    title: '✅ Booleans & Comparisons',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> A boolean is a light switch — ON (True) or OFF (False). Every comparison you make produces one of these two values. They power all decisions in your programs.</div><div class="code-block"><span class="fn">print</span>(<span class="num">5</span> == <span class="num">5</span>)     <span class="cmt"># True  — equal to</span>
<span class="fn">print</span>(<span class="num">5</span> != <span class="num">3</span>)     <span class="cmt"># True  — not equal</span>
<span class="fn">print</span>(<span class="num">10</span> > <span class="num">5</span>)     <span class="cmt"># True  — greater than</span>
<span class="fn">print</span>(<span class="num">10</span> < <span class="num">5</span>)     <span class="cmt"># False — less than</span>
<span class="fn">print</span>(<span class="num">10</span> >= <span class="num">10</span>)   <span class="cmt"># True  — greater or equal</span>
<span class="fn">print</span>(<span class="num">10</span> <= <span class="num">9</span>)    <span class="cmt"># False — less or equal</span></div><div class="tip-box"><strong>🔗 Logical operators — combine conditions:</strong></div><div class="code-block"><span class="fn">print</span>(<span class="kw">True</span> <span class="kw">and</span> <span class="kw">True</span>)    <span class="cmt"># True (both must be True)</span>
<span class="fn">print</span>(<span class="kw">True</span> <span class="kw">and</span> <span class="kw">False</span>)   <span class="cmt"># False</span>
<span class="fn">print</span>(<span class="kw">True</span> <span class="kw">or</span> <span class="kw">False</span>)    <span class="cmt"># True (one is enough)</span>
<span class="fn">print</span>(<span class="kw">not</span> <span class="kw">True</span>)          <span class="cmt"># False</span></div><div class="warn-box"><strong>⚠️ = vs == — most common beginner mistake!</strong><br><code>x = 5</code> → assigns (puts 5 in box x)<br><code>x == 5</code> → compares (asks "is x equal to 5?")</div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. What is <code>True and False</code>?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">True</button><button class="qopt" onclick="qa(this,true)">False</button></div></div><div class="quiz-q"><p>2. What is <code>False or True</code>?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,true)">True</button><button class="qopt" onclick="qa(this,false)">False</button></div></div><div class="quiz-q"><p>3. What is <code>not (5 > 3)</code>?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">True</button><button class="qopt" onclick="qa(this,true)">False</button></div></div></div>`,
    starter: `x = 10
y = 20
print(x == y)
print(x < y)
print(x != y)
print(True and False)
print(True or False)`,
  },
  {
    id: 'lesson-8',
    title: '⌨️ User Input',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> <code>input()</code> is your program asking a question and waiting. The user types an answer, presses Enter, and Python stores it for you to use.</div><div class="code-block">name = <span class="fn">input</span>(<span class="str">"What is your name? "</span>)
<span class="fn">print</span>(<span class="str">f"Hello, {name}!"</span>)</div><div class="warn-box"><strong>⚠️ CRITICAL: input() ALWAYS returns a string!</strong><br>Convert with int() or float() before doing maths!</div><div class="code-block"><span class="cmt"># Wrong!</span>
age = <span class="fn">input</span>(<span class="str">"Age: "</span>)
<span class="fn">print</span>(age + <span class="num">10</span>)   <span class="cmt"># ❌ Error</span>
<span class="cmt"># Correct!</span>
age = <span class="fn">int</span>(<span class="fn">input</span>(<span class="str">"Age: "</span>))
<span class="fn">print</span>(age + <span class="num">10</span>)   <span class="cmt"># ✅ Works!</span>
price = <span class="fn">float</span>(<span class="fn">input</span>(<span class="str">"Price: "</span>))
<span class="fn">print</span>(<span class="str">f"With tax: {price * 1.18:.2f}"</span>)</div><div class="tip-box"><strong>📝 Note for PyQuest:</strong> In the browser, input() does not work interactively. Use hardcoded values for challenges. On your own computer, input() works perfectly!</div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. What type does input() always return?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">int</button><button class="qopt" onclick="qa(this,true)">str</button><button class="qopt" onclick="qa(this,false)">float</button></div></div><div class="quiz-q"><p>2. To use input() for maths, use...</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,true)">int(input(...))</button><button class="qopt" onclick="qa(this,false)">input(int(...))</button><button class="qopt" onclick="qa(this,false)">Just input()</button></div></div></div>`,
    starter: `name = input("What is your name? ")
print("Hello,", name)`,
  },
  {
    id: 'lesson-9',
    title: '🔀 if / elif / else — Making Decisions',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> if/elif/else is a choose-your-own-adventure book. IF this → do this. ELSE IF that → do that. ELSE → do this instead. Python checks top to bottom and stops at the first True condition.</div><div class="code-block">marks = <span class="num">82</span>
<span class="kw">if</span> marks >= <span class="num">90</span>:
    <span class="fn">print</span>(<span class="str">"Grade: A 🌟"</span>)
<span class="kw">elif</span> marks >= <span class="num">75</span>:
    <span class="fn">print</span>(<span class="str">"Grade: B 😊"</span>)    <span class="cmt"># this runs!</span>
<span class="kw">elif</span> marks >= <span class="num">60</span>:
    <span class="fn">print</span>(<span class="str">"Grade: C 😐"</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="str">"Grade: F 😢"</span>)</div><div class="warn-box"><strong>⚠️ Two critical rules:</strong><br>1. Every if/elif/else line MUST end with <code>:</code><br>2. Code inside MUST be indented (4 spaces). Python uses indentation — not brackets!</div><div class="tip-box"><strong>💡 Nested conditions:</strong></div><div class="code-block">age = <span class="num">20</span>; has_id = <span class="kw">True</span>
<span class="kw">if</span> age >= <span class="num">18</span> <span class="kw">and</span> has_id:
    <span class="fn">print</span>(<span class="str">"Welcome! ✅"</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="str">"Entry denied 🚫"</span>)</div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. What must end every if/elif/else line?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">;</button><button class="qopt" onclick="qa(this,true)">:</button><button class="qopt" onclick="qa(this,false)">{</button></div></div><div class="quiz-q"><p>2. If marks=72, what grade prints? (if>=90:A, elif>=75:B, elif>=60:C, else:F)</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">A</button><button class="qopt" onclick="qa(this,false)">B</button><button class="qopt" onclick="qa(this,true)">C</button><button class="qopt" onclick="qa(this,false)">F</button></div></div><div class="quiz-q"><p>3. When does the else block run?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">Always</button><button class="qopt" onclick="qa(this,true)">When all conditions above are False</button><button class="qopt" onclick="qa(this,false)">Never</button></div></div></div>`,
    starter: `score = 85
if score >= 90:
    print("A grade")
elif score >= 70:
    print("B grade")
else:
    print("Keep trying")`,
  },
  {
    id: 'lesson-10',
    title: '🔁 for Loops — Repeating Actions',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> A for loop is like a teacher calling roll. They go through every name in the register and call each one. Python does the same — goes through every item in a sequence, one by one, automatically.</div><div class="code-block"><span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">5</span>):
    <span class="fn">print</span>(i)             <span class="cmt"># 0, 1, 2, 3, 4</span>
fruits = [<span class="str">"apple"</span>, <span class="str">"mango"</span>, <span class="str">"banana"</span>]
<span class="kw">for</span> fruit <span class="kw">in</span> fruits:
    <span class="fn">print</span>(fruit)
<span class="kw">for</span> letter <span class="kw">in</span> <span class="str">"Python"</span>:
    <span class="fn">print</span>(letter, end=<span class="str">"-"</span>)    <span class="cmt"># P-y-t-h-o-n-</span></div><div class="tip-box"><strong>🔢 range() — your loop counter machine:</strong></div><div class="code-block"><span class="fn">range</span>(<span class="num">5</span>)           <span class="cmt"># 0,1,2,3,4</span>
<span class="fn">range</span>(<span class="num">1</span>, <span class="num">6</span>)        <span class="cmt"># 1,2,3,4,5</span>
<span class="fn">range</span>(<span class="num">10</span>, <span class="num">0</span>, -<span class="num">1</span>)   <span class="cmt"># 10,9,...,1 (backwards!)</span>
<span class="fn">range</span>(<span class="num">0</span>, <span class="num">20</span>, <span class="num">2</span>)    <span class="cmt"># 0,2,4,...,18 (step 2)</span></div><div class="code-block"><span class="cmt"># Accumulator pattern</span>
total = <span class="num">0</span>
<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">101</span>):
    total += i
<span class="fn">print</span>(total)    <span class="cmt"># 5050</span></div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. How many times does <code>for i in range(4):</code> run?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">3</button><button class="qopt" onclick="qa(this,true)">4</button><button class="qopt" onclick="qa(this,false)">5</button></div></div><div class="quiz-q"><p>2. What does <code>range(1, 6)</code> produce?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">1,2,3,4,5,6</button><button class="qopt" onclick="qa(this,true)">1,2,3,4,5</button><button class="qopt" onclick="qa(this,false)">0,1,2,3,4,5</button></div></div><div class="quiz-q"><p>3. What does <code>range(5,0,-1)</code> produce?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,true)">5,4,3,2,1</button><button class="qopt" onclick="qa(this,false)">0,1,2,3,4</button><button class="qopt" onclick="qa(this,false)">5,4,3,2,1,0</button></div></div></div>`,
    starter: `for i in range(1, 6):
    print(i)

fruits = ["apple", "mango", "banana"]
for fruit in fruits:
    print(fruit)`,
  },
  {
    id: 'lesson-11',
    title: '🔄 while Loops, break & continue',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> A while loop is like eating from a plate — WHILE there is food, keep eating. break is the fire alarm 🚨 (stop everything!). continue is the skip button ⏭️ (skip this one, go to next).</div><div class="code-block">count = <span class="num">1</span>
<span class="kw">while</span> count <= <span class="num">5</span>:
    <span class="fn">print</span>(<span class="str">f"Count: {count}"</span>)
    count += <span class="num">1</span>    <span class="cmt"># MUST update or infinite loop!</span></div><div class="warn-box"><strong>⚠️ Infinite Loop!</strong> If the condition never becomes False, the loop runs forever. Always update your variable inside the loop!</div><div class="tip-box"><strong>💡 for vs while:</strong><br>Use <code>for</code> when you know exactly how many times.<br>Use <code>while</code> when you loop until something happens.</div><div class="code-block"><span class="cmt"># break — exit loop early</span>
<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">10</span>):
    <span class="kw">if</span> i == <span class="num">5</span>:
        <span class="kw">break</span>
    <span class="fn">print</span>(i)    <span class="cmt"># 1 2 3 4</span>
<span class="cmt"># continue — skip this iteration</span>
<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">6</span>):
    <span class="kw">if</span> i == <span class="num">3</span>:
        <span class="kw">continue</span>
    <span class="fn">print</span>(i)    <span class="cmt"># 1 2 4 5</span></div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. How many times does this print?<br><code class="qcode">x=3
while x>0:
    print(x)
    x-=1</code></p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">2</button><button class="qopt" onclick="qa(this,true)">3</button><button class="qopt" onclick="qa(this,false)">4</button></div></div><div class="quiz-q"><p>2. What does break do?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,true)">Exits the loop completely</button><button class="qopt" onclick="qa(this,false)">Skips one iteration</button></div></div><div class="quiz-q"><p>3. What does continue do?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">Exits the loop</button><button class="qopt" onclick="qa(this,true)">Skips to next iteration</button></div></div></div>`,
    starter: `count = 0
while count < 5:
    print(count)
    count += 1`,
  },
  {
    id: 'lesson-12',
    title: '📋 Lists — Complete Guide',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> A list is a numbered shelf. Shelf 0 has the first item, shelf 1 the second. Add, remove, rearrange — completely flexible!</div><div class="code-block">fruits = [<span class="str">"apple"</span>, <span class="str">"mango"</span>, <span class="str">"banana"</span>]
<span class="fn">print</span>(fruits[<span class="num">0</span>])     <span class="cmt"># apple</span>
<span class="fn">print</span>(fruits[-<span class="num">1</span>])    <span class="cmt"># banana (last)</span>
<span class="fn">print</span>(<span class="fn">len</span>(fruits))    <span class="cmt"># 3</span>
<span class="fn">print</span>(fruits[<span class="num">1</span>:<span class="num">3</span>])   <span class="cmt"># ["mango","banana"] slicing</span>
<span class="fn">print</span>(fruits[::-<span class="num">1</span>])  <span class="cmt"># reversed</span></div><div class="tip-box"><strong>🔧 Modifying lists:</strong></div><div class="code-block">fruits.append(<span class="str">"grape"</span>)    <span class="cmt"># add to end</span>
fruits.insert(<span class="num">1</span>, <span class="str">"kiwi"</span>)  <span class="cmt"># add at index 1</span>
fruits.remove(<span class="str">"apple"</span>)   <span class="cmt"># remove by value</span>
fruits.pop()              <span class="cmt"># remove last</span>
fruits.sort()             <span class="cmt"># sort A-Z</span>
fruits.reverse()          <span class="cmt"># flip order</span>
fruits[<span class="num">0</span>] = <span class="str">"pear"</span>       <span class="cmt"># change item</span></div><div class="code-block">nums = [<span class="num">5</span>, <span class="num">2</span>, <span class="num">8</span>, <span class="num">1</span>, <span class="num">9</span>]
<span class="fn">print</span>(<span class="fn">sum</span>(nums))     <span class="cmt"># 25</span>
<span class="fn">print</span>(<span class="fn">max</span>(nums))     <span class="cmt"># 9</span>
<span class="fn">print</span>(<span class="fn">min</span>(nums))     <span class="cmt"># 1</span>
<span class="fn">print</span>(<span class="num">8</span> <span class="kw">in</span> nums)     <span class="cmt"># True</span></div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. What is <code>["a","b","c"][1]</code>?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">a</button><button class="qopt" onclick="qa(this,true)">b</button><button class="qopt" onclick="qa(this,false)">c</button></div></div><div class="quiz-q"><p>2. How do you add to the end of a list?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,true)">.append()</button><button class="qopt" onclick="qa(this,false)">.add()</button><button class="qopt" onclick="qa(this,false)">.push()</button></div></div><div class="quiz-q"><p>3. What is <code>len([10,20,30])</code>?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">30</button><button class="qopt" onclick="qa(this,true)">3</button><button class="qopt" onclick="qa(this,false)">60</button></div></div></div>`,
    starter: `fruits = ["apple", "mango", "banana"]
print(fruits[0])
fruits.append("grape")
print(len(fruits))`,
  },
  {
    id: 'lesson-13',
    title: '🗺️ Dictionaries',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> A dictionary is like a contact book. Look up a name (key) to find a phone number (value). Every key is unique — no duplicate entries.</div><div class="code-block">student = {
    <span class="str">"name"</span>: <span class="str">"Priya"</span>,
    <span class="str">"age"</span>: <span class="num">12</span>,
    <span class="str">"score"</span>: <span class="num">95</span>
}
<span class="fn">print</span>(student[<span class="str">"name"</span>])                 <span class="cmt"># Priya</span>
<span class="fn">print</span>(student.get(<span class="str">"city"</span>, <span class="str">"Unknown"</span>))  <span class="cmt"># Unknown (safe)</span>
student[<span class="str">"age"</span>] = <span class="num">13</span>           <span class="cmt"># update</span>
student[<span class="str">"city"</span>] = <span class="str">"Hyderabad"</span> <span class="cmt"># add new</span>
<span class="kw">del</span> student[<span class="str">"score"</span>]          <span class="cmt"># delete</span>
<span class="kw">for</span> key, val <span class="kw">in</span> student.items():
    <span class="fn">print</span>(<span class="str">f"{key}: {val}"</span>)</div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. How do you access a value?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,true)">dict["key"]</button><button class="qopt" onclick="qa(this,false)">dict(key)</button><button class="qopt" onclick="qa(this,false)">dict.key()</button></div></div><div class="quiz-q"><p>2. Can a dict have duplicate keys?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">Yes</button><button class="qopt" onclick="qa(this,true)">No — keys must be unique</button></div></div></div>`,
    starter: `person = {"name": "Raj", "age": 14}
print(person["name"])
person["city"] = "Delhi"
print(person)`,
  },
  {
    id: 'lesson-14',
    title: '📚 Tuples & Sets',
    content: `<div class="analogy-box"><strong>Tuples:</strong> Written in pen — once created, cannot be changed. Use for data that should never change (coordinates, days of week).<br><br><strong>Sets:</strong> A bag that automatically rejects duplicates. Perfect for getting unique values.</div><div class="code-block"><span class="cmt"># Tuples — parentheses</span>
coords = (<span class="num">17.38</span>, <span class="num">78.47</span>)
lat, lng = coords    <span class="cmt"># unpacking!</span>
<span class="fn">print</span>(lat, lng)
<span class="cmt"># Sets — curly braces</span>
unique = {<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">2</span>, <span class="num">1</span>}
<span class="fn">print</span>(unique)         <span class="cmt"># {1, 2, 3}</span>
with_dupes = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">3</span>]
clean = <span class="fn">list</span>(<span class="fn">set</span>(with_dupes))
<span class="cmt"># Set operations</span>
a = {<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>}; b = {<span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>}
<span class="fn">print</span>(a | b)    <span class="cmt"># {1,2,3,4} union</span>
<span class="fn">print</span>(a & b)    <span class="cmt"># {2,3} intersection</span>
<span class="fn">print</span>(a - b)    <span class="cmt"># {1} difference</span></div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. What does <code>{1,2,2,3}</code> store?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,true)">{1,2,3}</button><button class="qopt" onclick="qa(this,false)">{1,2,2,3}</button><button class="qopt" onclick="qa(this,false)">Error</button></div></div><div class="quiz-q"><p>2. Can you change a tuple?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">Yes</button><button class="qopt" onclick="qa(this,true)">No</button></div></div></div>`,
    starter: `coords = (10, 20)
colors = {"red", "blue", "green"}
print(coords)
print(colors)`,
  },
  {
    id: 'lesson-15',
    title: '⚙️ Functions — Reusable Code',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> A function is a recipe 🍳. Write it once, use it unlimited times. Give it ingredients (parameters), get a result (return value). No more copy-pasting the same code!</div><div class="code-block"><span class="kw">def</span> <span class="fn">greet</span>(name):
    <span class="fn">print</span>(<span class="str">f"Hello, {name}! 👋"</span>)
<span class="fn">greet</span>(<span class="str">"Arjun"</span>)   <span class="cmt"># Hello, Arjun! 👋</span>
<span class="fn">greet</span>(<span class="str">"Priya"</span>)   <span class="cmt"># Hello, Priya! 👋</span>
<span class="cmt"># Return a value</span>
<span class="kw">def</span> <span class="fn">add</span>(a, b):
    <span class="kw">return</span> a + b
<span class="fn">print</span>(<span class="fn">add</span>(<span class="num">5</span>, <span class="num">3</span>))      <span class="cmt"># 8</span>
<span class="fn">print</span>(<span class="fn">add</span>(<span class="num">10</span>, <span class="num">20</span>))    <span class="cmt"># 30</span>
<span class="cmt"># Default parameters</span>
<span class="kw">def</span> <span class="fn">power</span>(base, exp=<span class="num">2</span>):
    <span class="kw">return</span> base ** exp
<span class="fn">print</span>(<span class="fn">power</span>(<span class="num">5</span>))        <span class="cmt"># 25 (5²)</span>
<span class="fn">print</span>(<span class="fn">power</span>(<span class="num">2</span>, <span class="num">10</span>))    <span class="cmt"># 1024</span></div><div class="tip-box"><strong>💡 print vs return:</strong><br>print → shows on screen only.<br>return → sends value back so you can store it, do maths with it, pass it elsewhere.</div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. What keyword defines a function?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">function</button><button class="qopt" onclick="qa(this,true)">def</button><button class="qopt" onclick="qa(this,false)">func</button></div></div><div class="quiz-q"><p>2. What does <code>def f(): return 7</code> → <code>print(f())</code> output?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">Nothing</button><button class="qopt" onclick="qa(this,true)">7</button><button class="qopt" onclick="qa(this,false)">f()</button></div></div><div class="quiz-q"><p>3. If <code>def f(x,y=10): return x+y</code>, what does <code>f(5)</code> give?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">5</button><button class="qopt" onclick="qa(this,true)">15</button><button class="qopt" onclick="qa(this,false)">Error</button></div></div></div>`,
    starter: `def greet(name):
    return "Hello, " + name

result = greet("World")
print(result)`,
  },
  {
    id: 'lesson-16',
    title: '🎲 random & math Modules',
    content: `<div class="analogy-box"><strong>🧠 Modules are toolboxes you import.</strong> random is a dice factory 🎲. math is a scientific calculator upgrade 🔬. Unlock them with import.</div><div class="code-block"><span class="kw">import</span> random
<span class="fn">print</span>(random.randint(<span class="num">1</span>, <span class="num">6</span>))        <span class="cmt"># random 1–6</span>
<span class="fn">print</span>(random.random())                <span class="cmt"># float 0–1</span>
fruits = [<span class="str">"apple"</span>, <span class="str">"mango"</span>, <span class="str">"banana"</span>]
<span class="fn">print</span>(random.choice(fruits))          <span class="cmt"># random item</span>
<span class="fn">print</span>(random.sample(fruits, <span class="num">2</span>))      <span class="cmt"># 2 unique picks</span>
cards = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>]
random.shuffle(cards)
<span class="fn">print</span>(cards)</div><div class="code-block"><span class="kw">import</span> math
<span class="fn">print</span>(math.pi)              <span class="cmt"># 3.14159...</span>
<span class="fn">print</span>(math.sqrt(<span class="num">144</span>))      <span class="cmt"># 12.0</span>
<span class="fn">print</span>(math.floor(<span class="num">9.8</span>))    <span class="cmt"># 9  (round down)</span>
<span class="fn">print</span>(math.ceil(<span class="num">9.2</span>))     <span class="cmt"># 10 (round up)</span>
<span class="fn">print</span>(math.factorial(<span class="num">5</span>))  <span class="cmt"># 120</span>
<span class="fn">print</span>(math.pow(<span class="num">2</span>, <span class="num">10</span>))    <span class="cmt"># 1024.0</span></div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. What does <code>random.randint(1,6)</code> give?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">1 to 5</button><button class="qopt" onclick="qa(this,true)">1 to 6 inclusive</button><button class="qopt" onclick="qa(this,false)">0 to 6</button></div></div><div class="quiz-q"><p>2. What is <code>math.sqrt(81)</code>?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">81</button><button class="qopt" onclick="qa(this,true)">9.0</button><button class="qopt" onclick="qa(this,false)">9</button></div></div><div class="quiz-q"><p>3. What is <code>math.floor(7.9)</code>?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">8</button><button class="qopt" onclick="qa(this,true)">7</button><button class="qopt" onclick="qa(this,false)">7.9</button></div></div></div>`,
    starter: `import random
import math
print(random.randint(1, 10))
print(math.sqrt(16))
print(math.pi)`,
  },
  {
    id: 'lesson-17',
    title: '🌀 Nested Loops & Patterns',
    content: `<div class="analogy-box"><strong>🧠 Think of it like this:</strong> A nested loop is like a clock. The hour hand (outer loop) moves once. For every hour-move, the minute hand (inner loop) completes all 60 moves. Inner loop runs completely for EACH outer loop step.</div><div class="code-block"><span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">4</span>):
    <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">4</span>):
        <span class="fn">print</span>(<span class="str">f"{i}x{j}={i*j}"</span>, end=<span class="str">"  "</span>)
    <span class="fn">print</span>()</div><div class="tip-box"><strong>⭐ Star patterns:</strong></div><div class="code-block"><span class="cmt"># Triangle</span>
<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">6</span>):
    <span class="fn">print</span>(<span class="str">"★"</span> * i)
<span class="cmt"># Number pattern</span>
<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">6</span>):
    <span class="fn">print</span>(*<span class="fn">range</span>(<span class="num">1</span>, i+<span class="num">1</span>))</div><div class="quiz-section"><h4>🧪 Quiz!</h4><div class="quiz-q"><p>1. If outer runs 3 times and inner 4 times, how many total inner iterations?</p><div class="quiz-opts"><button class="qopt" onclick="qa(this,false)">7</button><button class="qopt" onclick="qa(this,true)">12</button><button class="qopt" onclick="qa(this,false)">3</button></div></div></div>`,
    starter: `for i in range(1, 6):
    print("*" * i)`,
  },
  {
    id: 'lesson-18',
    title: '🌍 Python in Real Life',
    content: `<div class="analogy-box"><strong>🌟 You are learning the language of the future!</strong> Everything you have learned in PyQuest is the foundation of billion-dollar products used by billions of people every day.</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1rem 0"><div style="background:#E8F5E9;border-radius:14px;padding:1rem;text-align:center"><div style="font-size:2rem">🤖</div><strong>AI / ChatGPT</strong><p style="font-size:.82rem;color:var(--muted);margin-top:.3rem">OpenAI builds everything with Python — including the AI you talk to</p></div><div style="background:#E3F2FD;border-radius:14px;padding:1rem;text-align:center"><div style="font-size:2rem">📸</div><strong>Instagram</strong><p style="font-size:.82rem;color:var(--muted);margin-top:.3rem">Handles 1 billion users daily with Python backend (Django)</p></div><div style="background:#FFF8E1;border-radius:14px;padding:1rem;text-align:center"><div style="font-size:2rem">🚀</div><strong>NASA & SpaceX</strong><p style="font-size:.82rem;color:var(--muted);margin-top:.3rem">Rocket telemetry, satellite data, mission planning</p></div><div style="background:#FCE4EC;border-radius:14px;padding:1rem;text-align:center"><div style="font-size:2rem">🎵</div><strong>Spotify</strong><p style="font-size:.82rem;color:var(--muted);margin-top:.3rem">The algorithm that recommends your next song is Python ML</p></div></div><div class="code-block"><span class="cmt"># With what you know RIGHT NOW, you can already:</span>
marks = [<span class="num">85</span>, <span class="num">92</span>, <span class="num">78</span>, <span class="num">96</span>, <span class="num">88</span>]
<span class="fn">print</span>(<span class="str">f"Average: {sum(marks)/len(marks):.1f}"</span>)
<span class="fn">print</span>(<span class="str">f"Highest: {max(marks)}"</span>)
history = [<span class="str">"Python"</span>, <span class="str">"Loops"</span>, <span class="str">"Python"</span>, <span class="str">"Python"</span>]
freq = {}
<span class="kw">for</span> item <span class="kw">in</span> history:
    freq[item] = freq.get(item, <span class="num">0</span>) + <span class="num">1</span>
<span class="fn">print</span>(<span class="str">f"Recommend: {max(freq, key=freq.get)}"</span>)</div><div class="tip-box"><strong>🎯 Your Python roadmap:</strong><br>1. ✅ PyQuest basics — you are here!<br>2. Build CLI programs (calculators, games)<br>3. Learn Flask → your first website<br>4. Learn Pandas/NumPy → data science<br>5. Learn TensorFlow → build AI models<br>6. 🌟 Junior Developer job or your own startup!</div>`,
    starter: `print("Python is used in:")
for use in ["AI", "Web", "Science", "Games"]:
    print("-", use)`,
  },
]

export const totalLessons = LESSONS.length