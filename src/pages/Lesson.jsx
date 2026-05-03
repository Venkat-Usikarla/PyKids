import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { getLessonById } from '../data/curriculum'
import CodeEditor from '../components/CodeEditor'
import styles from './Lesson.module.css'

// Very simple markdown-ish renderer
function SimpleMarkdown({ content }) {
  const lines = content.trim().split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith('# ')) {
      elements.push(<h1 key={i}>{line.slice(2)}</h1>)
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i}>{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i}>{line.slice(4)}</h3>)
    } else if (line.startsWith('```')) {
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(<pre key={i} className={styles.codeBlock}><code>{codeLines.join('\n')}</code></pre>)
    } else if (line.startsWith('| ')) {
      const tableLines = []
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      const headers = tableLines[0].split('|').filter(c => c.trim())
      const rows = tableLines.slice(2).map(r => r.split('|').filter(c => c.trim()))
      elements.push(
        <div key={i} className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr>{headers.map((h, j) => <th key={j}>{h.trim()}</th>)}</tr></thead>
            <tbody>{rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}>{c.trim()}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )
      continue
    } else if (line.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(<ul key={i}>{items.map((it, j) => <li key={j}>{it}</li>)}</ul>)
      continue
    } else if (line.trim() === '') {
      elements.push(<br key={i} />)
    } else {
      // Inline bold
      const parts = line.split(/\*\*(.*?)\*\*/g)
      const rendered = parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)
      elements.push(<p key={i}>{rendered}</p>)
    }
    i++
  }
  return <div className={styles.markdown}>{elements}</div>
}

export default function Lesson() {
  const { lessonId } = useParams()
  const { user, refreshProfile } = useAuth()
  const navigate = useNavigate()

  const lesson = getLessonById(lessonId)
  const [completed, setCompleted] = useState(false)
  const [completing, setCompleting] = useState(false)
  const [alreadyDone, setAlreadyDone] = useState(false)

  useEffect(() => {
    if (!lesson) return
    supabase
      .from('progress')
      .select('id')
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)
      .single()
      .then(({ data }) => {
        if (data) setAlreadyDone(true)
      })
  }, [lessonId])

  if (!lesson) return (
    <div className={styles.notFound}>
      <h2>Lesson not found 😕</h2>
      <Link to="/dashboard" className="btn btn-coral">Back to Dashboard</Link>
    </div>
  )

  const handleComplete = async () => {
    if (alreadyDone) {
      navigate(`/quiz/${lesson.quiz.id}?lessonId=${lessonId}`)
      return
    }

    setCompleting(true)
    try {
      // Save progress
      await supabase.from('progress').upsert({
        user_id: user.id,
        lesson_id: lessonId,
        completed_at: new Date().toISOString(),
      })

      // Add XP
      await supabase.rpc('add_xp', { user_id: user.id, amount: lesson.xp })
      await refreshProfile()

      setCompleted(true)
    } catch (e) {
      console.error(e)
    } finally {
      setCompleting(false)
    }
  }

  if (completed) {
    return (
      <div className={styles.celebratePage}>
        <div className={`card ${styles.celebrateCard}`}>
          <div className={styles.celebrateEmoji}>🎉</div>
          <h1>Awesome Job!</h1>
          <p>You completed <strong>{lesson.title}</strong></p>
          <div className={styles.xpEarned}>+{lesson.xp} XP Earned! ⭐</div>
          <div className={styles.celebrateBtns}>
            <Link to={`/quiz/${lesson.quiz.id}?lessonId=${lessonId}`} className="btn btn-coral">
              Take the Quiz! 🧠
            </Link>
            <Link to="/dashboard" className="btn btn-outline">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link to="/dashboard">Dashboard</Link>
          <span>›</span>
          <span>{lesson.title}</span>
        </div>

        {/* Lesson content */}
        <div className={`card ${styles.lessonCard}`}>
          <div className={styles.lessonMeta}>
            <span className={styles.xpBadge}>+{lesson.xp} XP</span>
            {alreadyDone && <span className={styles.doneBadge}>✅ Completed</span>}
          </div>
          <SimpleMarkdown content={lesson.content} />
        </div>

        {/* Code Editor */}
        <h3 className={styles.editorTitle}>🧪 Try It Yourself!</h3>
        <CodeEditor starterCode={lesson.starterCode} lessonId={lessonId} />

        {/* Complete button */}
        <div className={styles.completeRow}>
          <button
            onClick={handleComplete}
            disabled={completing}
            className={`btn btn-coral ${styles.completeBtn}`}
          >
            {completing ? '⏳ Saving...' : alreadyDone ? '📝 Retake Quiz →' : '✅ Mark Complete & Take Quiz →'}
          </button>
          <Link to="/dashboard" className={`btn btn-outline`}>Save & Exit</Link>
        </div>
      </div>
    </div>
  )
}
