const getTransactionsFromDate = async (date) => {
  const res = await axios.get("/api/user/transactions")
  setTransactions(res.data.transactions)
}

export default getTransactionsFromDate
