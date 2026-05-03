import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Login.module.css'

export default function Login() {
  const [searchParams] = useSearchParams()
  const [isSignup, setIsSignup] = useState(searchParams.get('signup') === 'true')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignup) {
        if (!name.trim()) { setError('Please enter your name!'); setLoading(false); return }
        await signUp(email, password, name)
        navigate('/dashboard')
      } else {
        await signIn(email, password)
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={`card ${styles.card}`}>
        <div className={styles.topEmoji}>{isSignup ? '🐣' : '👋'}</div>
        <h1>{isSignup ? 'Join PyKids!' : 'Welcome Back!'}</h1>
        <p className={styles.sub}>
          {isSignup ? 'Create your free account to start learning Python!' : 'Log in to continue your Python adventure!'}
        </p>

        {error && <div className={styles.error}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {isSignup && (
            <div className={styles.field}>
              <label>Your Name 😊</label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className={styles.field}>
            <label>Email Address 📧</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Password 🔐</label>
            <input
              type="password"
              placeholder={isSignup ? 'At least 6 characters' : 'Enter your password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn btn-coral ${styles.submitBtn}`}
          >
            {loading ? '⏳ Please wait...' : isSignup ? '🚀 Create Account' : '▶ Log In'}
          </button>
        </form>

        <div className={styles.toggle}>
          {isSignup ? (
            <span>Already have an account? <button onClick={() => setIsSignup(false)} className={styles.toggleBtn}>Log In</button></span>
          ) : (
            <span>New here? <button onClick={() => setIsSignup(true)} className={styles.toggleBtn}>Create Account</button></span>
          )}
        </div>

        <Link to="/" className={styles.back}>← Back to home</Link>
      </div>
    </div>
  )
}
