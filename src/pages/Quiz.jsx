import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { curriculum } from '../data/curriculum'
import styles from './Quiz.module.css'

function findQuiz(quizId) {
  for (const module of curriculum) {
    for (const lesson of module.lessons) {
      if (lesson.quiz?.id === quizId) return { quiz: lesson.quiz, lesson }
    }
  }
  return null
}

const QUIZ_XP = 20

export default function Quiz() {
  const { quizId } = useParams()
  const [searchParams] = useSearchParams()
  const lessonId = searchParams.get('lessonId')
  const { user, refreshProfile } = useAuth()

  const found = findQuiz(quizId)
  const quiz = found?.quiz
  const lesson = found?.lesson

  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [xpAwarded, setXpAwarded] = useState(false)

  if (!quiz) return (
    <div className={styles.notFound}>
      <h2>Quiz not found 😕</h2>
      <Link to="/dashboard" className="btn btn-coral">Dashboard</Link>
    </div>
  )

  const handleSelect = (qIdx, optIdx) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }))
  }

  const handleSubmit = async () => {
    if (Object.keys(answers).length < quiz.questions.length) {
      alert('Please answer all questions first! 😊')
      return
    }

    let correct = 0
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++
    })
    setScore(correct)
    setSubmitted(true)

    // Award XP if perfect or first time
    const allCorrect = correct === quiz.questions.length
    if (allCorrect && !xpAwarded) {
      try {
        await supabase.rpc('add_xp', { user_id: user.id, amount: QUIZ_XP })
        await supabase.from('quiz_results').upsert({
          user_id: user.id,
          quiz_id: quizId,
          score: correct,
          total: quiz.questions.length,
          completed_at: new Date().toISOString(),
        })
        await refreshProfile()
        setXpAwarded(true)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleRetry = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    setXpAwarded(false)
  }

  const perfect = submitted && score === quiz.questions.length

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link to="/dashboard">Dashboard</Link>
            {lessonId && <><span>›</span><Link to={`/lesson/${lessonId}`}>{lesson?.title}</Link></>}
            <span>›</span><span>Quiz</span>
          </div>
          <h1>🧠 Quick Quiz!</h1>
          <p>{quiz.questions.length} questions · {QUIZ_XP} XP for perfect score</p>
        </div>

        {/* Result banner */}
        {submitted && (
          <div className={`${styles.resultBanner} ${perfect ? styles.perfect : styles.notPerfect}`}>
            <span className={styles.resultEmoji}>{perfect ? '🎉' : '😊'}</span>
            <div>
              <div className={styles.resultScore}>{score}/{quiz.questions.length} Correct!</div>
              <div className={styles.resultMsg}>
                {perfect ? `Amazing! You got them all! +${QUIZ_XP} XP earned! ⭐` : 'Good try! Check the correct answers below and try again!'}
              </div>
            </div>
          </div>
        )}

        {/* Questions */}
        <div className={styles.questions}>
          {quiz.questions.map((q, qi) => {
            const selected = answers[qi]
            const correct = q.answer
            const isCorrect = submitted && selected === correct

            return (
              <div key={qi} className={`card ${styles.questionCard}`}>
                <div className={styles.qNum}>Question {qi + 1}</div>
                <div className={styles.qText}>{q.q}</div>
                <div className={styles.options}>
                  {q.options.map((opt, oi) => {
                    let state = ''
                    if (submitted) {
                      if (oi === correct) state = styles.optCorrect
                      else if (oi === selected && selected !== correct) state = styles.optWrong
                    } else if (selected === oi) {
                      state = styles.optSelected
                    }

                    return (
                      <button
                        key={oi}
                        onClick={() => handleSelect(qi, oi)}
                        className={`${styles.option} ${state}`}
                        disabled={submitted}
                      >
                        <span className={styles.optLetter}>{String.fromCharCode(65 + oi)}</span>
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {!submitted ? (
            <button onClick={handleSubmit} className="btn btn-coral" style={{ fontSize: '1rem', padding: '16px 32px' }}>
              Submit Answers ✅
            </button>
          ) : (
            <>
              {!perfect && (
                <button onClick={handleRetry} className="btn btn-yellow">
                  Try Again 🔄
                </button>
              )}
              <Link to="/dashboard" className="btn btn-teal">
                Back to Dashboard 🏠
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
