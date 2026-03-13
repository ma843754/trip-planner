import { useEffect, useState } from 'react'

const STORAGE_KEY = 'trip-planner-activities'

function loadActivities() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function useActivities() {
  const [activities, setActivities] = useState(loadActivities)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities))
  }, [activities])

  function addActivity(title, date, location = '', notes = '') {
    setActivities((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title,
        date,
        location,
        notes,
        completed: false,
        comments: [],
        rating: null,
      },
    ])
  }

  function updateActivity(id, changes) {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...changes } : a))
    )
  }

  function deleteActivity(id) {
    setActivities((prev) => prev.filter((a) => a.id !== id))
  }

  function toggleComplete(id) {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    )
  }

  function addComment(activityId, text) {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === activityId
          ? {
              ...a,
              comments: [
                ...a.comments,
                { id: crypto.randomUUID(), text, createdAt: new Date().toISOString() },
              ],
            }
          : a
      )
    )
  }

  function setRating(activityId, value) {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === activityId
          ? { ...a, rating: a.rating === value ? null : value }
          : a
      )
    )
  }

  return { activities, loadingActivities: false, addActivity, updateActivity, deleteActivity, toggleComplete, addComment, setRating }
}
