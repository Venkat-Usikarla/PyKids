import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Landing.module.css'

const features = [
  { icon: '▶', title: 'Run Code in Your Browser', desc: 'Write real Python and run it instantly — no downloads, no setup.' },
  { icon: '◎', title: 'Structured Curriculum', desc: 'Go from variables to functions with clear, hands-on lessons.' },
  { icon: '⚔', title: 'Code Arena', desc: '55 challenges across easy, medium, and hard to sharpen your skills.' },
  { icon: '★', title: 'Track Your Progress', desc: 'Earn XP as you complete lessons and solve problems.' },
]

const modules = [
  { title: 'Hello Python', lessons: 2 },
  { title: 'Numbers & Math', lessons: 1 },
  { title: 'If & Else', lessons: 1 },
  { title: 'Loops', lessons: 1 },
  { title: 'Functions', lessons: 1 },
  { title: 'Mini Projects', lessons: 3, locked: true },
]

export default function Landing() {
  const { user } = useAuth()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Learn Python.<br />
            <span className={styles.titleAccent}>Actually build things.</span>
          </h1>
          <p className={styles.subtitle}>
            Write real code, solve challenges, and build a strong Python foundation —
            all without installing anything.
          </p>
          <div className={styles.heroBtns}>
            {user ? (
              <Link to="/dashboard" className={`btn btn-coral ${styles.ctaBtn}`}>
                Continue Learning
              </Link>
            ) : (
              <>
                <Link to="/login?signup=true" className={`btn btn-coral ${styles.ctaBtn}`}>
                  Get Started
                </Link>
                <Link to="/login" className={`btn btn-outline ${styles.ctaBtn}`}>
                  Log In
                </Link>
              </>
            )}
          </div>

        </div>
        <div className={styles.heroArt}>
          <div className={styles.codeCard}>
            <div className={styles.codeDots}>
              <span /><span /><span />
            </div>
            <pre>{`name = "Priya"
age = 12

print("Hello, " + name)
print("Age:", age)

for i in range(1, 6):
    print("*" * i)`}</pre>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Everything you need to learn Python</h2>
        <div className={styles.featuresGrid}>
          {features.map(f => (
            <div key={f.title} className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.curriculumSection}`}>
        <h2 className={styles.sectionTitle}>Curriculum</h2>
        <div className={styles.moduleGrid}>
          {modules.map((m, i) => (
            <div key={m.title} className={`${styles.moduleCard} ${m.locked ? styles.locked : ''}`}>
              <span className={styles.moduleNum}>Module {i + 1}</span>
              <h3>{m.title}</h3>
              <span className={styles.lessonCount}>{m.lessons} lessons</span>
              {m.locked && <span className={styles.lockBadge}>Coming Soon</span>}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2>Start coding today</h2>
        <p>One payment. Full access. No expiry.</p>
        <Link to="/login?signup=true" className={`btn btn-yellow ${styles.ctaBtn}`}>
          Create Account
        </Link>
      </section>
    </div>
  )
}
