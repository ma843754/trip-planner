import { useState } from 'react'

const CATEGORIES = ['Food', 'Travel', 'Activities', 'Lodging', 'Other']

export default function BudgetForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Other')
  const [date, setDate] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = title.trim()
    const parsed = parseFloat(amount)
    if (!trimmed || isNaN(parsed) || parsed <= 0 || !date) return
    onAdd(trimmed, parsed, category, date)
    setTitle('')
    setAmount('')
    setCategory('Other')
    setDate('')
  }

  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <p className="form-title">Add Expense</p>
      <div className="form-row">
        <input
          className="form-input"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="form-input budget-amount-input"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Amount *"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="form-row form-full">
        <select
          className="form-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          className="form-input form-date-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="btn" type="submit">Add</button>
      </div>
    </form>
  )
}
