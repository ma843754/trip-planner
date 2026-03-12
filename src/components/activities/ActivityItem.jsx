import Rating from './Rating'
import CommentSection from './CommentSection'

function formatActivityDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export default function ActivityItem({ activity, onEdit, onDelete, onToggleComplete, onAddComment, onSetRating }) {
  return (
    <div className={`activity-card ${activity.completed ? 'activity-card--done' : ''}`}>
      <div className="activity-card-header">
        <div className="activity-card-left">
          <input
            type="checkbox"
            className="activity-checkbox"
            checked={activity.completed}
            onChange={() => onToggleComplete(activity.id)}
          />
          <div className="activity-info">
            <span className={`activity-title ${activity.completed ? 'activity-title--done' : ''}`}>
              {activity.title}
            </span>
            <div className="activity-meta">
              <span className="activity-date">🗓 {formatActivityDate(activity.date)}</span>
              {activity.location && (
                <span className="activity-location">📍 {activity.location}</span>
              )}
            </div>
            {activity.notes && (
              <span className="activity-notes">{activity.notes}</span>
            )}
          </div>
        </div>
        <div className="activity-card-actions">
          <button className="btn-icon" onClick={() => onEdit(activity)} title="Edit">
            ✏️
          </button>
          <button
            className="btn-icon btn-icon--danger"
            onClick={() => {
              if (window.confirm(`Delete "${activity.title}"?`)) onDelete(activity.id)
            }}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="activity-card-footer">
        <Rating
          value={activity.rating}
          onChange={(val) => onSetRating(activity.id, val)}
        />
        <CommentSection
          comments={activity.comments}
          onAdd={(text) => onAddComment(activity.id, text)}
        />
      </div>
    </div>
  )
}
