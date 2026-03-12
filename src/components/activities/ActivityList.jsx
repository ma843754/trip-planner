import ActivityItem from './ActivityItem'

export default function ActivityList({ activities, onEdit, onDelete, onToggleComplete, onAddComment, onSetRating, loading }) {
  if (loading) {
    return <p className="list-empty">Loading activities...</p>
  }

  if (activities.length === 0) {
    return <p className="list-empty">No activities yet. Add one above!</p>
  }

  const sorted = [...activities].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="activity-list">
      {sorted.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onAddComment={onAddComment}
          onSetRating={onSetRating}
        />
      ))}
    </div>
  )
}
