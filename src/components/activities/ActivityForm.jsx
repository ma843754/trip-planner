import { useEffect, useState } from 'react'

export default function ActivityForm({ onAdd, onUpdate, editingActivity, onCancelEdit }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingActivity) {
      setTitle(editingActivity.title)
      setDate(editingActivity.date)
      setLocation(editingActivity.location ?? '')
      setNotes(editingActivity.notes ?? '')
    } else {
      setTitle('')
      setDate('')
      setLocation('')
      setNotes('')
    }
    setError('')
  }, [editingActivity])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !date) {
      setError('Please enter a title and date.')
      return
    }

    try {
      if (editingActivity) {
        await onUpdate(editingActivity.id, {
          title: title.trim(),
          date,
          location: location.trim(),
          notes: notes.trim(),
        })
        onCancelEdit()
      } else {
        await onAdd(title.trim(), date, location.trim(), notes.trim())
      }
      setTitle('')
      setDate('')
      setLocation('')
      setNotes('')
      setError('')
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <h2 className="form-title">{editingActivity ? 'Edit Activity' : 'Add Activity'}</h2>
      {error && <p className="form-error">{error}</p>}
      <div className="form-row">
        <input
          className="form-input"
          type="text"
          placeholder="Activity title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="form-input form-date-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-full">
        <input
          className="form-input"
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="form-full">
        <textarea
          className="form-input form-textarea"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>
      <div className="form-row form-actions">
        <button className="btn" type="submit">
          {editingActivity ? 'Save' : 'Add Activity'}
        </button>
        {editingActivity && (
          <button className="btn btn-outline" type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
