import React, { useContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage"

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
  return useContext(BudgetsContext)
}



export const BudgetsProvider = ({ children }) => {

  const [budgets, setBudgets] = useLocalStorage("Budgets", [])
  const [expenses, setExpenses] = useLocalStorage("Expenses", [])

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId)
  }

  function addExpenses({ description, amount, budgetId }) {
    setExpenses(prevExpenses => {
      return [...prevExpenses, { id: uuidv4(), description, amount, budgetId }]
    })
  }
  
  function addBudget({ name, max }) {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets
      }
      return [...prevBudgets, { id: uuidv4(), name, max }]
    })
  }
  function deleteExpense({ id }) {
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    })
  }
  function deleteBudget({ id }) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(budget => budget.id !== id)
    })
  }

  return <BudgetsContext.Provider value={{
    budgets,
    expenses,
    getBudgetExpenses,
    addExpenses,
    addBudget,
    deleteExpense,
    deleteBudget
  }}>
    {children}
  </BudgetsContext.Provider>
}
