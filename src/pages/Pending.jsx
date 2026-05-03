import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import styles from './Pending.module.css'

export default function Pending() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()

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
    poll()
    const id = setInterval(poll, 6000)
    return () => clearInterval(id)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>⏳</div>
        <h1>Waiting for Approval</h1>
        <p className={styles.sub}>
          Hi <strong>{profile?.name?.split(' ')[0] ?? 'there'}</strong>, your account has been created.
          We'll activate it once we confirm your payment.
        </p>

        <div className={styles.infoBox}>
          <div className={styles.infoRow}>
            <span>UPI ID</span>
            <strong>yourname@upi</strong>
          </div>
          <div className={styles.infoRow}>
            <span>Amount</span>
            <strong className={styles.amount}>₹599</strong>
          </div>
        </div>

        <p className={styles.instruction}>
          After paying, WhatsApp your screenshot to <strong>+91 XXXXX XXXXX</strong> along with your registered email:
        </p>
        <div className={styles.emailChip}>{profile?.email ?? ''}</div>

        <div className={styles.polling}>
          <span className={styles.dot} />
          This page checks automatically every few seconds
        </div>

        <button onClick={handleSignOut} className={styles.signoutBtn}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
