import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import styles from './Paywall.module.css'

export default function Paywall() {
  const { profile, signOut } = useAuth()
  const [checking, setChecking] = useState(false)
  const navigate = useNavigate()

  // Auto-poll every 8 seconds — as soon as admin approves, user gets in
  useEffect(() => {
    const poll = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('profiles')
        .select('is_paid')
        .eq('id', user.id)
        .single()
      if (data?.is_paid) navigate('/dashboard')
    }

    poll() // check immediately on mount too
    const interval = setInterval(poll, 8000)
    return () => clearInterval(interval)
  }, [])

  const handleManualCheck = async () => {
    setChecking(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('is_paid')
        .eq('id', user.id)
        .single()
      if (data?.is_paid) navigate('/dashboard')
    }
    setChecking(false)
  }

  return (
    <div className={styles.page}>
      <div className={`card ${styles.card}`}>
        <div className={styles.emoji}>⏳</div>
        <h1>Almost There</h1>
        <p className={styles.sub}>
          Hey <strong>{profile?.name?.split(' ')[0] ?? 'there'}</strong>, your account is ready.
          Complete the payment below to unlock access.
        </p>

        <div className={styles.steps}>
          <div className={`${styles.step} ${styles.done}`}>
            <span className={styles.stepIcon}>✓</span>
            <div>
              <div className={styles.stepTitle}>Account Created</div>
              <div className={styles.stepDesc}>You're registered and logged in</div>
            </div>
          </div>
          <div className={styles.connector} />
          <div className={styles.step}>
            <span className={styles.stepIcon}>2</span>
            <div>
              <div className={styles.stepTitle}>Pay ₹599 via UPI</div>
              <div className={styles.stepDesc}>Send to the details below</div>
            </div>
          </div>
          <div className={styles.connector} />
          <div className={styles.step}>
            <span className={styles.stepIcon}>3</span>
            <div>
              <div className={styles.stepTitle}>Access Unlocked</div>
              <div className={styles.stepDesc}>This page updates automatically once approved</div>
            </div>
          </div>
        </div>

        <div className={styles.paymentBox}>
          <h3>Payment Details</h3>
          <div className={styles.paymentRow}>
            <span>UPI ID</span>
            <strong>9949995592@fam</strong>
          </div>
          <div className={styles.paymentRow}>
            <span>Name</span>
            <strong>Your Name</strong>
          </div>
          <div className={styles.paymentRow}>
            <span>Amount</span>
            <strong className={styles.amount}>₹599</strong>
          </div>
        </div>

        <div className={styles.contactBox}>
          <p>
            After paying, WhatsApp your screenshot to <strong>+91 99499 95592</strong> with your email:
          </p>
          <div className={styles.emailChip}>{profile?.email ?? 'your email'}</div>
          <p className={styles.timeNote}>Activated within 2–4 hours. This page checks automatically.</p>
        </div>

        <div className={styles.pollStatus}>
          <span className={styles.pollDot} /> Checking for access automatically...
          <button onClick={handleManualCheck} disabled={checking} className={styles.checkNowBtn}>
            {checking ? 'Checking...' : 'Check now'}
          </button>
        </div>

        <button onClick={signOut} className={`btn btn-outline ${styles.signoutBtn}`}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
