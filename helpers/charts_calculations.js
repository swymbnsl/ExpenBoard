export let expensesTransactions = []

export let incomeTransactions = []

export const transactionsChartCalculations = (transactions) => {
  if (transactions) {
    expensesTransactions = transactions.filter((t) => t.type === "expense")

    incomeTransactions = transactions.filter((t) => t.type === "income")
  }
}
