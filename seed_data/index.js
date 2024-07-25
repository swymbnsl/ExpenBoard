import {
  incomeCategoriesEnum,
  expensesCategoriesEnum,
} from "../enums/categories-enum.js"
import connect from "../database/dbConnect.js"
import Transaction from "../models/transactionsModel.js"
import "dotenv/config"
const types = ["income", "income", "expense"]

const transactions = []
const names = [
  "apple", // A
  "banana", // B
  "cat", // C
  "dog", // D
  "elephant", // E
  "frog", // F
  "grape", // G
  "house", // H
  "igloo", // I
  "jacket", // J
  "kite", // K
  "lemon", // L
  "monkey", // M
  "notebook", // N
  "orange", // O
  "pencil", // P
  "queen", // Q
  "rabbit", // R
  "snake", // S
  "turtle", // T
  "umbrella", // U
  "vase", // V
  "whale", // W
  "xylophone", // X
  "yarn", // Y
  "zebra", // Z
]

connect()

const seedDb = async () => {
  for (let i = 0; i < 50; i++) {
    const name = names[Math.floor(Math.random() * 24) + 1]
    let amount = 0
    let category = ""

    const type = types[Math.floor(Math.random() * types.length)]

    if (type === "income") {
      amount = Math.floor(Math.random() * 10000) + 1000
      category =
        incomeCategoriesEnum[
          Math.floor(Math.random() * incomeCategoriesEnum.length)
        ]
    } else {
      amount = Math.floor(Math.random() * 10000) + 1000
      category =
        expensesCategoriesEnum[
          Math.floor(Math.random() * expensesCategoriesEnum.length)
        ]
    }

    transactions.push({
      user_id: process.env.DEV_ID,
      name,
      amount,
      category,
      type,
      dateAndTime: new Date(
        new Date().setDate(
          new Date().getDate() - Math.floor(Math.random() * 30) + 1
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
