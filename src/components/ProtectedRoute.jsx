import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requirePaid = false }) {
  const { user, isPaid, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', fontSize: '1.2rem', color: '#6b7280', fontFamily: 'Nunito, sans-serif'
      }}>
        Loading...
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  if (requirePaid && !isPaid) return <Navigate to="/pending" replace />

  return children
}
