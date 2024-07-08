const { default: axios } = require("axios")

const getTransactions = async () => {
  try {
    const res = await axios.get("/api/user/transactions")
    const transactions = res.data.transactions
  } catch (error) {
    console.log(error.response.data.error)
  }
}
