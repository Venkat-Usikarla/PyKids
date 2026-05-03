import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import styles from './Admin.module.css'

export default function Admin() {
  const { profile, loading } = useAuth()
  const [users, setUsers] = useState([])
  const [fetching, setFetching] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // all | pending | approved

  useEffect(() => {
    if (profile?.is_admin) fetchUsers()
  }, [profile])

  async function fetchUsers() {
    setFetching(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, email, is_paid, is_admin, created_at, xp')
      .order('created_at', { ascending: false })

    if (!error) setUsers(data ?? [])
    setFetching(false)
  }

  async function togglePaid(userId, currentStatus) {
    const { error } = await supabase
      .from('profiles')
      .update({ is_paid: !currentStatus })
      .eq('id', userId)

    if (!error) {
      setUsers(prev => prev.map(u =>
        u.id === userId ? { ...u, is_paid: !currentStatus } : u
      ))
    }
  }

  if (loading) return <div className={styles.center}>🐍 Loading...</div>
  if (!profile?.is_admin) return <Navigate to="/dashboard" replace />

  const filtered = users.filter(u => {
    const matchSearch = u.name?.toLowerCase().includes(search.toLowerCase()) ||
                        u.email?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' ? true
                      : filter === 'pending' ? !u.is_paid
                      : u.is_paid
    return matchSearch && matchFilter && !u.is_admin
  })

  const pendingCount = users.filter(u => !u.is_paid && !u.is_admin).length
  const approvedCount = users.filter(u => u.is_paid && !u.is_admin).length

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1>🛠️ Admin Panel</h1>
            <p>Manage student access</p>
          </div>
          <button onClick={fetchUsers} className={`btn btn-outline ${styles.refreshBtn}`}>
            🔄 Refresh
          </button>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={`${styles.stat} ${styles.statTotal}`}>
            <div className={styles.statNum}>{users.filter(u => !u.is_admin).length}</div>
            <div className={styles.statLabel}>Total Students</div>
          </div>
          <div className={`${styles.stat} ${styles.statPending}`}>
            <div className={styles.statNum}>{pendingCount}</div>
            <div className={styles.statLabel}>⏳ Pending</div>
          </div>
          <div className={`${styles.stat} ${styles.statApproved}`}>
            <div className={styles.statNum}>{approvedCount}</div>
            <div className={styles.statLabel}>✅ Approved</div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filterRow}>
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.tabs}>
            {['all', 'pending', 'approved'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`${styles.tab} ${filter === f ? styles.activeTab : ''}`}
              >
                {f === 'all' ? 'All' : f === 'pending' ? '⏳ Pending' : '✅ Approved'}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {fetching ? (
          <div className={styles.center}>Loading students...</div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyEmoji}>🎉</div>
            <p>{search ? 'No students match your search.' : filter === 'pending' ? 'No pending students!' : 'No approved students yet.'}</p>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>XP</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(user => (
                  <tr key={user.id} className={user.is_paid ? styles.rowApproved : ''}>
                    <td>
                      <div className={styles.nameCell}>
                        <div className={styles.avatar}>
                          {(user.name?.[0] ?? '?').toUpperCase()}
                        </div>
                        {user.name ?? '—'}
                      </div>
                    </td>
                    <td className={styles.emailCell}>{user.email ?? '—'}</td>
                    <td className={styles.dateCell}>
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                        : '—'}
                    </td>
                    <td>
                      <span className={styles.xpBadge}>⭐ {user.xp ?? 0}</span>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${user.is_paid ? styles.paid : styles.pending}`}>
                        {user.is_paid ? '✅ Approved' : '⏳ Pending'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => togglePaid(user.id, user.is_paid)}
                        className={`btn ${user.is_paid ? styles.revokeBtn : styles.approveBtn}`}
                      >
                        {user.is_paid ? '❌ Revoke' : '✅ Approve'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
