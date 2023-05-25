const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

// Schema

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {
        validator: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return emailRegex.test(value)
        },
        message: "Please enter a @.",
      },
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: 10,
  },
})

// Hashing the Password

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)

  next()
})

// Model based on the Schema

const User = mongoose.model("user", UserSchema)

module.exports = User
