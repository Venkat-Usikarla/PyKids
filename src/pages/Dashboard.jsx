import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { LESSONS } from '../data/lessons'
import { totalProblems } from '../data/problems'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const { profile, user } = useAuth()
  const [completedLessons, setCompletedLessons] = useState([])
  const [solvedProblems, setSolvedProblems] = useState(0)

  useEffect(() => {
    supabase.from('progress').select('lesson_id').eq('user_id', user.id)
      .then(({ data }) => setCompletedLessons(data?.map(r => r.lesson_id) ?? []))
    supabase.from('arena_solves').select('problem_id', { count: 'exact' }).eq('user_id', user.id)
      .then(({ count }) => setSolvedProblems(count ?? 0))
  }, [])

  const lessonPct = Math.round((completedLessons.length / LESSONS.length) * 100)
  const arenaPct = Math.round((solvedProblems / totalProblems) * 100)
  const xpLevel = Math.floor((profile?.xp ?? 0) / 50) + 1

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1>Welcome back, {profile?.name?.split(' ')[0] ?? 'Coder'}</h1>
            <p>Pick up where you left off</p>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.stat} style={{ background: '#ffd54f' }}>
              <div className={styles.statVal}>⭐ {profile?.xp ?? 0}</div>
              <div className={styles.statLabel}>XP Points</div>
            </div>
            <div className={styles.stat} style={{ background: '#4fc3f7', color: 'white' }}>
              <div className={styles.statVal}>Lv {xpLevel}</div>
              <div className={styles.statLabel}>Level</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.cards}>
          {/* Learn card */}
          <div className={`card ${styles.bigCard}`}>
            <div className={styles.cardTop}>
              <div>
                <h2>Learn</h2>
                <p>{completedLessons.length} / {LESSONS.length} lessons completed</p>
              </div>
              <span className={styles.cardIcon}>📚</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${lessonPct}%`, background: '#1a237e' }} />
            </div>
            <Link to="/learn" className={`btn btn-coral ${styles.cardBtn}`}>
              {completedLessons.length === 0 ? 'Start Learning' : 'Continue Learning'} →
            </Link>
          </div>

          {/* Arena card */}
          <div className={`card ${styles.bigCard}`}>
            <div className={styles.cardTop}>
              <div>
                <h2>Arena</h2>
                <p>{solvedProblems} / {totalProblems} problems solved</p>
              </div>
              <span className={styles.cardIcon}>⚔️</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${arenaPct}%`, background: '#2e7d32' }} />
            </div>
            <Link to="/arena" className={`btn btn-teal ${styles.cardBtn}`}>
              Go to Arena →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
