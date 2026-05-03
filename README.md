# 🐍 PyKids — Python Tutorial Site

Kid-friendly Python learning platform for Class 6 & 7 students.
Built with React + Vite + Supabase + Pyodide.

---

## 🚀 Setup in 5 Steps

### Step 1 — Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project", give it a name (e.g. `pykids`)
3. Once created, go to **SQL Editor** and paste + run the entire `SUPABASE_SETUP.sql` file
4. Go to **Project Settings → API** and copy:
   - `Project URL`
   - `anon public` key

### Step 2 — Set up environment variables
1. Copy `.env.example` to `.env`:
   ```
   cp .env.example .env
   ```
2. Fill in your Supabase values:
   ```
   VITE_SUPABASE_URL=https://yourproject.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### Step 3 — Run locally (optional)
```bash
npm install
npm run dev
```
Open http://localhost:5173

### Step 4 — Deploy to Netlify
1. Push the project to a GitHub repo
2. Go to [netlify.com](https://netlify.com) and click "Add new site → Import from Git"
3. Connect your GitHub repo
4. Build settings (auto-detected from netlify.toml):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Go to **Site Settings → Environment Variables** and add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
6. Trigger a deploy — done! 🎉

### Step 5 — Connect your custom domain
1. In Netlify: **Domain Settings → Add custom domain**
2. Enter your domain (from GitHub Student Pack)
3. Follow the DNS instructions Netlify gives you
4. SSL is automatic ✅

---

## 💰 Approving a Student After Payment

When a student pays you offline, go to your **Supabase SQL Editor** and run:

```sql
update profiles
set is_paid = true
where id = (
  select id from auth.users where email = 'student@email.com'
);
```

Replace `student@email.com` with their actual email. Done — they'll be unlocked instantly next time they log in!

---

## 📁 Project Structure

```
src/
├── components/
│   ├── CodeEditor.jsx      # Pyodide in-browser Python runner
│   ├── Navbar.jsx          # Top navigation
│   └── ProtectedRoute.jsx  # Auth + paid gating
├── context/
│   └── AuthContext.jsx     # Supabase auth state
├── data/
│   └── curriculum.js       # All lessons & quizzes — edit here!
├── lib/
│   └── supabase.js         # Supabase client
├── pages/
│   ├── Landing.jsx         # Home page
│   ├── Login.jsx           # Sign up / log in
│   ├── Paywall.jsx         # Shown when not yet approved
│   ├── Dashboard.jsx       # Lessons overview + progress
│   ├── Lesson.jsx          # Lesson content + code editor
│   └── Quiz.jsx            # MCQ quiz
├── App.jsx                 # Routes
└── main.jsx                # Entry point
```

---

## ✏️ Adding New Lessons

Open `src/data/curriculum.js` and add a new object to any module's `lessons` array:

```js
{
  id: 'lesson-X-X',      // must be unique
  title: 'My Lesson',
  xp: 20,
  content: `# Title\n\nYour markdown content here...`,
  starterCode: `# starter Python code`,
  quiz: {
    id: 'quiz-X-X',      // must be unique
    questions: [
      {
        q: 'Your question?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,  // index of correct option
      }
    ]
  }
}
```

---

## 🛠️ Tech Stack

| Thing | Tool |
|---|---|
| Frontend | React 18 + Vite |
| Styling | CSS Modules (no Tailwind) |
| Routing | React Router v6 |
| Auth + DB | Supabase |
| Python runner | Pyodide (WASM, runs in browser!) |
| Deployment | Netlify |
| Fonts | Fredoka One + Nunito (Google Fonts) |
