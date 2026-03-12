import { useState } from 'react'

export default function BudgetSummary({ tripBudget, totalSpent, onUpdateBudget }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('')

  const remaining = tripBudget - totalSpent
  const overBudget = remaining < 0
  const progress = tripBudget > 0 ? Math.min((totalSpent / tripBudget) * 100, 100) : 0

  function startEditing() {
    setValue(tripBudget > 0 ? String(tripBudget) : '')
    setEditing(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const parsed = parseFloat(value)
    if (!isNaN(parsed) && parsed >= 0) onUpdateBudget(parsed)
    setEditing(false)
  }

  return (
    <div className="budget-summary">
      <div className="budget-summary-row">

        <div className="budget-summary-stat">
          <span className="budget-summary-label">Trip Budget</span>
          {editing ? (
            <form className="budget-edit-form" onSubmit={handleSubmit}>
              <input
                className="form-input budget-edit-input"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
              />
              <button className="btn btn-sm" type="submit">Save</button>
              <button className="btn btn-outline btn-sm" type="button" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </form>
          ) : (
            <div className="budget-summary-value-row">
              <span className="budget-summary-value">
                {tripBudget > 0 ? `$${tripBudget.toFixed(2)}` : '—'}
              </span>
              <button className="btn-icon" onClick={startEditing} title="Set budget">✏️</button>
            </div>
          )}
        </div>

        <div className="budget-summary-stat">
          <span className="budget-summary-label">Total Spent</span>
          <span className="budget-summary-value budget-summary-spent">
            ${totalSpent.toFixed(2)}
          </span>
        </div>

        <div className="budget-summary-stat">
          <span className="budget-summary-label">Remaining</span>
          <span className={`budget-summary-value ${overBudget ? 'budget-over' : 'budget-under'}`}>
            {tripBudget > 0
              ? `${overBudget ? '-' : ''}$${Math.abs(remaining).toFixed(2)}`
              : '—'}
          </span>
        </div>

      </div>

      {tripBudget > 0 && (
        <div className="budget-progress-track">
          <div
            className={`budget-progress-bar ${overBudget ? 'budget-progress-bar--over' : ''}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}
