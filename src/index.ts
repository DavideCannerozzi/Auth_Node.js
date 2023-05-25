const mongoose = require("mongoose")
const express = require("express")
const User = require("./UsersModels")

const dbURI =
  "mongodb+srv://davidecannerozzi:10ONKGKfht2ojjq5@cluster0.am2qvz0.mongodb.net/?retryWrites=true&w=majority"

const port = 3000

mongoose
  .connect(dbURI)
  .then((res: any) => console.log("Connected to db"))
  .catch((err: Error) => console.log("error"))

const app = express()

app.use(express.json())

app.set("view engine", "pug")
app.set("views", "./views")

app.get("/", (req: any, res: any) => {
  res.render("sign")
})

app.get("/login", (req: any, res: any) => {
  res.render("login")
})

app.post("/", async (req: any, res: any) => {
  const { name, password } = req.body
  try {
    // Create a new user
    const newUser = await User.create({ name, password })

    res.status(201).json(newUser)
  } catch (error) {
    console.error(error)
    res.status(500).send("An error occurred while creating the user.")
  }
})
app.post("/login", (req: any, res: any) => {
  res.send("User Logged")
})

app.listen(port)
