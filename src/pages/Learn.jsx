import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { LESSONS } from '../data/lessons'
import CodeEditor from '../components/CodeEditor'
import styles from './Learn.module.css'

// Make qa() available globally for onclick handlers in lesson HTML
window.qa = function (btn, correct) {
  const opts = btn.closest('.quiz-opts').querySelectorAll('.qopt')
  opts.forEach(o => o.classList.remove('correct', 'wrong'))
  btn.classList.add(correct ? 'correct' : 'wrong')
  if (!correct) {
    opts.forEach(o => {
      if (o.getAttribute('onclick')?.includes('true')) o.classList.add('correct')
    })
  }
}

const SECTIONS = [
  { label: 'Zero to Python', indices: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
  { label: 'Control Flow', indices: [9, 10, 11, 17] },
  { label: 'Data Structures', indices: [12, 13, 14] },
  { label: 'Functions & Modules', indices: [15, 16] },
  { label: 'Python in the World', indices: [18] },
]

export default function Learn() {
  const { user, refreshProfile } = useAuth()
  const [current, setCurrent] = useState(0)
  const [completed, setCompleted] = useState(new Set())

  useEffect(() => {
    supabase.from('progress').select('lesson_id').eq('user_id', user.id)
      .then(({ data }) => {
        if (data) setCompleted(new Set(data.map(r => r.lesson_id)))
      })
  }, [])

  const lesson = LESSONS[current]
  const isDone = completed.has(lesson.id)

  async function markComplete() {
    if (isDone) return
    await supabase.from('progress').upsert({
      user_id: user.id,
      lesson_id: lesson.id,
      completed_at: new Date().toISOString(),
    })
    await supabase.rpc('add_xp', { user_id: user.id, amount: 15 })
    await refreshProfile()
    setCompleted(prev => new Set([...prev, lesson.id]))
  }

  function goLesson(idx) {
    setCurrent(idx)
    window.scrollTo(0, 0)
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        {SECTIONS.map(sec => (
          <div key={sec.label} className={styles.sideSection}>
            <div className={styles.sideLabel}>{sec.label}</div>
            {sec.indices.map(idx => {
              const l = LESSONS[idx]
              return (
                <div
                  key={idx}
                  onClick={() => goLesson(idx)}
                  className={`${styles.sideItem} ${current === idx ? styles.sideActive : ''}`}
                >
                  <span className={styles.sideCheck}>{completed.has(l.id) ? '✓' : ''}</span>
                  {l.title}
                </div>
              )
            })}
          </div>
        ))}
      </aside>

      <div className={styles.content}>
        <div className={styles.lessonCard}>
          <div
            className={styles.lessonHtml}
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />

          <div className={styles.editorSection}>
            <h3 className={styles.editorTitle}>Try it yourself</h3>
            <CodeEditor starterCode={lesson.starter} lessonId={lesson.id} solution={lesson.solution} />
          </div>

          <div className={styles.navRow}>
            {current > 0 && (
              <button onClick={() => goLesson(current - 1)} className={styles.btnPrev}>
                ← Previous
              </button>
            )}
            <div style={{ flex: 1 }} />
            <div className={styles.navRight}>
              {!isDone && (
                <button onClick={markComplete} className={styles.btnDone}>
                  Mark Complete
                </button>
              )}
              {isDone && <span className={styles.doneChip}>✓ Completed</span>}
              {current < LESSONS.length - 1 && (
                <button onClick={() => { markComplete(); goLesson(current + 1) }} className={styles.btnNext}>
                  Next Lesson →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
