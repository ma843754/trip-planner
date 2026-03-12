import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="home">
      <div className="home-hero">
        <span className="home-icon">✈️</span>
        <h1 className="home-title">Trip Planner</h1>
        <p className="home-tagline">Your adventures, beautifully organized</p>
        <div className="home-actions">
          <Link to="/signup" className="btn btn-lg">Get Started</Link>
          <Link to="/login" className="btn btn-outline btn-lg">Sign In</Link>
        </div>
      </div>

      <div className="home-features">
        <div className="home-feature">
          <span className="home-feature-icon">🗓️</span>
          <h3 className="home-feature-title">Itinerary</h3>
          <p className="home-feature-desc">Plan day-by-day activities sorted by date</p>
        </div>
        <div className="home-feature">
          <span className="home-feature-icon">💰</span>
          <h3 className="home-feature-title">Budget</h3>
          <p className="home-feature-desc">Track expenses and see what's left</p>
        </div>
        <div className="home-feature">
          <span className="home-feature-icon">⭐</span>
          <h3 className="home-feature-title">Reviews</h3>
          <p className="home-feature-desc">Rate activities and leave notes for later</p>
        </div>
      </div>
    </div>
  )
}
