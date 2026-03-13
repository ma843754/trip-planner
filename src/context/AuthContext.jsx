import { createContext, useContext, useState } from 'react'

const USERS_KEY   = 'trip-planner-users'
const SESSION_KEY = 'trip-planner-session'

function loadUsers() {
  try {
    const stored = localStorage.getItem(USERS_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

function loadSession() {
  try {
    const stored = localStorage.getItem(SESSION_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession)

  function signup(email, password) {
    const users = loadUsers()
    if (users[email]) throw new Error('An account with this email already exists.')
    users[email] = password
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    const session = { email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
  }

  function login(email, password) {
    const users = loadUsers()
    if (users[email] !== password) throw new Error('Invalid email or password.')
    const session = { email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading: false, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
