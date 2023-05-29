const mongoose = require("mongoose")
const express = require("express")
const User = require("./UsersModels")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser") // Middleware

const app = express()
const port = 3000

const dbURI =
  "mongodb+srv://davidecannerozzi:10ONKGKfht2ojjq5@cluster0.am2qvz0.mongodb.net/?retryWrites=true&w=majority"

mongoose
  .connect(dbURI)
  .then((res: any) => console.log("Connected to db"))
  .catch((err: Error) => console.log("error"))

app.use(express.json())
app.use(cookieParser())

app.set("view engine", "pug")
app.set("views", "./views")

// Handling  Errors

const handleErrors = (error: any) => {
  console.log(error.message)
}

app.get("/sign", (req: any, res: any) => {
  res.render("sign")
})

app.get("/login", (req: any, res: any) => {
  res.render("login")
})

app.post("/sign", async (req: any, res: any) => {
  const { email, password } = req.body
  try {
    // Create a new user
    const newUser = await User.create({ email, password })
    res.cookie("User Authenticated", true)
    res.status(201).json(newUser)
  } catch (error) {
    handleErrors(error)
    res.status(500).send("An error occurred while creating the user.")
  }
})
app.post("/login", (req: any, res: any) => {
  res.send("User Logged")
})

app.listen(port)
