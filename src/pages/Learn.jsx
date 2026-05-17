import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { LESSONS } from '../data/lessons'
import CodeEditor from '../components/CodeEditor'
import styles from './Learn.module.css'

// Inline quiz handler
if (typeof window !== 'undefined') {
  window.qa = function(btn, correct) {
    const opts = btn.closest('.quiz-opts').querySelectorAll('.qopt')
    opts.forEach(o => { o.classList.remove('correct', 'wrong'); o.disabled = true })
    btn.classList.add(correct ? 'correct' : 'wrong')
    if (!correct) {
      opts.forEach(o => {
        if (o.getAttribute('onclick')?.includes('true')) o.classList.add('correct')
      })
    }
  }
}

const DEMO_LESSON_LIMIT = 5   // demo users can access lessons 0–4

const SECTIONS = [
  { label: 'Foundations',        indices: [0, 1, 2, 3, 4] },
  { label: 'Numbers & Strings',  indices: [5, 6, 7, 8] },
  { label: 'Control Flow',       indices: [9, 10, 11] },
  { label: 'Data Structures',    indices: [12, 13, 14] },
  { label: 'Functions & Beyond', indices: [15, 16, 17, 18] },
]

export default function Learn() {
  const { user, refreshProfile, isDemo } = useAuth()
  const [current,   setCurrent]   = useState(0)
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
    // Demo users blocked beyond limit
    if (isDemo && idx >= DEMO_LESSON_LIMIT) return
    setCurrent(idx)
    window.scrollTo(0, 0)
  }

  const isLocked = (idx) => isDemo && idx >= DEMO_LESSON_LIMIT

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        {SECTIONS.map(sec => (
          <div key={sec.label} className={styles.sideSection}>
            <div className={styles.sideLabel}>{sec.label}</div>
            {sec.indices.map(idx => {
              const l      = LESSONS[idx]
              const locked = isLocked(idx)
              return (
                <div
                  key={idx}
                  onClick={() => goLesson(idx)}
                  className={`
                    ${styles.sideItem}
                    ${current === idx ? styles.sideActive : ''}
                    ${locked ? styles.sideLocked : ''}
                  `}
                >
                  <span className={styles.sideCheck}>
                    {locked
                      ? <span className={styles.lockIcon}>🔒</span>
                      : completed.has(l.id) ? '✓' : ''}
                  </span>
                  <span className={locked ? styles.lockedText : ''}>{l.title}</span>
                </div>
              )
            })}
          </div>
        ))}

        {isDemo && (
          <div className={styles.demoBanner}>
            <div className={styles.demoBannerTitle}>Demo Access</div>
            <p>You have access to the first {DEMO_LESSON_LIMIT} lessons. Contact us to unlock the full course.</p>
          </div>
        )}
      </aside>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.lessonCard}>
          <div
            className={styles.lessonHtml}
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />

          <div className={styles.editorSection}>
            <h3 className={styles.editorTitle}>Try it yourself</h3>
            <CodeEditor starterCode={lesson.starter} lessonId={lesson.id} />
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
              {current < LESSONS.length - 1 && !isLocked(current + 1) && (
                <button
                  onClick={() => { markComplete(); goLesson(current + 1) }}
                  className={styles.btnNext}
                >
                  Next Lesson →
                </button>
              )}
              {current < LESSONS.length - 1 && isLocked(current + 1) && (
                <span className={styles.lockedNext}>🔒 Upgrade to continue</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
