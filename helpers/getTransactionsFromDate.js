import axios from "axios"

const getTransactionsFromDate = async (date) => {
  try {
    const res = await axios.get(
      `/api/user/transactions?page=1&limit=0&dateFrom=${date.from}&dateTo=${date.to}`
    )

    return res.data
  } catch (error) {
    console.log(error)
    return
  }
}

export default getTransactionsFromDate
