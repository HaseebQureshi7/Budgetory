import { useBudgets } from '../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'

export default function TotalBudgetCard() {
    const { expenses, budgets } = useBudgets()

    const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
    console.log(amount)
    const max = budgets.reduce((total, budget) => total + budget.max, 0)

    if (max === 0) return null
    return (
        <BudgetCard name={"TOTAL"} grey max={max} amount={amount} hideButtons/>
    )
}
