import jwt from "jsonwebtoken"

export const getDataFromToken = (request) => {
  try {
    if (!request.cookies.has("token")) {
      console.log("Not signed in")
      throw new Error("User must be signed in")
    }

    const token = request.cookies.get("token").value || ""
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

    return decodedToken
  } catch (error) {
    return { message: "Couldn't decode token", error: error.message }
  }
}
