import "./styles.css";
import { useEffect, useState } from "react";
import { Stack, Button } from "react-bootstrap"
import { Container } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState()
  const [showAddExpenseModal, setShowAddExpenseModal] = useState()
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [orientation, setOrientation] = useState("vertical")
  const [styling, setStyling] = useState()
  const [visibility, setVisibility] = useState("d-flex")
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
    setVisibility("d-none")
  }
  useEffect(() => {
    if (window.matchMedia("(orientation: portrait)").matches) {
      changeOrientation("vertical", "m-auto")
    } else {
      changeOrientation("horizontal", "me-auto")
    }
  }, [])

  function changeOrientation(currentOrientation, styling) {
    setOrientation(currentOrientation)
    setStyling(styling)
  }

  const localStorageKey = JSON.stringify(localStorage.Budgets)
  
  useEffect(()=> {
    const localStorageKeyLength = localStorageKey.length

    if (localStorageKeyLength === 4) {
      setVisibility("d-flex")
    } else {
      setVisibility("d-none")
    }
  }, [])

  return (
    <>
      <Container className="my-4">
        <Stack direction={orientation} gap='2' className="mb-4">
          <Stack direction='vertical'>
            <h1 className={styling + " fw-bolder gradient"}>BUDGETORY</h1>
            <h6 className={styling + " fw-lighter mb-3"}>EXPENSE TRACKER</h6>
          </Stack>
          <Button className="btn btn-lg" variant="primary" onClick={() => (setShowAddBudgetModal(true), setVisibility("d-none"))}>+ Add Budget</Button>
          <Button className="btn btn-lg" variant="outline-primary" onClick={openAddExpenseModal}>+ Add Expenses</Button>
        </Stack>
        <div style={{ display: "grid", gridTemplateColumns: "repeat (auto-fill, minmax(300px, 1fr))", gap: "1rem", alignItems: "flex-start" }}>

          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)}
              />)
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpenseClick={() => setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
        </div>
        <div className={visibility + " addNew"}>
          <h1>No Items Added!</h1>
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)} />
      <ViewExpensesModal budgetId={viewExpenseModalBudgetId}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setViewExpenseModalBudgetId()} />
    </>
  );
}

export default App;
