import { categoriesNames } from "../enums/categories-enum.js"
import connect from "../database/dbConnect.js"
import Transaction from "../models/transactionsModel.js"
import "dotenv/config"
const types = ["income", "expense"]

const transactions = []

connect()

const seedDb = async () => {
  for (let i = 0; i < 500; i++) {
    const name = "Seed-transaction"
    let amount = 0
    const category =
      categoriesNames[Math.floor(Math.random() * categoriesNames.length)]
    const type = types[Math.floor(Math.random() * types.length)]

    if (type === "income") {
      amount = Math.floor(Math.random() * 100) + 1000
    } else {
      amount = Math.floor(Math.random() * 100) + 100
    }

    transactions.push({
      user_id: process.env.DEV_ID,
      name,
      amount,
      category,
      type,
      dateAndTime: new Date(
        new Date().setDate(
          new Date().getDate() - Math.floor(Math.random() * 50) + 1
        )
      ),
    })
  }

  try {
    await Transaction.deleteMany({})
    console.log("Old Transactions Deleted")

    await Transaction.insertMany(transactions)
    console.log("Database successfully seeded with transactions")
  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}

seedDb()
