import { Stack, Button, Card, ProgressBar } from "react-bootstrap"
import { currencyFormatter } from "../utils"
export default function BudgetCard({ name, amount, max, grey, hideButtons, onAddExpenseClick }) {
    const classNames = []
    if (amount > max) {
        classNames.push("bg-danger", "bg-opacity-10")
    } else if (grey) {
        classNames.push("bg-light")
    }

    return (
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline">{currencyFormatter.format(amount)}
                        {max && <span className="text-muted fs-6 ms-1">/{currencyFormatter.format(max)}</span>}</div>
                </Card.Title>
                {max && <ProgressBar className="rounded-pill" variant={getProgressBarVariant(amount, max)}
                    min={0}
                    max={max}
                    now={amount}></ProgressBar>}
                {!hideButtons && <Stack direction="horizontal" gap="2" className="mt-4">
                    <Button variant="outline-primary ms-auto" className="ms-auto" onClick={onAddExpenseClick}>Add Expenses</Button>
                    <Button variant="outline-secondary">View Expenses</Button>
                </Stack>}
            </Card.Body>
        </Card>
    )
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if (ratio < 0.5) return "primary"
    if (ratio < 0.75) return "warning"
    return "danger"
}
