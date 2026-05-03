import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <nav className={styles.nav}>
      <Link
        to={user ? (profile?.is_admin ? '/admin' : profile?.is_paid ? '/dashboard' : '/pending') : '/'}
        className={styles.logo}
      >
        PyKids
      </Link>

      {user && profile?.is_paid && !profile?.is_admin && (
        <div className={styles.tabs}>
          <Link to="/dashboard" className={`${styles.tab} ${isActive('/dashboard') ? styles.tabActive : ''}`}>
            Home
          </Link>
          <Link to="/learn" className={`${styles.tab} ${isActive('/learn') ? styles.tabActive : ''}`}>
            Learn
          </Link>
          <Link to="/arena" className={`${styles.tab} ${isActive('/arena') ? styles.tabActive : ''}`}>
            Arena
          </Link>
        </div>
      )}

      <div className={styles.right}>
        {user ? (
          <>
            {profile?.is_paid && !profile?.is_admin && (
              <span className={styles.xp}>⭐ {profile?.xp ?? 0} XP</span>
            )}
            {profile?.is_admin && (
              <Link to="/admin" className={styles.adminBadge}>Admin Panel</Link>
            )}
            <span className={styles.name}>{profile?.name?.split(' ')[0] ?? 'Coder'}</span>
            <button onClick={handleSignOut} className={styles.logoutBtn}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={`btn btn-outline ${styles.outlineLight}`}>Log In</Link>
            <Link to="/login?signup=true" className="btn btn-coral">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}
