export default function ActivityCard({ activity, onEdit, onDelete, onToggleComplete }) {
  const date = activity.date?.toDate?.() ?? new Date(activity.date)
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className={`activity-card ${activity.completed ? 'activity-card--done' : ''}`}>
      <div className="activity-card-left">
        <input
          type="checkbox"
          className="activity-checkbox"
          checked={activity.completed}
          onChange={() => onToggleComplete(activity.id, activity.completed)}
        />
        <div className="activity-info">
          <span className={`activity-title ${activity.completed ? 'activity-title--done' : ''}`}>
            {activity.title}
          </span>
          <span className="activity-date">{formattedDate}</span>
        </div>
      </div>
      <div className="activity-card-actions">
        <button className="btn-icon" onClick={() => onEdit(activity)} title="Edit">
          ✏️
        </button>
        <button className="btn-icon btn-icon--danger" onClick={() => onDelete(activity.id)} title="Delete">
          🗑️
        </button>
      </div>
    </div>
  )
}
