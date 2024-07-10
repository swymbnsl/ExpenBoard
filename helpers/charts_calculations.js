import { isSameDay } from "date-fns"

let expensesTransactions = []
let incomeTransactions = []

export const transactionsChartCalculations = (transactions, date) => {
  if (transactions) {
    let eachDayTransactions = []
    let currentDate = date.from

    while (currentDate < date.to) {
      eachDayTransactions.push({ date: currentDate, expenses: 0, income: 0 })
      currentDate = new Date(
        new Date(currentDate).setDate(new Date(currentDate).getDate() + 1)
      )
    }

    expensesTransactions = transactions.filter((t) => t.type === "expense")

    incomeTransactions = transactions.filter((t) => t.type === "income")

    expensesTransactions.forEach((i) => {
      for (let t of eachDayTransactions) {
        if (isSameDay(t.date, i.dateAndTime)) {
          t.expenses += i.amount
        }
      }
    })
    incomeTransactions.forEach((i) => {
      for (let t of eachDayTransactions) {
        if (isSameDay(t.date, i.dateAndTime)) {
          t.income += i.amount
        }
      }
    })
    return eachDayTransactions
  } else return
}
