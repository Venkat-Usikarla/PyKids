import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Learn from './pages/Learn'
import Arena from './pages/Arena'
import Quiz from './pages/Quiz'
import Pending from './pages/Pending'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          <Route path="/pending" element={
            <ProtectedRoute><Pending /></ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute><Admin /></ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute requirePaid><Dashboard /></ProtectedRoute>
          } />
          <Route path="/learn" element={
            <ProtectedRoute requirePaid><Learn /></ProtectedRoute>
          } />
          <Route path="/arena" element={
            <ProtectedRoute requirePaid><Arena /></ProtectedRoute>
          } />
          <Route path="/quiz/:quizId" element={
            <ProtectedRoute requirePaid><Quiz /></ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
