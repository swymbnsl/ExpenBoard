import mongoose from "mongoose"

const connection = {}

const connect = async () => {
  if (connection.isConnected === 1) {
    console.log("Already connected to the database")
    return
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI)

    connection.isConnected = db.connections[0].readyState
    console.log("MongoDB connected successfully")
  } catch (e) {
    console.log("Error connecting to mongoose:")
    console.log(e)
    process.exit(1)
  }
}

export default connect
