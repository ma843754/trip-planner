const CATEGORY_COLORS = {
  Food:       { bg: '#c6f6d5', text: '#276749' },
  Travel:     { bg: '#bee3f8', text: '#2a69ac' },
  Activities: { bg: '#feebc8', text: '#c05621' },
  Lodging:    { bg: '#e9d8fd', text: '#6b46c1' },
  Other:      { bg: '#e2e8f0', text: '#4a5568' },
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BudgetList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p className="list-empty">No expenses yet.</p>
  }

  const sorted = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date))
  const colors = (cat) => CATEGORY_COLORS[cat] ?? CATEGORY_COLORS.Other

  return (
    <ul className="expense-list">
      {sorted.map((expense) => (
        <li key={expense.id} className="expense-item">
          <div className="expense-item-left">
            <span
              className="expense-category-badge"
              style={{ backgroundColor: colors(expense.category).bg, color: colors(expense.category).text }}
            >
              {expense.category}
            </span>
            <div className="expense-info">
              <span className="expense-title">{expense.title}</span>
              <span className="expense-date">{formatDate(expense.date)}</span>
            </div>
          </div>
          <div className="expense-item-right">
            <span className="expense-amount">${expense.amount.toFixed(2)}</span>
            <button
              className="btn-icon btn-icon--danger"
              onClick={() => onDelete(expense.id)}
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
