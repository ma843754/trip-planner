import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">✈️ Trip Planner</span>
        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
      </div>
      <div className="navbar-right">
        <span className="navbar-email">{user?.email}</span>
        <button className="btn btn-outline" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
