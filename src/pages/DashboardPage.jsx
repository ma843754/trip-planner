import { useState } from 'react'
import { useActivities } from '../hooks/useActivities'
import { useBudget } from '../hooks/useBudget'
import Navbar from '../components/layout/Navbar'
import ActivityForm from '../components/activities/ActivityForm'
import ActivityList from '../components/activities/ActivityList'
import BudgetForm from '../components/budget/BudgetForm'
import BudgetList from '../components/budget/BudgetList'
import BudgetSummary from '../components/budget/BudgetSummary'

export default function DashboardPage() {
  const { activities, loadingActivities, addActivity, updateActivity, deleteActivity, toggleComplete, addComment, setRating } =
    useActivities()
  const { expenses, tripBudget, addExpense, deleteExpense, updateTripBudget } = useBudget()
  const [editingActivity, setEditingActivity] = useState(null)

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="dashboard">
      <Navbar />
      <main className="dashboard-main">
        <section className="dashboard-section">
          <h2 className="section-heading">🗓️ Trip Activities</h2>
          <ActivityForm
            onAdd={addActivity}
            onUpdate={updateActivity}
            editingActivity={editingActivity}
            onCancelEdit={() => setEditingActivity(null)}
          />
          <ActivityList
            activities={activities}
            loading={loadingActivities}
            onEdit={setEditingActivity}
            onDelete={deleteActivity}
            onToggleComplete={toggleComplete}
            onAddComment={addComment}
            onSetRating={setRating}
          />
        </section>

        <section className="dashboard-section">
          <h2 className="section-heading">💰 Budget Tracker</h2>
          <BudgetSummary
            tripBudget={tripBudget}
            totalSpent={totalSpent}
            onUpdateBudget={updateTripBudget}
          />
          <BudgetForm onAdd={addExpense} />
          <BudgetList expenses={expenses} onDelete={deleteExpense} />
        </section>
      </main>
    </div>
  )
}
