import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const initialized           = useRef(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        fetchProfile(session.user.id).then(() => {
          initialized.current = true
          setLoading(false)
        })
      } else {
        initialized.current = true
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!initialized.current) return
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else setProfile(null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    const { data } = await supabase
      .from('profiles').select('*').eq('id', userId).single()
    if (data) setProfile(data)
    return data
  }

  async function signUp(email, password, name) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    await supabase.from('profiles').insert({
      id: data.user.id,
      name,
      email: data.user.email,
      is_paid: false,
      is_admin: false,
      is_demo: false,
      xp: 0,
      avatar: Math.floor(Math.random() * 12),
    })
    await fetchProfile(data.user.id)
    return data
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    await fetchProfile(data.user.id)
    return data
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  async function refreshProfile() {
    if (user) await fetchProfile(user.id)
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      signUp,
      signIn,
      signOut,
      refreshProfile,
      isPaid:  profile?.is_paid  ?? false,
      isAdmin: profile?.is_admin ?? false,
      isDemo:  profile?.is_demo  ?? false,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
