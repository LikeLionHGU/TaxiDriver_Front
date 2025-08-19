import { Navigation } from "./navigation"
import { ReceiptForm } from "./receipt-form"

export function ExpenseTracker() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <ReceiptForm />
      </main>
    </div>
  )
}
