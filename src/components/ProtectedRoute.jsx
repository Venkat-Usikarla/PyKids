import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requirePaid = false }) {
  const { user, isPaid, isDemo, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', fontFamily: 'Nunito, sans-serif',
        fontSize: '1rem', color: '#6b7280',
      }}>
        Loading...
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  // Demo users get access to paid routes (content gating handled inside pages)
  if (requirePaid && !isPaid && !isDemo) return <Navigate to="/pending" replace />

  return children
}
