import { isSameDay } from "date-fns"

let expensesTransactions = []
let incomeTransactions = []

export const transactionsChartCalculations = (transactions, date) => {
  expensesTransactions = []
  if (transactions) {
    let perDayTransactions = []
    let currentDate = date.from

    while (currentDate < date.to) {
      perDayTransactions.push({ date: currentDate, expenses: 0, income: 0 })
      currentDate = new Date(
        new Date(currentDate).setDate(new Date(currentDate).getDate() + 1)
      )
    }

    expensesTransactions = transactions.filter((t) => t.type === "expense")

    incomeTransactions = transactions.filter((t) => t.type === "income")

    expensesTransactions.forEach((i) => {
      for (let t of perDayTransactions) {
        if (isSameDay(t.date, i.dateAndTime)) {
          t.expenses += i.amount
        }
      }
    })
    incomeTransactions.forEach((i) => {
      for (let t of perDayTransactions) {
        if (isSameDay(t.date, i.dateAndTime)) {
          t.income += i.amount
        }
      }
    })

    let calculatedIncome = 0
    perDayTransactions.forEach((i) => {
      calculatedIncome += i.income
    })
    let calculatedExpenses = 0
    perDayTransactions.forEach((i) => {
      calculatedExpenses += i.expenses
    })

    return { perDayTransactions, calculatedIncome, calculatedExpenses }
  }
}

export const categoriesChartsCalculation = () => {
  let noOfTransactionsOfEachCategory = {}
  expensesTransactions.forEach((t) => {
    if (noOfTransactionsOfEachCategory[t.category]) {
      noOfTransactionsOfEachCategory[t.category] += 1
    } else noOfTransactionsOfEachCategory[t.category] = 1
  })

  return noOfTransactionsOfEachCategory
}
