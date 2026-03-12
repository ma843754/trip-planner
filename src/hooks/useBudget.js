import { useEffect, useState } from 'react'

const EXPENSES_KEY = 'trip-planner-expenses'
const BUDGET_KEY = 'trip-planner-trip-budget'

function loadExpenses() {
  try {
    const stored = localStorage.getItem(EXPENSES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function loadTripBudget() {
  try {
    const stored = localStorage.getItem(BUDGET_KEY)
    return stored !== null ? parseFloat(stored) : 0
  } catch {
    return 0
  }
}

export function useBudget() {
  const [expenses, setExpenses] = useState(loadExpenses)
  const [tripBudget, setTripBudget] = useState(loadTripBudget)

  useEffect(() => {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    localStorage.setItem(BUDGET_KEY, String(tripBudget))
  }, [tripBudget])

  function addExpense(title, amount, category, date) {
    setExpenses((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title,
        amount: parseFloat(amount),
        category,
        date,
      },
    ])
  }

  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }

  function updateTripBudget(value) {
    setTripBudget(parseFloat(value) || 0)
  }

  return { expenses, tripBudget, addExpense, deleteExpense, updateTripBudget }
}
